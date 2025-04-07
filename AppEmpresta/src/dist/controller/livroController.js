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
const livroService = new livroservice_1.LivroService();
exports.livroController = {
    cadastrar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const novoLivro = yield livroService.cadastrarLivro(req.body);
            yield res.status(201).json(novoLivro);
        }
        catch (error) {
            yield res.status(400).json({ erro: error.message });
        }
    }),
    listarTodos: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const novoLivro = yield livroService.listarTodos();
            res.status(201).json(novoLivro);
        }
        catch (error) {
            yield res.status(400).json({ erro: error.message });
        }
    }),
    listarDisponiveis: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const livro = yield livroService.listarTodosDisponiveis();
            res.status(201).json(livro);
        }
        catch (error) {
            res.status(400).json({ erro: error.message });
        }
    })
};
