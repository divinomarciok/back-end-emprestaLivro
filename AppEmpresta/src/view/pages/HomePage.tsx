import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { livroService } from '../services/api';
import { Livro } from '../models/types';
import './HomePage.css';

const HomePage: React.FC = () => {
  const [livros, setLivros] = useState<Livro[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchLivros = async () => {
      try {
        setLoading(true);
        const data = await livroService.listarTodos();
        setLivros(data);
        setError(null);
      } catch (error) {
        console.error('Erro ao carregar livros:', error);
        setError('Erro ao carregar a lista de livros. Por favor, tente novamente.');
      } finally {
        setLoading(false);
      }
    };

    fetchLivros();
  }, []);

  return (
    <div className="home-page">
      <div className="home-header">
        <h1 className="page-title">Biblioteca</h1>
        <div className="home-actions">
          <Link to="/registrar-livro" className="button button-primary">
            Registrar Livro
          </Link>
          <Link to="/registrar-pessoa" className="button button-primary">
            Registrar Pessoa
          </Link>
          <Link to="/registrar-emprestimo" className="button button-primary">
            Registrar Empréstimo
          </Link>
          <Link to="/registrar-devolucao" className="button button-primary">
            Registrar Devolução
          </Link>
        </div>
      </div>

      {loading ? (
        <div className="loading">Carregando livros...</div>
      ) : error ? (
        <div className="error-message">{error}</div>
      ) : (
        <>
          <h2 className="section-title">Todos os Livros</h2>
          <div className="grid">
            {livros.length > 0 ? (
              livros.map((livro) => (
                <div key={livro.id} className="card livro-card">
                  <h3 className="card-title">{livro.titulo}</h3>
                  <div className="card-content">
                    <p><strong>Autor:</strong> {livro.autor}</p>
                    <p><strong>ISBN:</strong> {livro.isbn}</p>
                    <p>
                      <strong>Status:</strong>{' '}
                      <span className={`status-${livro.status.toLowerCase()}`}>
                        {livro.status === 'disponivel' ? 'Disponível' : 'Emprestado'}
                      </span>
                    </p>
                  </div>
                </div>
              ))
            ) : (
              <p className="no-books-message">Nenhum livro cadastrado. Adicione seu primeiro livro!</p>
            )}
          </div>
        </>
      )}
    </div>
  );
};

export default HomePage; 