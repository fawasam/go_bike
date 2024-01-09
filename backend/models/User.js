import mongoose from "mongoose";

const userSchema = new mongoose.Schema(
  {
    email: {
      type: String,
      trim: true,
      required: true,
      unique: true,
      lowercase: true,
    },
    phone: {
      type: String,
      required: true,
    },
    username: {
      type: String,
      trim: true,
      required: true,
    },
    password: {
      type: String,
      required: true,
    },
    role: {
      type: String,
      enum: ["renter", "rentee", "admin"],
      default: "renter",
      // A rentee is someone who is renting something out
      // A renter is someone who is renting something
    },
    bikes: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Bike",
      default: [],
    },
    rental: {
      type: [mongoose.Schema.Types.ObjectId],
      ref: "Rental",
      default: [],
    },
  },
  {
    timestamps: true,
  }
);

const User = mongoose.model("users", userSchema);
export default User;
