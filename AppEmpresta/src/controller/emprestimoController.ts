import { Request, Response ,RequestHandler } from "express";
import { criarEmprestimo,registrarDevolucao } from "../models/service/emprestimoService";


export const emprestimoController: {
  criar: RequestHandler;
  registrarDevolucao: RequestHandler;
  } = {
  criar: async (req, res) => {
     await criarEmprestimo(req, res);
  },
  registrarDevolucao: async (req, res) => {
  await registrarDevolucao(req, res);
    }
};