import { AppDataSource } from "../config/dataSource";
import { Emprestimo } from "../emprestimo";
import { Pessoa } from "../pessoa";
import { Livro } from "../livro";
import { IsNull } from "typeorm";

const emprestimoRepo = AppDataSource.getRepository(Emprestimo);
const pessoaRepo = AppDataSource.getRepository(Pessoa);
const livroRepo = AppDataSource.getRepository(Livro);

export const criarEmprestimo = async (dados: { pessoaId: number, livroId: number }): Promise<Emprestimo> => {
  const { pessoaId, livroId } = dados;

  const pessoa = await pessoaRepo.findOneBy({ id: pessoaId });
  if (!pessoa) {
    throw new Error("Pessoa não encontrada");
  }

  const livro = await livroRepo.findOneBy({ id: livroId });
  if (!livro) {
    throw new Error("Livro não encontrado");
  }

  if (livro.status !== "disponivel") {
    throw new Error("Livro indisponível para empréstimo");
  }

  // Atualiza status para emprestado
  livro.status = "emprestado";
  await livroRepo.save(livro);

  const novoEmprestimo = emprestimoRepo.create({
    livro,
    pessoa,
    data_emprestimo: new Date()
  });

  return await emprestimoRepo.save(novoEmprestimo);
};

export const registrarDevolucao = async (dados: { id: number, data_devolucao?: Date }): Promise<Emprestimo> => {
  const { id, data_devolucao } = dados;

  const emprestimo = await emprestimoRepo.findOneBy({ id });

  if (!emprestimo) {
    throw new Error("Empréstimo não encontrado");
  }

  emprestimo.data_devolucao = data_devolucao || new Date();

  const livro = await livroRepo.findOneBy({ id: emprestimo.livro.id });
  if (livro) {
    livro.status = "disponivel";
    await livroRepo.save(livro);
  }

  return await emprestimoRepo.save(emprestimo);
};

export const listarTodosEmprestimos = async (): Promise<Emprestimo[]> => {
  return await emprestimoRepo.find({
    relations: ["livro", "pessoa"]
  });
};

export const listarEmprestimosAtivos = async (): Promise<Emprestimo[]> => {
  return await emprestimoRepo.find({
    where: { data_devolucao: IsNull() },
    relations: ["livro", "pessoa"]
  });
};

export const buscarEmprestimoPorId = async (id: number): Promise<Emprestimo | null> => {
  return await emprestimoRepo.findOne({
    where: { id },
    relations: ["livro", "pessoa"]
  });
};