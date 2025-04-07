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
exports.pessoaController = void 0;
const pessoaService_1 = require("../models/service/pessoaService");
exports.pessoaController = {
    criar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pessoa = yield (0, pessoaService_1.criarPessoa)(req.body);
            res.status(201).json(pessoa);
        }
        catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }),
    listarTodos: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const pessoas = yield (0, pessoaService_1.listarTodasPessoas)();
            res.status(200).json(pessoas);
        }
        catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }),
    atualizar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const dadosAtualizacao = Object.assign(Object.assign({}, req.body), { id });
            const pessoa = yield (0, pessoaService_1.atualizarPessoa)(dadosAtualizacao);
            res.status(200).json(pessoa);
        }
        catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }),
    remover: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            yield (0, pessoaService_1.removerPessoa)(id);
            res.status(200).json({ mensagem: "Pessoa removida com sucesso" });
        }
        catch (error) {
            res.status(400).json({ erro: error.message });
        }
    })
};
