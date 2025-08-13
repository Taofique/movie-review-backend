// controllers/user.controller.ts
import { Request, Response } from "express";
import bcrypt from "bcrypt";
import { User } from "../models/user.model.js";
import jwt, { Secret, SignOptions } from "jsonwebtoken";
import type { TUserCreateInput, TUser } from "../types/user.js";
import "dotenv/config";

const JWT_SECRET: Secret = process.env.JWT_SECRET as Secret;
const JWT_EXPIRES_IN: string = process.env.JWT_EXPIRES_IN || "1h";

// Register User

export const registerUser = async (req: Request, res: Response) => {
  try {
    const { username, email, password } = req.body;

    // Checking if user already exists in database
    const existingUser = await User.findOne({ where: { email } });
    if (existingUser) {
      res.status(400).json({ message: "Email already in use" });
      return;
    }

    // Hashing password
    const hashedPassword = await bcrypt.hash(password, 10);

    // User create
    const newUser = await User.create({
      username,
      email,
      password: hashedPassword,
    });

    res.status(201).json({
      message: "User registered successfully",
      user: {
        id: newUser.id,
        name: newUser.username,
        email: newUser.email,
      },
    });
  } catch (error) {
    console.error("Error registering user:", error);
    res.status(500).json({ message: "Server error" });
  }
};

// LOGIN USER
export const loginUser = async (req: Request, res: Response) => {
  try {
    const { email, password } = req.body;

    // Find user
    const user = await User.findOne({ where: { email } });
    if (!user) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      res.status(400).json({ message: "Invalid email or password" });
      return;
    }

    // Create JWT
    const token = jwt.sign({ id: user.id, email: user.email }, JWT_SECRET, {
      expiresIn: JWT_EXPIRES_IN,
    } as SignOptions);

    res.json({ message: "Login successful", token });
  } catch (error) {
    console.error("Error logging in:", error);
    res.status(500).json({ message: "Server error" });
  }
};

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
      res.status(400).json({
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
