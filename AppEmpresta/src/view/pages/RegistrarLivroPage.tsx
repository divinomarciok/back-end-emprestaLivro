import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { livroService } from '../services/api';
import './FormPages.css';

const RegistrarLivroPage: React.FC = () => {
  const navigate = useNavigate();
  const [titulo, setTitulo] = useState('');
  const [autor, setAutor] = useState('');
  const [categoria, setCategoria] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!titulo || !autor || !categoria) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await livroService.cadastrar({ titulo, autor, categoria });
      
      setSuccess('Livro cadastrado com sucesso!');
      setTitulo('');
      setAutor('');
      setCategoria('');
      
      // Redirecionar após um breve intervalo
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Erro ao cadastrar livro:', error);
      setError('Erro ao cadastrar livro. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <h1 className="page-title">Registrar Livro</h1>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="titulo" className="form-label">Título</label>
          <input
            type="text"
            id="titulo"
            className="form-input"
            value={titulo}
            onChange={(e) => setTitulo(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="autor" className="form-label">Autor</label>
          <input
            type="text"
            id="autor"
            className="form-input"
            value={autor}
            onChange={(e) => setAutor(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="categoria" className="form-label">Categoria</label>
          <input
            type="text"
            id="categoria"
            className="form-input"
            value={categoria}
            onChange={(e) => setCategoria(e.target.value)}
            required
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="button button-primary"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar Livro'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarLivroPage; 