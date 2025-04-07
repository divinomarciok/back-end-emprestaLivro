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
exports.buscarEmprestimoPorId = exports.listarEmprestimosAtivos = exports.listarTodosEmprestimos = exports.registrarDevolucao = exports.criarEmprestimo = void 0;
const dataSource_1 = require("../config/dataSource");
const emprestimo_1 = require("../emprestimo");
const pessoa_1 = require("../pessoa");
const livro_1 = require("../livro");
const typeorm_1 = require("typeorm");
const emprestimoRepo = dataSource_1.AppDataSource.getRepository(emprestimo_1.Emprestimo);
const pessoaRepo = dataSource_1.AppDataSource.getRepository(pessoa_1.Pessoa);
const livroRepo = dataSource_1.AppDataSource.getRepository(livro_1.Livro);
const criarEmprestimo = (dados) => __awaiter(void 0, void 0, void 0, function* () {
    const { pessoaId, livroId } = dados;
    const pessoa = yield pessoaRepo.findOneBy({ id: pessoaId });
    if (!pessoa) {
        throw new Error("Pessoa não encontrada");
    }
    const livro = yield livroRepo.findOneBy({ id: livroId });
    if (!livro) {
        throw new Error("Livro não encontrado");
    }
    if (livro.status !== "disponivel") {
        throw new Error("Livro indisponível para empréstimo");
    }
    // Atualiza status para emprestado
    livro.status = "emprestado";
    yield livroRepo.save(livro);
    const novoEmprestimo = emprestimoRepo.create({
        livro,
        pessoa,
        data_emprestimo: new Date()
    });
    return yield emprestimoRepo.save(novoEmprestimo);
});
exports.criarEmprestimo = criarEmprestimo;
const registrarDevolucao = (dados) => __awaiter(void 0, void 0, void 0, function* () {
    const { id, data_devolucao } = dados;
    const emprestimo = yield emprestimoRepo.findOneBy({ id });
    if (!emprestimo) {
        throw new Error("Empréstimo não encontrado");
    }
    emprestimo.data_devolucao = data_devolucao || new Date();
    const livro = yield livroRepo.findOneBy({ id: emprestimo.livro.id });
    if (livro) {
        livro.status = "disponivel";
        yield livroRepo.save(livro);
    }
    return yield emprestimoRepo.save(emprestimo);
});
exports.registrarDevolucao = registrarDevolucao;
const listarTodosEmprestimos = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield emprestimoRepo.find({
        relations: ["livro", "pessoa"]
    });
});
exports.listarTodosEmprestimos = listarTodosEmprestimos;
const listarEmprestimosAtivos = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield emprestimoRepo.find({
        where: { data_devolucao: (0, typeorm_1.IsNull)() },
        relations: ["livro", "pessoa"]
    });
});
exports.listarEmprestimosAtivos = listarEmprestimosAtivos;
const buscarEmprestimoPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield emprestimoRepo.findOne({
        where: { id },
        relations: ["livro", "pessoa"]
    });
});
exports.buscarEmprestimoPorId = buscarEmprestimoPorId;
