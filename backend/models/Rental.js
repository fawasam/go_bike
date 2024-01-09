// models/Rental.js
import mongoose from "mongoose";

const rentalSchema = new mongoose.Schema({
  // User who rented the bike
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  // Bike rented
  bike: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Bike",
    required: true,
  },
  startDate: {
    type: Date,
    required: true,
    default: Date.now,
  },
  endDate: {
    type: Date,
    required: true,
  },
  actualReturnDate: Date,
  cost: {
    type: Number,
    required: true,
    min: 0,
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "canceled"],
    default: "pending",
  },
  notes: String,
  returned: { type: Boolean, default: false },
});

export default mongoose.model("Rental", rentalSchema);
