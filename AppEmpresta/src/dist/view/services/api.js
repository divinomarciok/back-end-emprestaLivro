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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.emprestimoService = exports.pessoaService = exports.livroService = void 0;
const axios_1 = __importDefault(require("axios"));
// Base API configuration
const api = axios_1.default.create({
    baseURL: 'http://localhost:3000/api',
    headers: {
        'Content-Type': 'application/json',
    },
});
// API endpoints for books
exports.livroService = {
    listarTodos: () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get('/livros');
        return response.data;
    }),
    listarDisponiveis: () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get('/livros/disponiveis');
        return response.data;
    }),
    cadastrar: (livro) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.post('/livros', livro);
        return response.data;
    }),
    atualizarStatus: (data) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.post('/livros/atualiza', data);
        return response.data;
    })
};
// API endpoints for people
exports.pessoaService = {
    listarTodos: () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get('/pessoas');
        return response.data;
    }),
    criar: (pessoa) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.post('/pessoas', pessoa);
        return response.data;
    })
};
// API endpoints for loans
exports.emprestimoService = {
    listarAtivos: () => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.get('/emprestimos');
        return response.data;
    }),
    criar: (emprestimo) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.post('/emprestimo', emprestimo);
        return response.data;
    }),
    registrarDevolucao: (id) => __awaiter(void 0, void 0, void 0, function* () {
        const response = yield api.put(`/emprestimos/${id}/devolucao`);
        return response.data;
    })
};
exports.default = api;
