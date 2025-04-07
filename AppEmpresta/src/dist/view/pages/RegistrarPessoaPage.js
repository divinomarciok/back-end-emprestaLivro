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
const RegistrarPessoaPage = () => {
    const navigate = (0, react_router_dom_1.useNavigate)();
    const [nome, setNome] = (0, react_1.useState)('');
    const [email, setEmail] = (0, react_1.useState)('');
    const [matricula, setMatricula] = (0, react_1.useState)('');
    const [loading, setLoading] = (0, react_1.useState)(false);
    const [error, setError] = (0, react_1.useState)(null);
    const [success, setSuccess] = (0, react_1.useState)(null);
    const handleSubmit = (e) => __awaiter(void 0, void 0, void 0, function* () {
        e.preventDefault();
        if (!nome || !email) {
            setError('Todos os campos são obrigatórios.');
            return;
        }
        try {
            setLoading(true);
            setError(null);
            yield api_1.pessoaService.criar({ nome, matricula, email });
            setSuccess('Pessoa cadastrada com sucesso!');
            setNome('');
            setEmail('');
            // Redirecionar após um breve intervalo
            setTimeout(() => {
                navigate('/');
            }, 2000);
        }
        catch (error) {
            console.error('Erro ao cadastrar pessoa:', error);
            setError('Erro ao cadastrar pessoa. Por favor, tente novamente.');
        }
        finally {
            setLoading(false);
        }
    });
    return ((0, jsx_runtime_1.jsxs)("div", { className: "form-page", children: [(0, jsx_runtime_1.jsx)("h1", { className: "page-title", children: "Registrar Pessoa" }), error && (0, jsx_runtime_1.jsx)("div", { className: "error-message", children: error }), success && (0, jsx_runtime_1.jsx)("div", { className: "success-message", children: success }), (0, jsx_runtime_1.jsxs)("form", { onSubmit: handleSubmit, className: "form", children: [(0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "nome", className: "form-label", children: "Nome" }), (0, jsx_runtime_1.jsx)("input", { type: "text", id: "nome", className: "form-input", value: nome, onChange: (e) => setNome(e.target.value), required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "email", className: "form-label", children: "Email" }), (0, jsx_runtime_1.jsx)("input", { type: "email", id: "email", className: "form-input", value: email, onChange: (e) => setEmail(e.target.value), required: true })] }), (0, jsx_runtime_1.jsxs)("div", { className: "form-group", children: [(0, jsx_runtime_1.jsx)("label", { htmlFor: "matricula", className: "form-label", children: "Matricula" }), (0, jsx_runtime_1.jsx)("input", { type: "matricula", id: "matricula", className: "form-input", value: matricula, onChange: (e) => setMatricula(e.target.value), required: true })] }), (0, jsx_runtime_1.jsx)("div", { className: "form-actions", children: (0, jsx_runtime_1.jsx)("button", { type: "submit", className: "button button-primary", disabled: loading, children: loading ? 'Registrando...' : 'Registrar Pessoa' }) })] })] }));
};
exports.default = RegistrarPessoaPage;
