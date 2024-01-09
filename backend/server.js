import express from "express";
import path from "path";
import morgan from "morgan";
import cors from "cors";
import connectDB from "./config/db.js";
import dotenv from "dotenv";
import bcrypt from "bcrypt";
import multer from "multer";
// imported model
import Bike from "./models/Bike.js";
import User from "./models/User.js";
import Rental from "./models/Rental.js";
import { formatDatatoSend, verifyJWT } from "./helpers/helper.js";

// Config
dotenv.config({
  path: "./config/config.env",
});

//connect db
connectDB();

//app
const app = express();
const PORT = process.env.PORT || 5000;
let emailRegex = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/; // regex for email
let passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{6,20}$/; // regex for password

//app user
app.use(express.json());

//Dev logging middleware
if (process.env.NODE_ENV === "development") {
  app.use(morgan("dev"));
  app.use(
    cors({
      origin: process.env.CLIENT_URL,
    })
  );
}

app.get("/", (req, res) => {
  res.json("Bike rental api");
});

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, cb) {
    cb(
      null,
      file.fieldname + "-" + Date.now() + path.extname(file.originalname)
    );
  },
});

const upload = multer({
  storage: storage,
}).single("image");

app.post("/upload", (req, res) => {
  upload(req, res, (err) => {
    if (err) {
      res.status(400).send("Error uploading file.");
    } else {
      const imageUrl = "http://localhost:5000/uploads/" + req.file.filename;
      res.status(200).json({ imageUrl: imageUrl });
    }
  });
});
app.use("/uploads", express.static("uploads"));
// USER SIGNIN AND SIGNUP ROUTES

app.post("/api/register", (req, res) => {
  const { username, email, password, phone } = req.body;

  if (username.length < 3) {
    return res
      .status(403)
      .json({ error: "Fullname must be at least 3 characters" });
  }
  if (!email.length) {
    return res.status(403).json({ error: "Enter Email" });
  }
  if (!phone.length) {
    return res.status(403).json({ error: "Enter Mobile Number" });
  }
  if (!emailRegex.test(email)) {
    return res.status(403).json({ error: "Email is invalid" });
  }
  if (!passwordRegex.test(password)) {
    return res.status(403).json({
      error:
        "Password should be 6 to 20 characters long with a numeric, 1 lowercase and 1 uppercase letters ",
    });
  }

  bcrypt.hash(password, 10, async (err, hashed_password) => {
    let user = new User({ username, email, password: hashed_password, phone });
    user
      .save()
      .then((newUser) => {
        return res.status(200).json(formatDatatoSend(newUser));
      })
      .catch((err) => {
        if (err.code == "11000") {
          return res.status(500).json({ error: "Email already exists" });
        }
        return res.status(500).json({ error: err.message });
      });
  });
});

app.post("/api/login", (req, res) => {
  let { email, password } = req.body;
  console.log(email, password);
  User.findOne({ email })
    .then((user) => {
      if (!user) {
        return res.status(403).json({ error: "Email not found" });
      }
      bcrypt.compare(password, user.password, (err, result) => {
        if (err) {
          return res
            .status(403)
            .json({ error: "Error occured while login please try again" });
        }
        if (!result) {
          return res.status(403).json({ error: "Incorrect password" });
        } else {
          return res.status(200).json(formatDatatoSend(user));
        }
      });
    })
    .catch((error) => {
      console.log(error.message);
      return res.status(500).json({ error: error.message });
    });
});

app.get("/api/user", verifyJWT, async (req, res) => {
  const user = req.user;

  await User.find({ _id: user })
    .populate("bikes")
    .populate({
      path: "rental",
      populate: { path: "bike", select: "model type brand image" },
      // populate: { path: "user", select: "username email" },
    })
    .exec()
    .then((result) => {
      if (!result) {
        return res.status(404).json({ error: "result not found" }); // Handle non-existent ID
      }
      res.status(200).json(result);
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// USER BIKE  ROUTES

app.post("/api/createBike", verifyJWT, async (req, res) => {
  let user = req.user;
  console.log(req.user);
  let {
    model,
    type,
    price,
    color,
    description,
    brand,
    year,
    conditions,
    image,
    available,
  } = req.body;
  if (!model || !type || !price || !user || !image) {
    return res.status(400).json({ error: "Missing required fields" });
  }
  const bike = new Bike({
    user,
    model,
    type,
    price,
    color,
    description,
    brand,
    year,
    conditions,
    image,
    available,
  });
  await bike
    .save()
    .then((result) => {
      User.findOneAndUpdate(
        { _id: user },
        {
          $push: { bikes: result._id },
        }
      )
        .then((user) => {
          return res.status(200).json({
            message: "Bike created successfully",
            result,
          });
        })
        .catch((err) => {
          return res.status(500).json({
            error: err.message,
          });
        });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error creating bike" });
    });
});

app.post("/api/updateBike/:id", verifyJWT, async (req, res) => {
  let { id } = req.params;
  let user = req.user;
  let role = req.role;

  let {
    model,
    type,
    price,
    color,
    description,
    brand,
    year,
    conditions,
    image,
    available,
    isVerified,
  } = req.body;

  if (!id) {
    return res.status(400).json({ error: "Missing required ID" });
  }

  // if (!model || !type || !price || !user) {
  //   return res.status(400).json({ error: "Missing required fields" });
  // }

  let bike;

  if (role === "admin") {
    bike = await Bike.findByIdAndUpdate(
      id,
      {
        model,
        type,
        price,
        color,
        description,
        brand,
        year,
        conditions,
        image,
        available,
        isVerified,
      },
      { new: true }
    );
  } else {
    bike = await Bike.findByIdAndUpdate(
      id,
      {
        model,
        type,
        price,
        color,
        description,
        brand,
        year,
        conditions,
        image,
        available,
      },
      { new: true }
    );
  }

  await bike
    .save()
    .then((result) => {
      res.status(201).json({ message: "Bike updated successfully", result });
    })
    .catch((err) => {
      console.error(err);
      res.status(500).json({ error: "Error creating bike" });
    });
});

app.get("/api/getAllBikes", async (req, res) => {
  await Bike.find({ isVerified: true })
    .then((bikes) => {
      res.status(200).json({ bikes });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/api/getAllBikes/unVerified", async (req, res) => {
  await Bike.find({ isVerified: false })
    .then((bikes) => {
      res.status(200).json({ bikes });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/api/getBike/:id", async (req, res) => {
  let { id } = req.params;

  await Bike.findById({ _id: id })
    .then((bikes) => {
      if (!bikes) {
        return res.status(404).json({ error: "Bike not found" }); // Handle non-existent ID
      }
      res.status(200).json({ bikes });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.delete("/api/getBike/:id", verifyJWT, async (req, res) => {
  let { id } = req.params;
  const user = req.user;

  await Bike.findByIdAndDelete({ _id: id })
    .then(async (bikes) => {
      if (!bikes) {
        return res.status(404).json({ error: "Bike not found" }); // Handle non-existent ID
      }

      await User.findOneAndUpdate(
        { _id: user },
        {
          $pull: { bikes: bikes._id },
        }
      ).catch((err) => {
        return res.status(500).json({
          error: err.message,
        });
      });
      res.status(200).json({ message: "Bike deleted successfully" });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

// USER RENTAL  ROUTES

app.post("/api/rentABike/:id", verifyJWT, async (req, res) => {
  try {
    let userId = req.user;
    let { id: bikeId } = req.params;
    const {
      startDate,
      endDate,
      cost,
      notes,
      returned,
      paymentStatus,
      actualReturnDate,
    } = req.body;

    if (!userId || !bikeId || !startDate || !endDate || !cost) {
      return res.status(400).json({ error: "Missing required fields" });
    }

    const bike = await Bike.findById({ _id: bikeId });
    // if (!bike || !bike.available) {
    //   return res.status(400).json({ error: "Bike unavailable" });
    // }

    // Create a rental object
    const rental = new Rental({
      user: userId,
      bike: bikeId,
      startDate,
      endDate,
      cost,
      notes,
      returned,
      paymentStatus,
      actualReturnDate,
    });
    await rental.save().then(async (result) => {
      await User.findOneAndUpdate(
        { _id: userId },
        {
          $push: { rental: result._id },
        }
      ).catch((err) => {
        return res.status(500).json({
          error: err.message,
        });
      });
      await Bike.findByIdAndUpdate({ _id: bikeId }, { available: false });
      res.status(201).json({ message: "Bike rented successfully", rental });
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: error.message });
  }
});

app.get("/api/getAllRentals/unVerified", verifyJWT, async (req, res) => {
  await Rental.find({ paymentStatus: { $ne: "paid" } })
    .populate({
      path: "bike",
      populate: {
        path: "user",
        select: "email phone username", // Populate publisher for each book
      },
    })
    .then((rental) => {
      res.status(200).json({ rental });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/api/getAllRentals", verifyJWT, async (req, res) => {
  const user = req.user;

  await Rental.find()
    .then((rental) => {
      res.status(200).json({ rental });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/api/getAllOngoingRentals", verifyJWT, async (req, res) => {
  const user = req.user;

  await Rental.find({ returned: false })
    .then((rental) => {
      res.status(200).json({ rental });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.get("/api/getARental/:id", verifyJWT, async (req, res) => {
  const user = req.user;
  const { id } = req.params;

  await Rental.findOne({ _id: id })
    .then((rental) => {
      res.status(200).json({ rental });
    })
    .catch((err) => {
      res.status(500).json({ error: err.message });
    });
});

app.post("/api/updateRental", verifyJWT, async (req, res) => {
  const user = req.user;
  const role = req.role;

  const { _id, paymentStatus, returned } = req.body;
  if (!_id) {
    res.status(400).json({ error: "Cannot find" });
  }

  if (role === "admin" || role === "rentee") {
    await Rental.findOneAndUpdate(
      { _id },
      {
        paymentStatus,
        returned,
      },
      { new: true }
    )
      .then((rental) => {
        res.status(200).json({ rental });
      })
      .catch((err) => {
        res.status(500).json({ error: err.message });
      });
  } else {
    res.status(401).json({ error: "Unauthorized access" });
  }
});

app.use((req, res, next) => {
  res.status(404).json({
    success: false,
    message: "Page Not Founded",
  });
});

//port
app.listen(PORT, () => {
  console.log(`Server running at ${PORT}`);
});
