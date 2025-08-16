// Movie types

export type TMovieCreateInput = {
  title: string;
  releaseYear: number;
  description?: string;
  imageUrl?: string;
  publisher?: string;
  createdBy: number;
  genreIds?: number[]; // IDs of genres to link
  platformIds?: number[]; // IDs of platforms to link
};

export type TMovie = {
  id: number;
  title: string;
  releaseYear: number;
  description: string | null;
  imageUrl: string | null;
  publisher: string | null;
  createdBy: number;
  avgRating: number;
  reviewCount: number;
  createdAt: Date;
  updatedAt: Date;
};
