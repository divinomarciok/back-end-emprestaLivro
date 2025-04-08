"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
const Header_1 = __importDefault(require("./components/Header"));
const HomePage_1 = __importDefault(require("./pages/HomePage"));
const RegistrarLivroPage_1 = __importDefault(require("./pages/RegistrarLivroPage"));
const RegistrarPessoaPage_1 = __importDefault(require("./pages/RegistrarPessoaPage"));
const RegistrarEmprestimoPage_1 = __importDefault(require("./pages/RegistrarEmprestimoPage"));
const RegistrarDevolucaoPage_1 = __importDefault(require("./pages/RegistrarDevolucaoPage"));
const App = () => {
    return ((0, jsx_runtime_1.jsxs)("div", { className: "app", children: [(0, jsx_runtime_1.jsx)(Header_1.default, {}), (0, jsx_runtime_1.jsx)("main", { className: "container", children: (0, jsx_runtime_1.jsxs)(react_router_dom_1.Routes, { children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/", element: (0, jsx_runtime_1.jsx)(HomePage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/registrar-livro", element: (0, jsx_runtime_1.jsx)(RegistrarLivroPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/registrar-pessoa", element: (0, jsx_runtime_1.jsx)(RegistrarPessoaPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/registrar-emprestimo", element: (0, jsx_runtime_1.jsx)(RegistrarEmprestimoPage_1.default, {}) }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Route, { path: "/registrar-devolucao", element: (0, jsx_runtime_1.jsx)(RegistrarDevolucaoPage_1.default, {}) })] }) })] }));
};
exports.default = App;
