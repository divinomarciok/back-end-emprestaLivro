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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.removerPessoa = exports.atualizarPessoa = exports.buscarPessoaPorMatricula = exports.buscarPessoaPorId = exports.listarTodasPessoas = exports.criarPessoa = void 0;
const dataSource_1 = require("../config/dataSource");
const pessoa_1 = require("../pessoa");
const pessoaRepo = dataSource_1.AppDataSource.getRepository(pessoa_1.Pessoa);
const criarPessoa = (dados) => __awaiter(void 0, void 0, void 0, function* () {
    const { nome, matricula, email } = dados;
    if (!nome || !matricula || !email) {
        throw new Error("Nome, matrícula e email são obrigatórios");
    }
    const pessoaExistente = yield pessoaRepo.findOne({ where: { matricula } });
    if (pessoaExistente) {
        throw new Error("Já existe uma pessoa cadastrada com esta matrícula");
    }
    const emailExistente = yield pessoaRepo.findOne({ where: { email } });
    if (emailExistente) {
        throw new Error("Este email já está em uso");
    }
    const novaPessoa = pessoaRepo.create(dados);
    return yield pessoaRepo.save(novaPessoa);
});
exports.criarPessoa = criarPessoa;
const listarTodasPessoas = () => __awaiter(void 0, void 0, void 0, function* () {
    return yield pessoaRepo.find();
});
exports.listarTodasPessoas = listarTodasPessoas;
const buscarPessoaPorId = (id) => __awaiter(void 0, void 0, void 0, function* () {
    return yield pessoaRepo.findOneBy({ id });
});
exports.buscarPessoaPorId = buscarPessoaPorId;
const buscarPessoaPorMatricula = (matricula) => __awaiter(void 0, void 0, void 0, function* () {
    return yield pessoaRepo.findOneBy({ matricula });
});
exports.buscarPessoaPorMatricula = buscarPessoaPorMatricula;
const atualizarPessoa = (dados) => __awaiter(void 0, void 0, void 0, function* () {
    const { id } = dados, dadosAtualizacao = __rest(dados, ["id"]);
    if (!id) {
        throw new Error("ID é obrigatório para atualização");
    }
    const pessoa = yield pessoaRepo.findOneBy({ id });
    if (!pessoa) {
        throw new Error("Pessoa não encontrada");
    }
    if (dadosAtualizacao.matricula) {
        const pessoaComMatricula = yield pessoaRepo.findOne({
            where: { matricula: dadosAtualizacao.matricula },
        });
        if (pessoaComMatricula && pessoaComMatricula.id !== id) {
            throw new Error("Esta matrícula já está em uso por outra pessoa");
        }
    }
    if (dadosAtualizacao.email) {
        const pessoaComEmail = yield pessoaRepo.findOne({
            where: { email: dadosAtualizacao.email },
        });
        if (pessoaComEmail && pessoaComEmail.id !== id) {
            throw new Error("Este email já está em uso por outra pessoa");
        }
    }
    Object.assign(pessoa, dadosAtualizacao);
    return yield pessoaRepo.save(pessoa);
});
exports.atualizarPessoa = atualizarPessoa;
const removerPessoa = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const pessoa = yield pessoaRepo.findOneBy({ id });
    if (!pessoa) {
        throw new Error("Pessoa não encontrada");
    }
    yield pessoaRepo.remove(pessoa);
    return true;
});
exports.removerPessoa = removerPessoa;
