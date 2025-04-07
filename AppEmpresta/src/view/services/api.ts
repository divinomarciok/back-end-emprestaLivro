import axios from 'axios';

// Base API configuration
const api = axios.create({
  baseURL: 'http://localhost:3000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// API endpoints for books
export const livroService = {
  listarTodos: async () => {
    const response = await api.get('/livros');
    return response.data;
  },
  
  listarDisponiveis: async () => {
    const response = await api.get('/livros/disponiveis');
    return response.data;
  },
  
  cadastrar: async (livro: { titulo: string; autor: string; isbn: string }) => {
    const response = await api.post('/livros', livro);
    return response.data;
  },
  
  atualizarStatus: async (data: { id: number; status: string }) => {
    const response = await api.post('/livros/atualiza', data);
    return response.data;
  }
};

// API endpoints for people
export const pessoaService = {
  criar: async (pessoa: { nome: string; email: string }) => {
    const response = await api.post('/pessoas', pessoa);
    return response.data;
  }
};

// API endpoints for loans
export const emprestimoService = {
  criar: async (emprestimo: { livroId: number; pessoaId: number }) => {
    const response = await api.post('/emprestimo', emprestimo);
    return response.data;
  },
  
  registrarDevolucao: async (id: number) => {
    const response = await api.put(`/emprestimos/${id}/devolucao`);
    return response.data;
  }
};

export default api; 