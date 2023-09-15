import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

// Definição do modelo de dados para um jogador de futebol
interface Player {
  id: number;
  name: string;
  position: string;
  skill: number;
}

// Função para criar um novo jogador
export async function createPlayer(data: Player): Promise<Player> {
  return await prisma.player.create({
    data,
  });
}

// Função para obter todos os jogadores
export async function getAllPlayers(): Promise<Player[]> {
  return await prisma.player.findMany();
}

// Função para obter um jogador por ID
export async function getPlayerById(id: number): Promise<Player | null> {
  return await prisma.player.findUnique({
    where: { id },
  });
}

// Função para atualizar as informações de um jogador
export async function updatePlayer(id: number, data: Partial<Player>): Promise<Player | null> {
  return await prisma.player.update({
    where: { id },
    data,
  });
}

// Função para excluir um jogador
export async function deletePlayer(id: number): Promise<Player | null> {
  return await prisma.player.delete({
    where: { id },
  });
}