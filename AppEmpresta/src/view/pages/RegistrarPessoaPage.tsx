import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { pessoaService } from '../services/api';
import './FormPages.css';

const RegistrarPessoaPage: React.FC = () => {
  const navigate = useNavigate();
  const [nome, setNome] = useState('');
  const [email, setEmail] = useState('');
  const [matricula, setMatricula] = useState('');

  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [success, setSuccess] = useState<string | null>(null);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!nome || !email) {
      setError('Todos os campos são obrigatórios.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      
      await pessoaService.criar({ nome, matricula, email });
      
      setSuccess('Pessoa cadastrada com sucesso!');
      setNome('');
      setEmail('');
      
      // Redirecionar após um breve intervalo
      setTimeout(() => {
        navigate('/');
      }, 2000);
    } catch (error) {
      console.error('Erro ao cadastrar pessoa:', error);
      setError('Erro ao cadastrar pessoa. Por favor, tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="form-page">
      <h1 className="page-title">Registrar Pessoa</h1>
      
      {error && <div className="error-message">{error}</div>}
      {success && <div className="success-message">{success}</div>}
      
      <form onSubmit={handleSubmit} className="form">
        <div className="form-group">
          <label htmlFor="nome" className="form-label">Nome</label>
          <input
            type="text"
            id="nome"
            className="form-input"
            value={nome}
            onChange={(e) => setNome(e.target.value)}
            required
          />
        </div>
        
        <div className="form-group">
          <label htmlFor="email" className="form-label">Email</label>
          <input
            type="email"
            id="email"
            className="form-input"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="form-group">
          <label htmlFor="matricula" className="form-label">Matricula</label>
          <input
            type="matricula"
            id="matricula"
            className="form-input"
            value={matricula}
            onChange={(e) => setMatricula(e.target.value)}
            required
          />
        </div>
        
        <div className="form-actions">
          <button 
            type="submit" 
            className="button button-primary"
            disabled={loading}
          >
            {loading ? 'Registrando...' : 'Registrar Pessoa'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default RegistrarPessoaPage; 