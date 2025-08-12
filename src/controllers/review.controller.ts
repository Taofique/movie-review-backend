import { Request, Response } from "express";
import { Review } from "../models/review.model.js";
import { TReview, TReviewCreateInput } from "../types/review.js";

// GET => getAllReviews

export const getAllReviews = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const reviewsInstance = await Review.findAll();
    const reviews: TReview[] = reviewsInstance.map((review) =>
      review.get({ plain: true })
    ); // reviews Instance parsed to TReview type.
    res.status(200).json(reviews);
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({ message: "Failed to get all reviews" });
  }
};

// CreateReview POST /reviews

export const createReview = async (
  req: Request<{}, {}, TReviewCreateInput>,
  res: Response
): Promise<void> => {
  try {
    const { content, rating, userId, movieId } = req.body;

    // Basic validations
    if (!content || !rating || !userId || !movieId) {
      res.status(400).json({ message: "All fields are required" });
      return;
    }

    // create Review => this inserts the data into the DB
    const reviewInstance = Review.create({ content, rating, userId, movieId });

    // conver to plain object
    const review: TReview = (await reviewInstance).get({ plain: true });

    res.status(201).json(review);
  } catch (error) {
    console.error("Error creating review:", error);
    res.status(500).json({ message: "Failed to create review" });
  }
};

// UPDATE => PUT /reviews/:id
export const updateReview = async (
  req: Request<{ id: string }, {}, Partial<TReviewCreateInput>>,
  res: Response
): Promise<void> => {
  try {
    const reviewId = req.params.id;
    const { content, rating } = req.body;

    console.log("Review ID:", reviewId);
    console.log("Request body:", req.body);

    // Find review by ID
    const reviewInstance = await Review.findByPk(reviewId);
    if (!reviewInstance) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    // Update only provided fields
    if (content !== undefined) reviewInstance.content = content;
    if (rating !== undefined) reviewInstance.rating = rating;

    // Save changes
    await reviewInstance.save();

    const updatedReview: TReview = reviewInstance.get({ plain: true });
    res.status(200).json(updatedReview);
  } catch (error) {
    console.error("Error updating review:", error);
    res.status(500).json({ message: "Failed to update review" });
  }
};

// DELETE => DELETE /reviews/:id
export const deleteReview = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const reviewId = req.params.id;

    const deletedCount = await Review.destroy({ where: { id: reviewId } });

    if (deletedCount === 0) {
      res.status(404).json({ message: "Review not found" });
      return;
    }

    res.status(200).json({ message: "Review deleted successfully" });
  } catch (error) {
    console.error("Error deleting review:", error);
    res.status(500).json({ message: "Failed to delete review" });
  }
};
