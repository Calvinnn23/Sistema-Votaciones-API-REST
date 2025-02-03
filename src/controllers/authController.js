import User from "../models/User.js";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";

//* Registrar nuevo usuario
export const register = async (req, res) => {
  const { username, password } = req.body;

  try {
    //* Verificar si usuario existe
    User.findByUsername(username, (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length > 0) {
        return res
          .status(400)
          .json({ message: "El nombre de usuario ya está en uso" });
      }

      //* Crear usuario
      User.create({ username, password }, (err, results) => {
        if (err) return res.status(500).json({ message: err.message });
        res.status(201).json({ message: "Usuario registrado exitosamente" });
      });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//* Iniciar sesion y generar token jwt
export const login = async (req, res) => {
  const { username, password } = req.body;

  try {
    //* Buscar usuario en database
    User.findByUsername(username, (err, results) => {
      if (err) return res.status(500).json({ message: err.message });
      if (results.length === 0) {
        return res.status(404).json({ message: "Usuario no encontrado" });
      }

      const user = results[0];

      //* Verificar contraseña
      bcrypt.compare(password, user.password, (err, isMatch) => {
        if (err) return res.status(500).json({ message: err.message });
        if (!isMatch) {
          return res.status(400).json({ message: "Contraseña incorrecta" });
        }

        //* Generar token jwt
        const token = jwt.sign(
          { id: user.id, username: user.username },
          "secret jwt key",
          {
            expiresIn: "1h",
          }
        );

        res.json({ token });
      });
    });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

//* Exportar metodos
export default { register, login };
