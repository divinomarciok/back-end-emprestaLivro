"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_1 = require("react");
const react_router_dom_1 = require("react-router-dom");
const api_1 = require("../services/api");
require("./HomePage.css");
const HomePage = () => {
    const [livros, setLivros] = (0, react_1.useState)([]);
    const [loading, setLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchLivros = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                setLoading(true);
                const data = yield api_1.livroService.listarTodos();
                setLivros(data);
                setError(null);
            }
            catch (error) {
                console.error('Erro ao carregar livros:', error);
                setError('Erro ao carregar a lista de livros. Por favor, tente novamente.');
            }
            finally {
                setLoading(false);
            }
        });
        fetchLivros();
    }, []);
    return ((0, jsx_runtime_1.jsxs)("div", { className: "home-page", children: [(0, jsx_runtime_1.jsxs)("div", { className: "home-header", children: [(0, jsx_runtime_1.jsx)("h1", { className: "page-title", children: "Biblioteca" }), (0, jsx_runtime_1.jsxs)("div", { className: "home-actions", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/registrar-livro", className: "button button-primary", children: "Registrar Livro" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/registrar-pessoa", className: "button button-primary", children: "Registrar Pessoa" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/registrar-emprestimo", className: "button button-primary", children: "Registrar Empr\u00E9stimo" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/registrar-devolucao", className: "button button-primary", children: "Registrar Devolu\u00E7\u00E3o" })] })] }), loading ? ((0, jsx_runtime_1.jsx)("div", { className: "loading", children: "Carregando livros..." })) : error ? ((0, jsx_runtime_1.jsx)("div", { className: "error-message", children: error })) : ((0, jsx_runtime_1.jsxs)(jsx_runtime_1.Fragment, { children: [(0, jsx_runtime_1.jsx)("h2", { className: "section-title", children: "Todos os Livros" }), (0, jsx_runtime_1.jsx)("div", { className: "grid", children: livros.length > 0 ? (livros.map((livro) => ((0, jsx_runtime_1.jsxs)("div", { className: "card livro-card", children: [(0, jsx_runtime_1.jsx)("h3", { className: "card-title", children: livro.titulo }), (0, jsx_runtime_1.jsxs)("div", { className: "card-content", children: [(0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Autor:" }), " ", livro.autor] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "ISBN:" }), " ", livro.isbn] }), (0, jsx_runtime_1.jsxs)("p", { children: [(0, jsx_runtime_1.jsx)("strong", { children: "Status:" }), ' ', (0, jsx_runtime_1.jsx)("span", { className: `status-${livro.status.toLowerCase()}`, children: livro.status === 'disponivel' ? 'Disponível' : 'Emprestado' })] })] })] }, livro.id)))) : ((0, jsx_runtime_1.jsx)("p", { className: "no-books-message", children: "Nenhum livro cadastrado. Adicione seu primeiro livro!" })) })] }))] }));
};
exports.default = HomePage;
