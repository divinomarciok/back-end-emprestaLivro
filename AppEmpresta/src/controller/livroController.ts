import { Request, Response, RequestHandler } from "express";
import {
  cadastrarLivro,
  listarTodosLivros,
  listarLivrosDisponiveis,
  atualizaStatus
} from "../models/service/livroservice";

export const livroController: {
  cadastrar: RequestHandler;
  listarTodos: RequestHandler;
  listarLivrosDisponiveis: RequestHandler;
  atualizaStatus: RequestHandler;
} = {
  cadastrar: async (req: Request, res: Response) => {
    try {
      const livro = await cadastrarLivro(req.body);
      res.status(201).json(livro);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  },

  listarTodos: async (req: Request, res: Response) => {
    try {
      const livros = await listarTodosLivros();
      res.status(200).json(livros);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  },

  listarLivrosDisponiveis: async (req: Request, res: Response) => {
    try {
      const livrosDisponiveis = await listarLivrosDisponiveis();
      res.status(200).json(livrosDisponiveis);
    } catch (error: any) {
      res.status(400).json({ erro: error.message });
    }
  },

  atualizaStatus : async (req:Request, res: Response)=>{
    try{
      const atualizaLivro = await atualizaStatus (req.body);
      res.status(200).json(atualizaLivro);
    }catch(error : any){
      res.status(400).json({error : error.message})
    }
  }
  
};
