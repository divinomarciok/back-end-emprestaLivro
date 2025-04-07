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
exports.PessoaService = void 0;
// src/services/PessoaService.ts
const dataSource_1 = require("../config/dataSource");
const pessoa_1 = require("../pessoa");
class PessoaService {
    constructor() {
        this.pessoaRepository = dataSource_1.AppDataSource.getRepository(pessoa_1.Pessoa);
    }
    criarPessoa(nome, matricula, email) {
        return __awaiter(this, void 0, void 0, function* () {
            const novaPessoa = this.pessoaRepository.create({ nome, matricula, email });
            return yield this.pessoaRepository.save(novaPessoa);
        });
    }
    listarPessoas() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.pessoaRepository.find();
        });
    }
}
exports.PessoaService = PessoaService;
