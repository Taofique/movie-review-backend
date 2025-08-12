import { Router } from "express";
import {
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
} from "../controllers/review.controller.js";

const router = Router();

// GET request to /reviews => fetch all reviews
router.get("/", getAllReviews);

// POST request to /reviews => create a new review and update into database
router.post("/", createReview);

router.put("/:id", updateReview);

router.delete("/:id", deleteReview);

export default router;
