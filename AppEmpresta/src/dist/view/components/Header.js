"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const jsx_runtime_1 = require("react/jsx-runtime");
const react_router_dom_1 = require("react-router-dom");
require("./Header.css");
const Header = () => {
    return ((0, jsx_runtime_1.jsx)("header", { className: "header", children: (0, jsx_runtime_1.jsx)("div", { className: "container", children: (0, jsx_runtime_1.jsxs)("div", { className: "header-content", children: [(0, jsx_runtime_1.jsx)("h1", { className: "header-title", children: (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", children: "App Empresta" }) }), (0, jsx_runtime_1.jsxs)("nav", { className: "header-nav", children: [(0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/", className: "nav-link", children: "Home" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/registrar-livro", className: "nav-link", children: "Registrar Livro" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/registrar-pessoa", className: "nav-link", children: "Registrar Pessoa" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/registrar-emprestimo", className: "nav-link", children: "Registrar Empr\u00E9stimo" }), (0, jsx_runtime_1.jsx)(react_router_dom_1.Link, { to: "/registrar-devolucao", className: "nav-link", children: "Registrar Devolu\u00E7\u00E3o" })] })] }) }) }));
};
exports.default = Header;
