import express from "express";
import { register, login } from "../controllers/authController.js";

//* Enrutador
const router = express.Router();

//* Rutas para autenticacion
router.post("/register", register);
router.post("/login", login);

//* Exportar enrutador
export default router;
