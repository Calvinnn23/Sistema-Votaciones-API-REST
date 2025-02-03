import express from "express";
import {
  createVote,
  getAllVotes,
  getStatistics,
} from "../controllers/voteController.js";
import { verifyToken } from "../middlewares/authMiddleware.js";

//* Enrutador
const router = express.Router();

//* Rutas para votos
//! Se añade el middleware de autenticación a la ruta para protección de votos
router.post("/", verifyToken, createVote);
router.get("/", getAllVotes);
router.get("/statistics", getStatistics);

//* Exportar enrutador
export default router;
