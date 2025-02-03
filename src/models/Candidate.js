import db from "../config/db.js";

const Candidate = {
  //* Crear candidato
  create: (name, party, callback) => {
    db.query(
      "INSERT INTO Candidates (name, party) VALUES (?, ?)",
      [name, party],
      callback
    );
  },

  //* Obtener candidato por id
  getById: (id, callback) => {
    db.query("SELECT * FROM Candidates WHERE id = ?", [id], callback);
  },

  //* Obtener todos los candidatos
  getAll: (callback) => {
    db.query("SELECT * FROM Candidates", callback);
  },

  //* Eliminar candidato por id
  delete: (id, callback) => {
    db.query("DELETE FROM Candidates WHERE id = ?", [id], callback);
  },

  //* Incrementar conteo de votos de un candidato
  incrementVotes: (id, callback) => {
    db.query(
      "UPDATE Candidates SET votes = votes + 1 WHERE id = ?",
      [id],
      callback
    );
  },
};

//* Exportar modelo
export default Candidate;
