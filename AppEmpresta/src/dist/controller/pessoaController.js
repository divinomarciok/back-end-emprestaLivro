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
const pessoaService = new pessoaService_1.PessoaService();
exports.pessoaController = {
    criar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        const { nome, matricula, email } = req.body;
        try {
            const pessoa = yield pessoaService.criarPessoa(nome, matricula, email);
            yield res.status(201).json(pessoa);
        }
        catch (error) {
            yield res.status(400).json({ erro: error.message });
        }
    }),
};
