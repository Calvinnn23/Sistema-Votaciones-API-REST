import express from "express";
import bodyParser from "body-parser";
import cors from "cors";

//* Configuraciones
const app = express();
const PORT = process.env.PORT || 5000;

//* Rutas
import voterRoutes from "./routes/voterRoutes.js";
import candidateRoutes from "./routes/candidateRoutes.js";
import voteRoutes from "./routes/voteRoutes.js";
import authRoutes from "./routes/authRoutes.js";

//* Usar rutas
app.use("/voters", voterRoutes);
app.use("/candidates", candidateRoutes);
app.use("/votes", voteRoutes);
app.use("/auth", authRoutes);

//* Middleware (req / res)
app.use(cors());
app.use(bodyParser.json());

//* Ruta test
app.get("/", (req, res) => {
  res.send("API de Sistema de Votaciones funcionando!");
});

//* Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor corriendo en http://localhost:${PORT}`);
});
