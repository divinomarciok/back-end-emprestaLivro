import { Request, Response ,RequestHandler } from "express";
import { LivroService } from "../models/service/livroservice";
import { error } from "node:console";

const livroService = new LivroService();

export const livroController: {
  cadastrar: RequestHandler;
  listarTodos: RequestHandler;
  listarDisponiveis : RequestHandler;
} = {
  cadastrar: async (req: Request, res: Response) => {
    try {
      const novoLivro = await livroService.cadastrarLivro(req.body);
      await res.status(201).json(novoLivro);
    } catch (error: any) {
      await res.status(400).json({ erro: error.message });
    }
  }, 
  
  listarTodos : async(req: Request, res: Response) =>{
    try{
      const novoLivro = await livroService.listarTodos();
       res.status(201).json(novoLivro);
       
    }catch (error: any){
      await res.status(400).json({erro:error.message});
    }
  },

  listarDisponiveis : async(req:Request,res:Response)=>{
      try
      {
        const livro =  await livroService.listarTodosDisponiveis();
        res.status(201).json(livro);
      }catch(error : any){
        res.status(400).json({erro:error.message})
      }
  }
};
