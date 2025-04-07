export interface Book {
  id: number;
  titulo: string;
  autor: string;
  categoria: string;
}

export interface Person {
  id: number;
  nome: string;
  matricula: string;
  email: string;
}

export interface Loan {
  pessoaId: number;
  livroId: number;
}

export interface Return {
  data_devolucao: string;
}