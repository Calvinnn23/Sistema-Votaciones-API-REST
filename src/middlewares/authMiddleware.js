import jwt from "jsonwebtoken";

//* Verificar token valido
export const verifyToken = (req, res, next) => {
  const token = req.headers["authorization"];

  if (!token) {
    return res.status(403).json({ message: "Token no proporcionado" });
  }

  jwt.verify(token, "secret jwt key", (err, decoded) => {
    if (err) {
      return res.status(401).json({ message: "Token inválido o expirado" });
    }

    //! Agregamos el id del usuario decodificado al objeto de solicitud
    req.userId = decoded.id;
    next();
  });
};

//* Exportar middleware
export default verifyToken;
