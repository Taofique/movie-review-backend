import express from "express";
import {
  getAllGenres,
  getGenreById,
  createGenre,
  updateGenre,
  deleteGenre,
} from "../controllers/genre.controller.js";

const router = express.Router();

router.get("/", getAllGenres); // GET /genres
router.get("/:id", getGenreById); // GET /genres/:id
router.post("/", createGenre); // POST /genres
router.put("/:id", updateGenre); // PUT /genres/:id
router.delete("/:id", deleteGenre); // DELETE /genres/:id

export default router;
