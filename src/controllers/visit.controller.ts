import type { Request, Response } from "express";
import { Visit } from "../models/visit.model.js";

// GET /visits
export async function getAllVisits(req: Request, res: Response) {
  try {
    const visits = await Visit.findAll();
    res.status(200).json(visits);
  } catch (error) {
    console.error("Error fetching visits:", error);
    res.status(500).json({ message: "Failed to get visits" });
  }
}

// GET /visits/:id
export async function getVisitById(req: Request, res: Response) {
  try {
    const visit = await Visit.findByPk(req.params.id);
    if (!visit) return res.status(404).json({ message: "Visit not found" });

    res.status(200).json(visit);
  } catch (error) {
    console.error("Error fetching visit:", error);
    res.status(500).json({ message: "Failed to get visit" });
  }
}

// POST /visits
export async function createVisit(
  req: Request<{}, {}, { userId: number; movieId: number }>,
  res: Response
) {
  try {
    const { userId, movieId } = req.body;
    if (!userId || !movieId)
      return res
        .status(400)
        .json({ message: "userId and movieId are required" });

    const newVisit = await Visit.create({ userId, movieId });
    res.status(201).json(newVisit);
  } catch (error) {
    console.error("Error creating visit:", error);
    res.status(500).json({ message: "Failed to create visit" });
  }
}

// DELETE /visits/:id
export async function deleteVisit(req: Request, res: Response) {
  try {
    const deleted = await Visit.destroy({ where: { id: req.params.id } });
    if (!deleted) return res.status(404).json({ message: "Visit not found" });

    res.status(200).json({ message: "Visit deleted successfully" });
  } catch (error) {
    console.error("Error deleting visit:", error);
    res.status(500).json({ message: "Failed to delete visit" });
  }
}
