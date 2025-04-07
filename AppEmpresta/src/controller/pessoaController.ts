import { Request, Response, RequestHandler } from "express";
import {
  criarPessoa,
  listarTodasPessoas,
  buscarPessoaPorId,
  buscarPessoaPorMatricula,
  atualizarPessoa,
  removerPessoa
} from "../models/service/pessoaService";

export const pessoaController: {
  criar: RequestHandler;
  listarTodos: RequestHandler;
  atualizar: RequestHandler;
  remover: RequestHandler;
} = {
  criar: async (req: Request, res: Response) => {
    try {
      const pessoa = await criarPessoa(req.body);
      res.status(201).json(pessoa);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  },

  listarTodos: async (req: Request, res: Response) => {
    try {
      const pessoas = await listarTodasPessoas();
      res.status(200).json(pessoas);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  },

  atualizar: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      const dadosAtualizacao = { ...req.body, id };
      
      const pessoa = await atualizarPessoa(dadosAtualizacao);
      res.status(200).json(pessoa);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  },

  remover: async (req: Request, res: Response) => {
    try {
      const id = parseInt(req.params.id);
      await removerPessoa(id);
      res.status(200).json({ mensagem: "Pessoa removida com sucesso" });
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  }
};