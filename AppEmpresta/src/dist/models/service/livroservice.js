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
exports.listarLivrosDisponiveis = exports.atualizaStatus = exports.listarTodosLivros = exports.cadastrarLivro = void 0;
const dataSource_1 = require("../config/dataSource");
const livro_1 = require("../livro");
const livroRepo = dataSource_1.AppDataSource.getRepository(livro_1.Livro);
const cadastrarLivro = (dados) => __awaiter(void 0, void 0, void 0, function* () {
    const { titulo, autor, categoria } = dados;
    if (!titulo || !autor) {
        throw new Error("Título e autor são obrigatórios");
    }
    const livroExistente = yield livroRepo.findOne({ where: { titulo, autor } });
    if (livroExistente) {
        throw new Error("Livro já cadastrado");
    }
    const novoLivro = livroRepo.create(Object.assign(Object.assign({}, dados), { status: "disponivel" }));
    return yield livroRepo.save(novoLivro);
});
exports.cadastrarLivro = cadastrarLivro;
const listarTodosLivros = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield livroRepo.find();
});
exports.listarTodosLivros = listarTodosLivros;
const atualizaStatus = (dados) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, status } = dados;
    if (!id || !status) {
        throw new Error("ID e novo status são obrigatórios");
    }
    const livro = yield livroRepo.findOneBy({ id });
    if (!livro) {
        throw new Error("Livro não encontrado");
    }
    livro.status = status;
    return yield livroRepo.save(livro);
});
exports.atualizaStatus = atualizaStatus;
const listarLivrosDisponiveis = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield livroRepo.find({ where: { status: "disponivel" } });
});
exports.listarLivrosDisponiveis = listarLivrosDisponiveis;
