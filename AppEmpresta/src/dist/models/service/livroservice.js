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
exports.LivroService = void 0;
const dataSource_1 = require("../config/dataSource");
const livro_1 = require("../livro");
class LivroService {
    constructor() {
        this.livroRepository = dataSource_1.AppDataSource.getRepository(livro_1.Livro);
    }
    cadastrarLivro(dados) {
        return __awaiter(this, void 0, void 0, function* () {
            // Validação básica (opcional)
            if (!dados.titulo || !dados.autor) {
                throw new Error("Título e autor são obrigatórios");
            }
            const novoLivro = this.livroRepository.create(dados);
            return yield this.livroRepository.save(novoLivro);
        });
    }
    listarTodos() {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.livroRepository.find();
        });
    }
    listarTodosDisponiveis() {
        return __awaiter(this, void 0, void 0, function* () {
            const livros = yield this.livroRepository.find({ where: { status: "disponivel" } });
            console.log("Livros disponíveis encontrados:", livros);
            return livros;
        });
    }
    buscarPorId(id) {
        return __awaiter(this, void 0, void 0, function* () {
            return yield this.livroRepository.findOneBy({ id });
        });
    }
}
exports.LivroService = LivroService;
