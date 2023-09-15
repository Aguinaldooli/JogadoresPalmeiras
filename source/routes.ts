import express, { Request, Response } from "express";
import {
  createPlayer,
  getAllPlayers,
  getPlayerById,
  updatePlayer,
  deletePlayer,
} from "./models";

const router = express.Router();

// Rota para criar um novo jogador (Create)
router.post("/players", async (req: Request, res: Response) => {
  try {
    const { name, position, skill } = req.body;
    const newPlayer = await createPlayer({ name, position, skill });
    return res.status(201).json(newPlayer);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao criar um novo jogador." });
  }
});

// Rota para obter todos os jogadores (Read)
router.get("/players", async (req: Request, res: Response) => {
  try {
    const players = await getAllPlayers();
    return res.json(players);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao obter os jogadores." });
  }
});

// Rota para obter um jogador por ID (Read)
router.get("/players/:id", async (req: Request, res: Response) => {
  try {
    const playerId = parseInt(req.params.id, 10);
    const player = await getPlayerById(playerId);
    if (!player) {
      return res.status(404).json({ error: "Jogador não encontrado." });
    }
    return res.json(player);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao obter o jogador." });
  }
});

// Rota para atualizar as informações de um jogador por ID (Update)
router.put("/players/:id", async (req: Request, res: Response) => {
  try {
    const playerId = parseInt(req.params.id, 10);
    const { name, position, skill } = req.body;
    const updatedPlayer = await updatePlayer(playerId, { name, position, skill });
    if (!updatedPlayer) {
      return res.status(404).json({ error: "Jogador não encontrado." });
    }
    return res.json(updatedPlayer);
  } catch (error) {
    return res.status(500).json({ error: "Erro ao atualizar o jogador." });
  }
});

// Rota para excluir um jogador por ID (Delete)
router.delete("/players/:id", async (req: Request, res: Response) => {
  try {
    const playerId = parseInt(req.params.id, 10);
    const deletedPlayer = await deletePlayer(playerId);
    if (!deletedPlayer) {
      return res.status(404).json({ error: "Jogador não encontrado." });
    }
    return res.json({ message: "Jogador excluído com sucesso." });
  } catch (error) {
    return res.status(500).json({ error: "Erro ao excluir o jogador." });
  }
});

export default router;