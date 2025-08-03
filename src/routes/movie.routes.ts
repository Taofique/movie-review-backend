// import express from "express";
// import { getAllMovies } from "../controllers/movie.controller.js";

// const router = express.Router();

// router.get("/", getAllMovies);

// export default router;

import express from "express";
import { getMovies, createMovie } from "../controllers/movie.controller.js";

const router = express.Router();

router.get("/", getMovies);
router.post("/", createMovie);

export default router;
