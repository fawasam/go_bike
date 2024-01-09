import jwt from "jsonwebtoken";
import User from "../models/User.js";

export const formatDatatoSend = (user) => {
  const access_token = jwt.sign({ id: user._id }, process.env.JWT_SECRET_KEY);
  return {
    access_token,
    username: user.username,
    email: user.email,
    role: user.role,
    bikes: user.bikes,
    rental: user.rental,
    phone: user.phone,
  };
};

export const verifyJWT = (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (token == null) {
    return res.status(401).json({ error: "No access token" });
  }
  jwt.verify(token, process.env.JWT_SECRET_KEY, async (err, user) => {
    if (err) {
      return res.status(403).json({ error: "Invalid Authorization" });
    }
    req.user = user.id;
    await User.findById({ _id: user.id })
      .then((result) => {
        req.role = result.role;
      })
      .catch((err) => {
        console.log(err);
      });

    next();
  });
};
