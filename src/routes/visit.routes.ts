import express from "express";
import {
  getAllVisits,
  getVisitById,
  createVisit,
  deleteVisit,
} from "../controllers/visit.controller.js";

const router = express.Router();

router.get("/", getAllVisits); // GET /visits
router.get("/:id", getVisitById); // GET /visits/:id
router.post("/", createVisit); // POST /visits
router.delete("/:id", deleteVisit); // DELETE /visits/:id

export default router;
