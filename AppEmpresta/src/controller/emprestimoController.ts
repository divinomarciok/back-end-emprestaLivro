import { Request, Response, RequestHandler } from "express";
import {
  criarEmprestimo,
  registrarDevolucao,
  listarTodosEmprestimos,
  listarEmprestimosAtivos,
  buscarEmprestimoPorId
} from "../models/service/emprestimoService";

export const emprestimoController: {
  criar: RequestHandler;
  registrarDevolucao: RequestHandler;
  listarTodos: RequestHandler;
  listarAtivos: RequestHandler;
 /// buscarPorId: RequestHandler;
} = {
  criar: async (req: Request, res: Response) => {
    try {
      const emprestimo = await criarEmprestimo(req.body);
      res.status(201).json(emprestimo);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  },

  registrarDevolucao: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const data = { id, ...req.body };
      const emprestimo = await registrarDevolucao(data);
      res.status(200).json(emprestimo);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  },

  listarTodos: async (req: Request, res: Response) => {
    try {
      const emprestimos = await listarTodosEmprestimos();
      res.status(200).json(emprestimos);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  },

  listarAtivos: async (req: Request, res: Response) => {
    try {
      const emprestimosAtivos = await listarEmprestimosAtivos();
      res.status(200).json(emprestimosAtivos);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  },

 /// buscarPorId: async (req: Request, res: Response) => {
 ///   try {
 ///     const id = parseInt(req.params.id);
 ///     const emprestimo = await buscarEmprestimoPorId(id);
 ///     
 ///     if (!emprestimo) {
 ///       return res.status(404).json({ erro: "Empréstimo não encontrado" });
 ///     }
 ///     
 ///     res.status(200).json(emprestimo);
 ///   } catch (error: any) {
 ///     res.status(400).json({ erro: error.message });
 ///   }
 /// }
  
};