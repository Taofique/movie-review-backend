import express from "express";
import {
  getAllPlatforms,
  getPlatformById,
  createPlatform,
  updatePlatform,
  deletePlatform,
} from "../controllers/platform.controller.js";

const router = express.Router();

router.get("/", getAllPlatforms); // GET /platforms
router.get("/:id", getPlatformById); // GET /platforms/:id
router.post("/", createPlatform); // POST /platforms
router.put("/:id", updatePlatform); // PUT /platforms/:id
router.delete("/:id", deletePlatform); // DELETE /platforms/:id

export default router;
