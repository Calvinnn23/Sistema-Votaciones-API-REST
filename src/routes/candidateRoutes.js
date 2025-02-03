import express from "express";
import {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  deleteCandidate,
} from "../controllers/candidateController.js";

//* Enrutador
const router = express.Router();

//* Rutas para candidatos
router.post("/", createCandidate);
router.get("/", getAllCandidates);
router.get("/:id", getCandidateById);
router.delete("/:id", deleteCandidate);

//* Exportar enrutador
export default router;
