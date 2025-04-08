import { AppDataSource } from "../config/dataSource";
import { Pessoa } from "../pessoa";

const pessoaRepo = AppDataSource.getRepository(Pessoa);

export const criarPessoa = async (dados: Partial<Pessoa>): Promise<Pessoa> => {
  const { nome, matricula, email } = dados;

  if (!nome || !matricula || !email) {
    throw new Error("Nome, matrícula e email são obrigatórios");
  }

  const pessoaExistente = await pessoaRepo.findOne({ where: { matricula } });
  if (pessoaExistente) {
    throw new Error("Já existe uma pessoa cadastrada com esta matrícula");
  }

  const emailExistente = await pessoaRepo.findOne({ where: { email } });
  if (emailExistente) {
    throw new Error("Este email já está em uso");
  }

  const novaPessoa = pessoaRepo.create(dados);
  return await pessoaRepo.save(novaPessoa);
};

export const listarTodasPessoas = async (): Promise<Pessoa[]> => {
  return await pessoaRepo.find();
};

export const buscarPessoaPorId = async (id: number): Promise<Pessoa | null> => {
  return await pessoaRepo.findOneBy({ id });
};

export const buscarPessoaPorMatricula = async (matricula: string): Promise<Pessoa | null> => {
  return await pessoaRepo.findOneBy({ matricula });
};

export const atualizarPessoa = async (dados: Partial<Pessoa>): Promise<Pessoa> => {
  const { id, ...dadosAtualizacao } = dados;

  if (!id) {
    throw new Error("ID é obrigatório para atualização");
  }

  const pessoa = await pessoaRepo.findOneBy({ id });
  if (!pessoa) {
    throw new Error("Pessoa não encontrada");
  }

  if (dadosAtualizacao.matricula) {
    const pessoaComMatricula = await pessoaRepo.findOne({ 
      where: { matricula: dadosAtualizacao.matricula },
    });
    
    if (pessoaComMatricula && pessoaComMatricula.id !== id) {
      throw new Error("Esta matrícula já está em uso por outra pessoa");
    }
  }

  if (dadosAtualizacao.email) {
    const pessoaComEmail = await pessoaRepo.findOne({ 
      where: { email: dadosAtualizacao.email },
    });
    
    if (pessoaComEmail && pessoaComEmail.id !== id) {
      throw new Error("Este email já está em uso por outra pessoa");
    }
  }

  Object.assign(pessoa, dadosAtualizacao);
  
  return await pessoaRepo.save(pessoa);
};

export const removerPessoa = async (id: number): Promise<boolean> => {
  const pessoa = await pessoaRepo.findOneBy({ id });
  
  if (!pessoa) {
    throw new Error("Pessoa não encontrada");
  }

  await pessoaRepo.remove(pessoa);
  return true;
};