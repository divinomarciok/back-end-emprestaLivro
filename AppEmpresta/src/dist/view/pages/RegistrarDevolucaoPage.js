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
require("./FormPages.css");
const RegistrarDevolucaoPage = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [livrosEmprestados, setLivrosEmprestados] = (0, react_1.useState)([]);
    const [selectedLivroId, setSelectedLivroId] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [initialLoading, setInitialLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [success, setSuccess] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchLivrosEmprestados = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                // Buscar todos os livros e filtrar os emprestados
                const livros = yield api_1.livroService.listarTodos();
                const emprestados = livros.filter((livro) => livro.status === 'emprestado');
                setLivrosEmprestados(emprestados);
            }
            catch (error) {
                console.error('Erro ao carregar livros emprestados:', error);
                setError('Erro ao carregar livros emprestados. Por favor, recarregue a página.');
            }
            finally {
                setInitialLoading(false);
            }
        });
        fetchLivrosEmprestados();
    }, []);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!selectedLivroId) {
            setError('Selecione um livro para registrar a devolução.');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            // Atualizar o status do livro para disponível
            yield api_1.livroService.atualizarStatus({
                id: Number(selectedLivroId),
                status: 'disponivel'
            });
            setSuccess('Devolução registrada com sucesso!');
            setSelectedLivroId('');
            // Atualizar lista de livros emprestados
            const livros = yield api_1.livroService.listarTodos();
            const emprestados = livros.filter((livro) => livro.status === 'emprestado');
            setLivrosEmprestados(emprestados);
            // Redirecionar após um breve intervalo
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
        catch (error) {
            console.error('Erro ao registrar devolução:', error);
            setError('Erro ao registrar devolução. Por favor, tente novamente.');
        }
        finally {
            setLoading(false);
        }
    });
    if (initialLoading) {
        return (0, jsx_runtime_1.jsx)("div", { className: "loading", children: "Carregando livros emprestados..." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "form-page", children: [(0, jsx_runtime_1.jsx)("h1", { className: "page-title", children: "Registrar Devolu\u00E7\u00E3o" }), error && (0, jsx_runtime_1.jsx)("div", { className: "error-message", children: error }), success && (0, jsx_runtime_1.jsx)("div", { className: "success-message", children: success }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "form", children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "livro", className: "form-label", children: "Livro" }), (0, jsx_runtime_1.jsxs)("select", { id: "livro", className: "form-select", value: selectedLivroId, onChange: (e) => setSelectedLivroId(e.target.value), required: true, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Selecione um livro" }), livrosEmprestados.map((livro) => ((0, jsx_runtime_1.jsxs)("option", { value: livro.id, children: [livro.titulo, " - ", livro.autor] }, livro.id)))] }), livrosEmprestados.length === 0 && ((0, jsx_runtime_1.jsx)("p", { className: "form-error", children: "N\u00E3o h\u00E1 livros emprestados no momento." }))] }), (0, jsx_runtime_1.jsx)("div", { className: "form-actions", children: (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "button button-primary", disabled: loading || livrosEmprestados.length === 0, children: loading ? 'Registrando...' : 'Registrar Devolução' }) })] })] }));
};
exports.default = RegistrarDevolucaoPage;
