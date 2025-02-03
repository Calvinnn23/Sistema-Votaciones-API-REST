import Vote from "../models/Vote.js";
import Voter from "../models/Voter.js";
import Candidate from "../models/Candidate.js";

//* Crear voto
export const createVote = async (req, res) => {
  const { voter_id, candidate_id } = req.body;

  try {
    //* Verificar si el votante es un candidato
    const candidateCheck = await Candidate.findOne({ where: { id: voter_id } });
    if (candidateCheck) {
      return res.status(400).json({ error: "Un candidato no puede votar" });
    }

    //* Verificar si el votante ya votó
    const voter = await Voter.findOne({ where: { id: voter_id } });
    if (!voter) {
      return res.status(404).json({ error: "Votante no encontrado" });
    }
    if (voter.has_voted) {
      return res.status(400).json({ error: "Este votante ya hizo su voto" });
    }

    //* Verificar si el candidato existe
    const candidate = await Candidate.findOne({ where: { id: candidate_id } });
    if (!candidate) {
      return res.status(400).json({ error: "Candidato no encontrado" });
    }

    //* Registrar el voto y actualizar el estado del votante
    try {
      const newVote = await Vote.create({ voter_id, candidate_id });
      await Voter.update({ has_voted: true }, { where: { id: voter_id } });
      res.status(201).json({ message: "Voto registrado", id: newVote.id });
    } catch (err) {
      res.status(500).json({
        message: "Error al registrar el voto o actualizar el votante",
      });
    }
  } catch (err) {
    res.status(500).json({
      message: "Error interno del servidor",
    });
  }
};

//* Obtener todos los votos
export const getAllVotes = (req, res) => {
  Vote.getAll((err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

//* Obtener estadisticas de votacion
export const getStatistics = (req, res) => {
  Vote.getStatistics((err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

//* Exportar metodos
export default { createVote, getAllVotes, getStatistics };
