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
const RegistrarEmprestimoPage = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [livros, setLivros] = (0, react_1.useState)([]);
    const [pessoas, setPessoas] = (0, react_1.useState)([]);
    const [selectedLivroId, setSelectedLivroId] = (0, react_1.useState)('');
    const [selectedPessoaId, setSelectedPessoaId] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [initialLoading, setInitialLoading] = (0, react_1.useState)(true);
    const [error, setError] = (0, react_1.useState)(null);
    const [success, setSuccess] = (0, react_1.useState)(null);
    (0, react_1.useEffect)(() => {
        const fetchData = () => __awaiter(void 0, void 0, void 0, function* () {
            try {
                const [livrosData, pessoasData] = yield Promise.all([
                    api_1.livroService.listarDisponiveis(),
                    api_1.pessoaService.listarTodos ? api_1.pessoaService.listarTodos() : []
                ]);
                setLivros(livrosData);
                setPessoas(pessoasData);
            }
            catch (error) {
                console.error('Erro ao carregar dados:', error);
                setError('Erro ao carregar dados. Por favor, recarregue a página.');
            }
            finally {
                setInitialLoading(false);
            }
        });
        fetchData();
    }, []);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b;
        e.preventDefault();
        if (!selectedLivroId || !selectedPessoaId) {
            setError('Selecione um livro e uma pessoa.');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            yield api_1.emprestimoService.criar({
                livroId: Number(selectedLivroId),
                pessoaId: Number(selectedPessoaId)
            });
            setSuccess('Empréstimo registrado com sucesso!');
            setSelectedLivroId('');
            setSelectedPessoaId('');
            // Atualizar lista de livros disponíveis
            const livrosAtualizados = yield api_1.livroService.listarDisponiveis();
            setLivros(livrosAtualizados);
            // Redirecionar após um breve intervalo
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
        catch (error) {
            console.error('Erro ao registrar empréstimo:', error);
            setError(((_b = (_a = error.response) === null || _a === void 0 ? void 0 : _a.data) === null || _b === void 0 ? void 0 : _b.erro) || 'Erro ao registrar empréstimo. Por favor, tente novamente.');
        }
        finally {
            setLoading(false);
        }
    });
    if (initialLoading) {
        return (0, jsx_runtime_1.jsx)("div", { className: "loading", children: "Carregando dados..." });
    }
    return ((0, jsx_runtime_1.jsxs)("div", { className: "form-page", children: [(0, jsx_runtime_1.jsx)("h1", { className: "page-title", children: "Registrar Empr\u00E9stimo" }), error && (0, jsx_runtime_1.jsx)("div", { className: "error-message", children: error }), success && (0, jsx_runtime_1.jsx)("div", { className: "success-message", children: success }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "form", children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "livro", className: "form-label", children: "Livro" }), (0, jsx_runtime_1.jsxs)("select", { id: "livro", className: "form-select", value: selectedLivroId, onChange: (e) => setSelectedLivroId(e.target.value), required: true, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Selecione um livro" }), livros.map((livro) => ((0, jsx_runtime_1.jsxs)("option", { value: livro.id, children: [livro.titulo, " - ", livro.autor] }, livro.id)))] }), livros.length === 0 && ((0, jsx_runtime_1.jsx)("p", { className: "form-error", children: "N\u00E3o h\u00E1 livros dispon\u00EDveis para empr\u00E9stimo." }))] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "pessoa", className: "form-label", children: "Pessoa" }), (0, jsx_runtime_1.jsxs)("select", { id: "pessoa", className: "form-select", value: selectedPessoaId, onChange: (e) => setSelectedPessoaId(e.target.value), required: true, children: [(0, jsx_runtime_1.jsx)("option", { value: "", children: "Selecione uma pessoa" }), pessoas.map((pessoa) => ((0, jsx_runtime_1.jsxs)("option", { value: pessoa.id, children: [pessoa.nome, " (", pessoa.email, ")"] }, pessoa.id)))] }), pessoas.length === 0 && ((0, jsx_runtime_1.jsx)("p", { className: "form-error", children: "N\u00E3o h\u00E1 pessoas cadastradas. Cadastre uma pessoa primeiro." }))] }), (0, jsx_runtime_1.jsx)("div", { className: "form-actions", children: (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "button button-primary", disabled: loading || livros.length === 0 || pessoas.length === 0, children: loading ? 'Registrando...' : 'Registrar Empréstimo' }) })] })] }));
};
exports.default = RegistrarEmprestimoPage;
