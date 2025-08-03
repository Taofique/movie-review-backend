// types/review.ts
export type TReviewCreateInput = {
  content: string;
  rating: number;
  userId: number;
  movieId: number;
};

export type TReview = {
  id: number;
  content: string;
  rating: number;
  userId: number;
  movieId: number;
  createdAt: Date;
  updatedAt: Date;
};
