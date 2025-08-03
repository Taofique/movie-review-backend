// types/movie.ts
export type TMovieCreateInput = {
  title: string;
  genre: string;
  releaseYear: number;
};

export type TMovie = {
  id: number;
  title: string;
  genre: string;
  releaseYear: number;
  createdAt: Date;
  updatedAt: Date;
};
