import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { livroService, pessoaService, emprestimoService } from '../services/api';
import { Livro, Pessoa } from '../models/types';
import './FormPages.css';

const RegistrarEmprestimoPage: React.FC = () => {
  const navigate = useNavigate();
  const [livros, setLivros] = useState<Livro[]>([]);
  const [pessoas, setPessoas] = useState<Pessoa[]>([]);
  const [selectedLivroId, setSelectedLivroId] = useState('');
  const [selectedPessoaId, setSelectedPessoaId] = useState('');
  const [loading, setLoading] = useState(false);
  const [initialLoading, setInitialLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const [livrosData, pessoasData] = await Promise.all([
          livroService.listarDisponiveis(),
          pessoaService.listarTodos ? pessoaService.listarTodos() : []
        ]);
        
        setLivros(livrosData);
        setPessoas(pessoasData);
      } catch (error) {
        console.error('Erro ao carregar dados:', error);
        setError('Erro ao carregar dados. Por favor, recarregue a página.');
      } finally {
        setInitialLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!selectedLivroId || !selectedPessoaId) {
      setError('Selecione um livro e uma pessoa.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await emprestimoService.criar({
        livroId: Number(selectedLivroId),
        pessoaId: Number(selectedPessoaId)
      });
      
      setSuccess('Empréstimo registrado com sucesso!');
      setSelectedLivroId('');
      setSelectedPessoaId('');
      
      // Atualizar lista de livros disponíveis
      const livrosAtualizados = await livroService.listarDisponiveis();
      setLivros(livrosAtualizados);
      
      // Redirecionar após um breve intervalo
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error: any) {
      console.error('Erro ao registrar empréstimo:', error);
      setError(error.response?.data?.erro || 'Erro ao registrar empréstimo. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  if (initialLoading) {
    return <div className="loading">Carregando dados...</div>;
  }

  return (
    <div className="form-page">
      <h1 className="page-title">Registrar Empréstimo</h1>
      
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
            {livros.map((livro) => (
              <option key={livro.id} value={livro.id}>
                {livro.titulo} - {livro.autor}
              </option>
            ))}
          </select>
          {livros.length === 0 && (
            <p className="form-error">Não há livros disponíveis para empréstimo.</p>
          )}
        </div>
        
        <div className="form-group">
          <label htmlFor="pessoa" className="form-label">Pessoa</label>
          <select
            id="pessoa"
            className="form-select"
            value={selectedPessoaId}
            onChange={(e) => setSelectedPessoaId(e.target.value)}
            required
          >
            <option value="">Selecione uma pessoa</option>
            {pessoas.map((pessoa) => (
              <option key={pessoa.id} value={pessoa.id}>
                {pessoa.nome} ({pessoa.email})
              </option>
            ))}
          </select>
          {pessoas.length === 0 && (
            <p className="form-error">Não há pessoas cadastradas. Cadastre uma pessoa primeiro.</p>
          )}
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="button button-primary"
            disabled={loading || livros.length === 0 || pessoas.length === 0}
          >
            {loading ? 'Registrando...' : 'Registrar Empréstimo'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarEmprestimoPage; 