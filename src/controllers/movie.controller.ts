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
import type { TMovie, TMovieCreateInput } from "../types/movie.js";

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

// PUT => /movies/:id ( Update movies)

export const updateMovie = async (
  req: Request<{ id: string }, {}, Partial<TMovieCreateInput>>,
  res: Response
): Promise<void> => {
  try {
    const movieId = req.params.id;
    const { title, genre, releaseYear } = req.body;

    console.log("Movie ID:", movieId);
    console.log("Request body:", req.body);

    //Find movie by ID

    const movieInstance = await Movie.findByPk(movieId);
    if (!movieInstance) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    // Update only provided fields

    if (title !== undefined) movieInstance.title = title;
    if (genre !== undefined) movieInstance.genre = genre;
    if (releaseYear !== undefined) movieInstance.releaseYear = releaseYear;

    // save changes to database
    await movieInstance.save();

    const updatedMovie: TMovie = movieInstance.get({ plain: true });
    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error("Error updating movie:", error);
    res.status(500).json({ message: "Failed to update movie" });
  }
};

// DELETE => DELETE /movies/:id

export const deleteMovie = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const movieId = req.params.id;

    const deleteMovieCount = await Movie.destroy({ where: { id: movieId } });
    if (deleteMovieCount === 0) {
      res.status(404).json({ message: "Movie not found" });
      return;
    }

    res.status(200).json({ message: "Movie Deleted Successfully" });
  } catch (error) {
    console.error("Error deleting movie:", error);
    res.status(500).json({ message: "Failed to delete movie" });
  }
};
