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
exports.registrarDevolucao = exports.criarEmprestimo = void 0;
const dataSource_1 = require("../config/dataSource");
const emprestimo_1 = require("../emprestimo");
const pessoa_1 = require("../pessoa");
const livro_1 = require("../livro");
const criarEmprestimo = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { pessoaId, livroId } = req.body;
    try {
        const emprestimoRepo = dataSource_1.AppDataSource.getRepository(emprestimo_1.Emprestimo);
        const pessoaRepo = dataSource_1.AppDataSource.getRepository(pessoa_1.Pessoa);
        const livroRepo = dataSource_1.AppDataSource.getRepository(livro_1.Livro);
        const pessoa = yield pessoaRepo.findOneBy({ id: pessoaId });
        if (!pessoa)
            return res.status(404).json({ mensagem: "Pessoa não encontrada" });
        const livro = yield livroRepo.findOneBy({ id: livroId });
        if (!livro)
            return res.status(404).json({ mensagem: "Livro não encontrado" });
        if (livro.status !== "disponivel") {
            return res.status(400).json({ mensagem: "Livro indisponível para empréstimo" });
        }
        // Atualiza status para emprestado
        livro.status = "emprestado";
        yield livroRepo.save(livro);
        const novoEmprestimo = emprestimoRepo.create({
            livro,
            pessoa,
            data_emprestimo: new Date(),
        });
        const resultado = yield emprestimoRepo.save(novoEmprestimo);
        return res.status(201).json(resultado);
    }
    catch (erro) {
        console.error("Erro ao criar empréstimo:", erro);
        return res.status(500).json({ erro: "Erro interno ao criar empréstimo" });
    }
});
exports.criarEmprestimo = criarEmprestimo;
const registrarDevolucao = (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = req.params;
    const { data_devolucao } = req.body;
    try {
        const emprestimoRepo = dataSource_1.AppDataSource.getRepository(emprestimo_1.Emprestimo);
        const emprestimo = yield emprestimoRepo.findOneBy({ id: parseInt(id) });
        if (!emprestimo) {
            return res.status(404).json({ mensagem: "Empréstimo não encontrado" });
        }
        // Atualiza a data_devolucao com a data atual
        emprestimo.data_devolucao = data_devolucao;
        yield emprestimoRepo.save(emprestimo);
        return res.status(200).json({ mensagem: "Devolução registrada com sucesso", emprestimo });
        0;
    }
    catch (erro) {
        console.error("Erro ao registrar devolução:", erro);
        return res.status(500).json({ erro: "Erro interno ao registrar devolução" });
    }
});
exports.registrarDevolucao = registrarDevolucao;
