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
const RegistrarLivroPage = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [titulo, setTitulo] = (0, react_1.useState)('');
    const [autor, setAutor] = (0, react_1.useState)('');
    const [categoria, setCategoria] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [success, setSuccess] = (0, react_1.useState)(null);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!titulo || !autor || !categoria) {
            setError('Todos os campos são obrigatórios.');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            yield api_1.livroService.cadastrar({ titulo, autor, categoria });
            setSuccess('Livro cadastrado com sucesso!');
            setTitulo('');
            setAutor('');
            setCategoria('');
            // Redirecionar após um breve intervalo
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
        catch (error) {
            console.error('Erro ao cadastrar livro:', error);
            setError('Erro ao cadastrar livro. Por favor, tente novamente.');
        }
        finally {
            setLoading(false);
        }
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "form-page", children: [(0, jsx_runtime_1.jsx)("h1", { className: "page-title", children: "Registrar Livro" }), error && (0, jsx_runtime_1.jsx)("div", { className: "error-message", children: error }), success && (0, jsx_runtime_1.jsx)("div", { className: "success-message", children: success }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "form", children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "titulo", className: "form-label", children: "T\u00EDtulo" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "titulo", className: "form-input", value: titulo, onChange: (e) => setTitulo(e.target.value), required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "autor", className: "form-label", children: "Autor" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "autor", className: "form-input", value: autor, onChange: (e) => setAutor(e.target.value), required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "categoria", className: "form-label", children: "Categoria" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "categoria", className: "form-input", value: categoria, onChange: (e) => setCategoria(e.target.value), required: true })] }), (0, jsx_runtime_1.jsx)("div", { className: "form-actions", children: (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "button button-primary", disabled: loading, children: loading ? 'Registrando...' : 'Registrar Livro' }) })] })] }));
};
exports.default = RegistrarLivroPage;
