import { AppDataSource } from "../config/dataSource";
import { Livro } from "../livro";
import { Repository } from "typeorm";

export class LivroService {
  private livroRepository: Repository<Livro>;

  constructor() {
    this.livroRepository = AppDataSource.getRepository(Livro);
  }

  async cadastrarLivro(dados: Partial<Livro>): Promise<Livro> {
    // Validação básica (opcional)
    if (!dados.titulo || !dados.autor) {
      throw new Error("Título e autor são obrigatórios");
    }

    const novoLivro = this.livroRepository.create(dados);
    return await this.livroRepository.save(novoLivro);
  }

  async listarTodos(): Promise<Livro[]> {
    return await this.livroRepository.find();
  }

  async listarTodosDisponiveis(): Promise<Livro[]>{
    const livros = await this.livroRepository.find({where: {status:"disponivel"}})
    console.log("Livros disponíveis encontrados:", livros);
    return livros;
  }

  async buscarPorId(id: number): Promise<Livro | null> {
    return await this.livroRepository.findOneBy({ id });
  }
}
