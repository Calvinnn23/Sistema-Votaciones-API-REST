import express from "express";
import { getVoterById, deleteVoter } from "../controllers/voterController.js";

//* Enrutador
const router = express.Router();

//* Rutas para votantes
router.get("/:id", getVoterById);
router.delete("/:id", deleteVoter);

//* Exportar enrutador
export default router;
