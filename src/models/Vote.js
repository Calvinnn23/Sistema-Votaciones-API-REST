import db from "../config/db.js";

const Vote = {
  //* Crear voto
  create: (voterId, candidateId, callback) => {
    db.query(
      "INSERT INTO Votes (voter_id, candidate_id) VALUES (?, ?)",
      [voterId, candidateId],
      callback
    );
  },

  //* Obtener todos los votos
  getAll: (callback) => {
    db.query("SELECT * FROM Votes", callback);
  },

  //* Obtener estadisticas de votacion
  getStatistics: (callback) => {
    db.query(
      `SELECT Candidates.name, COUNT(Votes.id) AS vote_count
             FROM Votes
             JOIN Candidates ON Votes.candidate_id = Candidates.id
             GROUP BY Candidates.id`,
      callback
    );
  },

  //* Verificar si un votante ya votó
  hasVoted: (voterId, callback) => {
    db.query("SELECT * FROM Votes WHERE voter_id = ?", [voterId], callback);
  },
};

//* Exportar el modelo
export default Vote;
