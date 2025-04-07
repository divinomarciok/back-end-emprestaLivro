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
exports.livroController = void 0;
const livroservice_1 = require("../models/service/livroservice");
exports.livroController = {
    cadastrar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const livro = yield (0, livroservice_1.cadastrarLivro)(req.body);
            res.status(201).json(livro);
        }
        catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }),
    listarTodos: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const livros = yield (0, livroservice_1.listarTodosLivros)();
            res.status(200).json(livros);
        }
        catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }),
    listarLivrosDisponiveis: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const livrosDisponiveis = yield (0, livroservice_1.listarLivrosDisponiveis)();
            res.status(200).json(livrosDisponiveis);
        }
        catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }),
    atualizaStatus: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const atualizaLivro = yield (0, livroservice_1.atualizaStatus)(req.body);
            res.status(200).json(atualizaLivro);
        }
        catch (error) {
            res.status(400).json({ error: error.message });
        }
    })
};
