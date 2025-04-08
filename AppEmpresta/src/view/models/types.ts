export interface Livro {
  id: number;
  titulo: string;
  autor: string;
  isbn: string;
  status: string;
}

export interface Pessoa {
  id: number;
  nome: string;
  email: string;
}

export interface Emprestimo {
  id: number;
  livro: Livro;
  pessoa: Pessoa;
  data_emprestimo: string;
  data_devolucao: string | null;
} 