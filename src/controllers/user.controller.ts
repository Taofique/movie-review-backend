// controllers/user.controller.ts
import { Request, Response } from "express";
import { User } from "../models/user.model.js";
import type { TUserCreateInput, TUser } from "../types/user.js";

// GET all users
export const getAllUsers = async (
  _req: Request,
  res: Response
): Promise<void> => {
  try {
    const usersInstance = await User.findAll();
    // Convert Sequelize instances to plain objects matching TUser
    const users: TUser[] = usersInstance.map((user) =>
      user.get({ plain: true })
    );
    res.status(200).json(users);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Failed to get all users" });
  }
};

// GET user by ID
export const getUserById = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const userInstance = await User.findByPk(req.params.id);
    if (!userInstance) {
      res.status(404).json({ message: "User not found" });
      return;
    }
    const user: TUser = userInstance.get({ plain: true });
    res.status(200).json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Failed to get user" });
  }
};

// POST create user
export const createUser = async (
  req: Request<{}, {}, TUserCreateInput>,
  res: Response
): Promise<void> => {
  try {
    const { username, email, password } = req.body;

    // Simple validation
    if (!username || !email || !password) {
      res
        .status(400)
        .json({
          message: "All fields (username, email, password) are required",
        });
      return;
    }

    // Create user in DB
    const userInstance = await User.create({ username, email, password });
    const user: TUser = userInstance.get({ plain: true });
    res.status(201).json(user);
  } catch (error) {
    console.error("Error creating user:", error);
    // Handle unique constraint errors (username/email)
    if ((error as any).name === "SequelizeUniqueConstraintError") {
      res.status(409).json({ message: "Username or email already exists" });
      return;
    }
    res.status(500).json({ message: "Failed to create user" });
  }
};

// PUT update user by ID
export const updateUser = async (
  req: Request<{ id: string }, {}, Partial<TUserCreateInput>>,
  res: Response
): Promise<void> => {
  try {
    const userInstance = await User.findByPk(req.params.id);
    if (!userInstance) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    // Update only fields that exist in req.body
    if (req.body.username !== undefined)
      userInstance.username = req.body.username;
    if (req.body.email !== undefined) userInstance.email = req.body.email;
    if (req.body.password !== undefined)
      userInstance.password = req.body.password;

    await userInstance.save();

    const updatedUser: TUser = userInstance.get({ plain: true });
    res.status(200).json(updatedUser);
  } catch (error) {
    console.error("Error updating user:", error);
    res.status(500).json({ message: "Failed to update user" });
  }
};

// DELETE user by ID
export const deleteUser = async (
  req: Request<{ id: string }>,
  res: Response
): Promise<void> => {
  try {
    const userInstance = await User.findByPk(req.params.id);
    if (!userInstance) {
      res.status(404).json({ message: "User not found" });
      return;
    }

    await userInstance.destroy();
    res.status(200).json({ message: "User deleted successfully" });
  } catch (error) {
    console.error("Error deleting user:", error);
    res.status(500).json({ message: "Failed to delete user" });
  }
};
