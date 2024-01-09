import mongoose from "mongoose";

const bikeSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "users", required: true },
  model: { type: String, required: true },
  type: { type: String, required: true }, // e.g., road, mountain, hybrid
  brand: String,
  year: { type: Number },
  price: { type: Number, required: true },
  color: String,
  description: String,
  condition: String,
  image: String,
  available: { type: Boolean, default: true },
  isVerified: { type: Boolean, default: false },
});

export default mongoose.model("Bike", bikeSchema);
