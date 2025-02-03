import db from "../config/db.js";
import bcrypt from "bcryptjs";

const User = {
  //* Crear usuario
  create: async (data, callback) => {
    const { username, password } = data;
    //! Hash a la pswrd
    const hashedPassword = await bcrypt.hash(password, 10);
    db.query(
      "INSERT INTO Users (username, password) VALUES (?, ?)",
      [username, hashedPassword],
      callback
    );
  },
  //* Obtener usuario por id
  findByUsername: (username, callback) => {
    db.query("SELECT * FROM Users WHERE username = ?", [username], callback);
  },
};

export default User;
