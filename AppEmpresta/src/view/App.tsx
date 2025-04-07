import React from 'react';
import { Routes, Route } from 'react-router-dom';
import Header from './components/Header';
import HomePage from './pages/HomePage';
import RegistrarLivroPage from './pages/RegistrarLivroPage';
import RegistrarPessoaPage from './pages/RegistrarPessoaPage';
import RegistrarEmprestimoPage from './pages/RegistrarEmprestimoPage';
import RegistrarDevolucaoPage from './pages/RegistrarDevolucaoPage';

const App: React.FC = () => {
  return (
    <div className="app">
      <Header />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/registrar-livro" element={<RegistrarLivroPage />} />
          <Route path="/registrar-pessoa" element={<RegistrarPessoaPage />} />
          <Route path="/registrar-emprestimo" element={<RegistrarEmprestimoPage />} />
          <Route path="/registrar-devolucao" element={<RegistrarDevolucaoPage />} />
        </Routes>
      </main>
    </div>
  );
};

export default App; 