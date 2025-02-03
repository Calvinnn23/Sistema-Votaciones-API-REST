import db from "../config/db.js";

const Voter = {
  //* Crear votante
  create: (name, email, callback) => {
    db.query(
      "INSERT INTO Voters (name, email) VALUES (?, ?)",
      [name, email],
      callback
    );
  },

  //* Obtener votante por id
  getById: (id, callback) => {
    db.query("SELECT * FROM Voters WHERE id = ?", [id], callback);
  },

  //* Eliminar votante por id
  delete: (id, callback) => {
    db.query("DELETE FROM Voters WHERE id = ?", [id], callback);
  },

  //* Verificar si un votante ya votó
  hasVoted: (id, callback) => {
    db.query("SELECT has_voted FROM Voters WHERE id = ?", [id], callback);
  },

  //* Marcar al votante como "has voted"
  markAsVoted: (id, callback) => {
    db.query("UPDATE Voters SET has_voted = TRUE WHERE id = ?", [id], callback);
  },
};

//* Exportar modelo
export default Voter;
