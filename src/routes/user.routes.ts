// src/routes/user.routes.ts

import express from "express";
import {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

const router = express.Router();

router.get("/", getAllUsers); // GET /users
router.post("/", createUser); // POST /users
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
