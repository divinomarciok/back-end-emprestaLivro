import { AppDataSource } from "../config/dataSource";
import { Pessoa } from "../pessoa";

export class PessoaService {
  private pessoaRepository = AppDataSource.getRepository(Pessoa);

  async criarPessoa(nome: string, matricula: string, email: string): Promise<Pessoa> {

    const novaPessoa = this.pessoaRepository.create({ nome,matricula, email });
    return await this.pessoaRepository.save(novaPessoa);
    
  }

  async listarPessoas(): Promise<Pessoa[]> {
    return await this.pessoaRepository.find();
  }
}
