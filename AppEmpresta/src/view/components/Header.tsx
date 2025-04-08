import React from 'react';
import { Link } from 'react-router-dom';
import './Header.css';

const Header: React.FC = () => {
  return (
    <header className="header">
      <div className="container">
        <div className="header-content">
          <h1 className="header-title">
            <Link to="/">App Empresta</Link>
          </h1>
          <nav className="header-nav">
            <Link to="/" className="nav-link">Home</Link>
            <Link to="/registrar-livro" className="nav-link">Registrar Livro</Link>
            <Link to="/registrar-pessoa" className="nav-link">Registrar Pessoa</Link>
            <Link to="/registrar-emprestimo" className="nav-link">Registrar Empréstimo</Link>
            <Link to="/registrar-devolucao" className="nav-link">Registrar Devolução</Link>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header; 