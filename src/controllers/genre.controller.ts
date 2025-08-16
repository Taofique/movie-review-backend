import type { Request, Response } from "express";
import { Genre } from "../models/genre.model.js";
import type { TGenreCreateInput } from "../types/genre.js";

// GET /genres
export async function getAllGenres(req: Request, res: Response) {
  try {
    const genres = await Genre.findAll();
    res.status(200).json(genres);
  } catch (error) {
    console.error("Error fetching genres:", error);
    res.status(500).json({ message: "Failed to get genres" });
  }
}

// GET /genres/:id
export async function getGenreById(req: Request, res: Response) {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });

    res.status(200).json(genre);
  } catch (error) {
    console.error("Error fetching genre:", error);
    res.status(500).json({ message: "Failed to get genre" });
  }
}

// POST /genres
export async function createGenre(
  req: Request<{}, {}, TGenreCreateInput>,
  res: Response
) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const newGenre = await Genre.create({ name });
    res.status(201).json(newGenre);
  } catch (error) {
    console.error("Error creating genre:", error);
    res.status(500).json({ message: "Failed to create genre" });
  }
}

// PUT /genres/:id
export async function updateGenre(
  req: Request<{ id: string }, {}, TGenreCreateInput>,
  res: Response
) {
  try {
    const genre = await Genre.findByPk(req.params.id);
    if (!genre) return res.status(404).json({ message: "Genre not found" });

    await genre.update(req.body);
    res.status(200).json(genre);
  } catch (error) {
    console.error("Error updating genre:", error);
    res.status(500).json({ message: "Failed to update genre" });
  }
}

// DELETE /genres/:id
export async function deleteGenre(req: Request, res: Response) {
  try {
    const deleted = await Genre.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Genre not found" });

    res.status(200).json({ message: "Genre deleted successfully" });
  } catch (error) {
    console.error("Error deleting genre:", error);
    res.status(500).json({ message: "Failed to delete genre" });
  }
}
