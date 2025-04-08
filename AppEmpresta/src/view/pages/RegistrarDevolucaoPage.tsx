import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { livroService, emprestimoService } from '../services/api';
import { Livro } from '../models/types';
import './FormPages.css';

const RegistrarDevolucaoPage: React.FC = () => {
  const navigate = useNavigate();
  const [livrosEmprestados, setLivrosEmprestados] = useState<Livro[]>([]);
  const [selectedLivroId, setSelectedLivroId] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchLivrosEmprestados = async () => {
      try {
        // Buscar todos os livros e filtrar os emprestados
        const livros = await livroService.listarTodos();
        const emprestados = livros.filter((livro: Livro) => livro.status === 'emprestado');
        
        setLivrosEmprestados(emprestados);
      } catch (error) {
        console.error('Erro ao carregar livros emprestados:', error);
        setError('Erro ao carregar livros emprestados. Por favor, recarregue a página.');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchLivrosEmprestados();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLivroId) {
      setError('Selecione um livro para registrar a devolução.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      // Atualizar o status do livro para disponível
      await livroService.atualizarStatus({
        id: Number(selectedLivroId),
        status: 'disponivel'
      });
      
      setSuccess('Devolução registrada com sucesso!');
      setSelectedLivroId('');
      
      // Atualizar lista de livros emprestados
      const livros = await livroService.listarTodos();
      const emprestados = livros.filter((livro: Livro) => livro.status === 'emprestado');
      setLivrosEmprestados(emprestados);
      
      // Redirecionar após um breve intervalo
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Erro ao registrar devolução:', error);
      setError('Erro ao registrar devolução. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="loading">Carregando livros emprestados...</div>;
  }

  return (
    <div className="form-page">
      <h1 className="page-title">Registrar Devolução</h1>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="livro" className="form-label">Livro</label>
          <select
            id="livro"
            className="form-select"
            value={selectedLivroId}
            onChange={(e) => setSelectedLivroId(e.target.value)}
            required
          >
            <option value="">Selecione um livro</option>
            {livrosEmprestados.map((livro) => (
              <option key={livro.id} value={livro.id}>
                {livro.titulo} - {livro.autor}
              </option>
            ))}
          </select>
          {livrosEmprestados.length === 0 && (
            <p className="form-error">Não há livros emprestados no momento.</p>
          )}
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="button button-primary"
            disabled={loading || livrosEmprestados.length === 0}
          >
            {loading ? 'Registrando...' : 'Registrar Devolução'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarDevolucaoPage; 