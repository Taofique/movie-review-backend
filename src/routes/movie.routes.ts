// import express from "express";
// import { getAllMovies } from "../controllers/movie.controller.js";

// const router = express.Router();

// router.get("/", getAllMovies);

// export default router;

import express from "express";
import {
  getMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovie);
router.put("/:id", updateMovie);
router.delete("/:id", deleteMovie);

export default router;
