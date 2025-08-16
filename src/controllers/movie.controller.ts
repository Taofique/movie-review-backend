import type { Request, Response } from "express";
import { Op } from "sequelize";
import { Movie } from "../models/movie.model.js";
import { Genre } from "../models/genre.model.js";
import { Platform } from "../models/platform.model.js";
import type { TMovieCreateInput } from "../types/movie.js";

// GET /movies?search=&genre=&platform=&page=&limit=
export async function getMovies(req: Request, res: Response) {
  try {
    const { search, genre, platform, page = "1", limit = "10" } = req.query;
    const offset = (parseInt(page as string) - 1) * parseInt(limit as string);

    const movies = await Movie.findAndCountAll({
      where: search ? { title: { [Op.iLike]: `%${search}%` } } : undefined,
      limit: parseInt(limit as string),
      offset,
      order: [["createdAt", "DESC"]],
      include: [
        { model: Genre, as: "genres", through: { attributes: [] } },
        { model: Platform, as: "platforms", through: { attributes: [] } },
      ],
    });

    // filter in-memory by genre/platform if needed
    const filteredRows = movies.rows.filter((m) => {
      let keep = true;
      if (genre) keep = m.genres?.some((g) => g.name === genre) ?? false;
      if (keep && platform)
        keep = m.platforms?.some((p) => p.name === platform) ?? false;
      return keep;
    });

    res.status(200).json({
      data: filteredRows,
      total: movies.count,
      page: parseInt(page as string),
      pageSize: parseInt(limit as string),
      totalPages: Math.ceil(movies.count / parseInt(limit as string)),
    });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get movies" });
  }
}

// GET /movies/:id
export async function getMovieById(req: Request, res: Response) {
  try {
    const movie = await Movie.findByPk(req.params.id, {
      include: [
        { model: Genre, as: "genres", through: { attributes: [] } },
        { model: Platform, as: "platforms", through: { attributes: [] } },
      ],
    });

    if (!movie) return res.status(404).json({ message: "Movie not found" });

    res.status(200).json(movie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to get movie" });
  }
}

// POST /movies
export async function createMovie(
  req: Request<{}, {}, TMovieCreateInput>,
  res: Response
) {
  try {
    const {
      title,
      releaseYear,
      description,
      imageUrl,
      publisher,
      createdBy,
      genreIds,
      platformIds,
    } = req.body;

    if (!title || !releaseYear)
      return res.status(400).json({
        message: "title and releaseYear are required",
      });

    const newMovie = await Movie.create({
      title,
      releaseYear,
      description,
      imageUrl,
      publisher,
      createdBy,
    });

    if (genreIds?.length) await newMovie.setGenres(genreIds);
    if (platformIds?.length) await newMovie.setPlatforms(platformIds);

    const movieWithRelations = await Movie.findByPk(newMovie.id, {
      include: [
        { model: Genre, as: "genres", through: { attributes: [] } },
        { model: Platform, as: "platforms", through: { attributes: [] } },
      ],
    });

    res.status(201).json(movieWithRelations);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to create movie" });
  }
}

// PUT /movies/:id
export async function updateMovie(
  req: Request<{ id: string }, {}, Partial<TMovieCreateInput>>,
  res: Response
) {
  try {
    const movie = await Movie.findByPk(req.params.id);
    if (!movie) return res.status(404).json({ message: "Movie not found" });

    const {
      title,
      releaseYear,
      description,
      imageUrl,
      publisher,
      genreIds,
      platformIds,
    } = req.body;

    await movie.update({
      title,
      releaseYear,
      description,
      imageUrl,
      publisher,
    });

    if (genreIds) await movie.setGenres(genreIds);
    if (platformIds) await movie.setPlatforms(platformIds);

    const updatedMovie = await Movie.findByPk(movie.id, {
      include: [
        { model: Genre, as: "genres", through: { attributes: [] } },
        { model: Platform, as: "platforms", through: { attributes: [] } },
      ],
    });

    res.status(200).json(updatedMovie);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to update movie" });
  }
}

// DELETE /movies/:id
export async function deleteMovie(req: Request, res: Response) {
  try {
    const deleted = await Movie.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Movie not found" });

    res.status(200).json({ message: "Movie deleted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Failed to delete movie" });
  }
}
