// import { Request, Response } from "express";

// export const getAllMovies = (_req: Request, res: Response) => {
//   const mockMovies = [
//     { id: 1, title: "Inception", year: 2010 },
//     { id: 1, title: "Intersteller", year: 2014 },
//   ];

//   res.json(mockMovies);
// };

import type { Request, Response } from "express";
import { Movie } from "../models/movie.model.js";
import type { TMovieCreateInput } from "../types/movie.js";

// GET => /movies
export const getMovies = async (_req: Request, res: Response) => {
  try {
    const movies = await Movie.findAll();
    res.status(200).json(movies);
  } catch (error) {
    console.error("Error fetching movies:", error);
    res.status(500).json({ message: "Failed to get movies" });
  }
};

// POST => /movies
export const createMovie = async (
  req: Request<{}, {}, TMovieCreateInput>,
  res: Response
) => {
  try {
    const { title, genre, releaseYear } = req.body;

    if (!title || !genre || !releaseYear) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const newMovie = await Movie.create({ title, genre, releaseYear });
    res.status(201).json(newMovie);
  } catch (error) {
    console.error("Error creating movie:", error);
    res.status(500).json({ message: "Failed to create movie" });
  }
};
