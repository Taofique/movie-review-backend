import type { Request, Response } from "express";
import { Platform } from "../models/platform.model.js";
import type { TPlatformCreateInput } from "../types/platform.js";

// GET /platforms
export async function getAllPlatforms(req: Request, res: Response) {
  try {
    const platforms = await Platform.findAll();
    res.status(200).json(platforms);
  } catch (error) {
    console.error("Error fetching platforms:", error);
    res.status(500).json({ message: "Failed to get platforms" });
  }
}

// GET /platforms/:id
export async function getPlatformById(req: Request, res: Response) {
  try {
    const platform = await Platform.findByPk(req.params.id);
    if (!platform)
      return res.status(404).json({ message: "Platform not found" });

    res.status(200).json(platform);
  } catch (error) {
    console.error("Error fetching platform:", error);
    res.status(500).json({ message: "Failed to get platform" });
  }
}

// POST /platforms
export async function createPlatform(
  req: Request<{}, {}, TPlatformCreateInput>,
  res: Response
) {
  try {
    const { name } = req.body;
    if (!name) return res.status(400).json({ message: "Name is required" });

    const newPlatform = await Platform.create({ name });
    res.status(201).json(newPlatform);
  } catch (error) {
    console.error("Error creating platform:", error);
    res.status(500).json({ message: "Failed to create platform" });
  }
}

// PUT /platforms/:id
export async function updatePlatform(
  req: Request<{ id: string }, {}, TPlatformCreateInput>,
  res: Response
) {
  try {
    const platform = await Platform.findByPk(req.params.id);
    if (!platform)
      return res.status(404).json({ message: "Platform not found" });

    await platform.update(req.body);
    res.status(200).json(platform);
  } catch (error) {
    console.error("Error updating platform:", error);
    res.status(500).json({ message: "Failed to update platform" });
  }
}

// DELETE /platforms/:id
export async function deletePlatform(req: Request, res: Response) {
  try {
    const deleted = await Platform.destroy({ where: { id: req.params.id } });
    if (!deleted)
      return res.status(404).json({ message: "Platform not found" });

    res.status(200).json({ message: "Platform deleted successfully" });
  } catch (error) {
    console.error("Error deleting platform:", error);
    res.status(500).json({ message: "Failed to delete platform" });
  }
}
