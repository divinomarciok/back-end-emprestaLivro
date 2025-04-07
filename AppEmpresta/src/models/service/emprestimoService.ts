import { Request, Response } from "express";
import { AppDataSource } from "../config/dataSource";
import { Emprestimo } from "../emprestimo";
import { Pessoa } from "../pessoa";
import { Livro } from "../livro";

export const criarEmprestimo = async (req: Request, res: Response) => {
    const { pessoaId, livroId } = req.body;
  
    try {
      const emprestimoRepo = AppDataSource.getRepository(Emprestimo);
      const pessoaRepo = AppDataSource.getRepository(Pessoa);
      const livroRepo = AppDataSource.getRepository(Livro);
  
      const pessoa = await pessoaRepo.findOneBy({ id: pessoaId });
      if (!pessoa) return res.status(404).json({ mensagem: "Pessoa não encontrada" });
  
      const livro = await livroRepo.findOneBy({ id: livroId });
      if (!livro) return res.status(404).json({ mensagem: "Livro não encontrado" });
  
      if (livro.status !== "disponivel") {
        return res.status(400).json({ mensagem: "Livro indisponível para empréstimo" });
      }
  
      // Atualiza status para emprestado
      livro.status = "emprestado";
      await livroRepo.save(livro);
  
      const novoEmprestimo = emprestimoRepo.create({
        livro,
        pessoa,
        data_emprestimo: new Date(),
      });
  
      const resultado = await emprestimoRepo.save(novoEmprestimo);
      return res.status(201).json(resultado);
  
    } catch (erro) {
      console.error("Erro ao criar empréstimo:", erro);
      return res.status(500).json({ erro: "Erro interno ao criar empréstimo" });
    }
  };

  export const registrarDevolucao = async (req: Request, res: Response) => {
    const { id } = req.params;
    const {data_devolucao} = req.body;
  
    try {
      const emprestimoRepo = AppDataSource.getRepository(Emprestimo);
  
      const emprestimo = await emprestimoRepo.findOneBy({ id: parseInt(id) });
  
      if (!emprestimo) {
        return res.status(404).json({ mensagem: "Empréstimo não encontrado" });
      }
  
      // Atualiza a data_devolucao com a data atual
      emprestimo.data_devolucao = data_devolucao;
  
      await emprestimoRepo.save(emprestimo);
  
      return res.status(200).json({ mensagem: "Devolução registrada com sucesso", emprestimo });
   0 
    } catch (erro) {
      console.error("Erro ao registrar devolução:", erro);
      return res.status(500).json({ erro: "Erro interno ao registrar devolução" });
    }
  };
  