import { Request, RequestHandler, Response } from "express";
import { PessoaService } from "../models/service/pessoaService";

const pessoaService = new PessoaService();

export const pessoaController : {
criar:RequestHandler;
} ={
  criar: async (req: Request, res: Response) => {
    const { nome, matricula, email } = req.body;
    try {
      const pessoa = await pessoaService.criarPessoa(nome, matricula, email);
      await res.status(201).json(pessoa);
    } catch (error: any) {
      await res.status(400).json({ erro: error.message });
    }
  },

};
