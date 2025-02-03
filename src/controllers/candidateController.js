import Candidate from "../models/Candidate.js";

//* Crear candidato
export const createCandidate = (req, res) => {
  const { name, party } = req.body;
  Candidate.create({ name, party }, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: "Candidato creado", id: results.insertId });
  });
};

//* Obtener todos los candidatos
export const getAllCandidates = (req, res) => {
  Candidate.getAll((err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json(results);
  });
};

//* Obtener candidato
export const getCandidateById = (req, res) => {
  Candidate.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Candidato no encontrado" });
    res.json(results[0]);
  });
};

//* Eliminar candidato
export const deleteCandidate = (req, res) => {
  Candidate.delete(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Candidato eliminado" });
  });
};

//* Exportar metodos
export default {
  createCandidate,
  getAllCandidates,
  getCandidateById,
  deleteCandidate,
};
