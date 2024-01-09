import express from "express";

const router = express.Router();

router.get("/", bikeController.getAllBikes);
router.post("/", bikeController.createBike);

export default router;
