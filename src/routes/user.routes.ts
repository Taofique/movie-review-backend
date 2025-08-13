// src/routes/user.routes.ts

import express from "express";
import {
  registerUser,
  loginUser,
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
} from "../controllers/user.controller.js";

import { protect } from "../middleware/auth.middleware.js";

const router = express.Router();

router.post("/register", registerUser);
router.post("/login", loginUser);

// Portected routes

router.get("/me", protect, (req, res) => {
  const user = (req as any).user; // set in protect middleware
  res.json({
    message: "Authenticated user info",
    user,
  });
});

router.get("/", getAllUsers); // GET /users
router.post("/", createUser); // POST /users
router.get("/:id", getUserById);
router.put("/:id", updateUser);
router.delete("/:id", deleteUser);

export default router;
