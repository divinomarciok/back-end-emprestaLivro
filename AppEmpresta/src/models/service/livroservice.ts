import { AppDataSource } from "../config/dataSource";
import { Livro } from "../livro";

const livroRepo = AppDataSource.getRepository(Livro);


export const cadastrarLivro = async (dados: Partial<Livro>): Promise<Livro> => {
  const { titulo, autor, categoria} = dados;

  if (!titulo || !autor) {
    throw new Error("Título e autor são obrigatórios");
  }

  const livroExistente = await livroRepo.findOne({ where: { titulo, autor } });

  if (livroExistente) {
    throw new Error("Livro já cadastrado");
  }

  const novoLivro = livroRepo.create({ ...dados, status: "disponivel" });
  return await livroRepo.save(novoLivro);
};


export const listarTodosLivros = async (): Promise<Livro[]> => {
  return await livroRepo.find();
};

export const atualizaStatus = async (dados: Partial<Livro>): Promise<Livro> => {
  const { id, status } = dados;

  if (!id || !status) {
    throw new Error("ID e novo status são obrigatórios");
  }

  const livro = await livroRepo.findOneBy({ id });

  if (!livro) {
    throw new Error("Livro não encontrado");
  }

  livro.status = status;

  return await livroRepo.save(livro);
};


export const listarLivrosDisponiveis = async (): Promise<Livro[]> => {
  return await livroRepo.find({ where: { status: "disponivel" } });
};
