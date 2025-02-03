import Voter from "../models/Voter.js";

//* Crear votante
export const createVoter = (req, res) => {
  const { name, email } = req.body;
  Voter.create(name, email, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.status(201).json({ message: "Votante creado", id: results.insertId });
  });
};

//* Obtener votante
export const getVoterById = (req, res) => {
  Voter.getById(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    if (results.length === 0)
      return res.status(404).json({ message: "Votante no encontrado" });
    res.json(results[0]);
  });
};

//* Eliminar votante
export const deleteVoter = (req, res) => {
  Voter.delete(req.params.id, (err, results) => {
    if (err) return res.status(500).json({ message: err.message });
    res.json({ message: "Votante eliminado" });
  });
};

//* Exportar metodos
export default { createVoter, getVoterById, deleteVoter };
