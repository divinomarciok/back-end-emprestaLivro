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
exports.emprestimoController = void 0;
const emprestimoService_1 = require("../models/service/emprestimoService");
exports.emprestimoController = {
    criar: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const emprestimo = yield (0, emprestimoService_1.criarEmprestimo)(req.body);
            res.status(201).json(emprestimo);
        }
        catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }),
    registrarDevolucao: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const id = parseInt(req.params.id);
            const data = Object.assign({ id }, req.body);
            const emprestimo = yield (0, emprestimoService_1.registrarDevolucao)(data);
            res.status(200).json(emprestimo);
        }
        catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }),
    listarTodos: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const emprestimos = yield (0, emprestimoService_1.listarTodosEmprestimos)();
            res.status(200).json(emprestimos);
        }
        catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }),
    listarAtivos: (req, res) => __awaiter(void 0, void 0, void 0, function* () {
        try {
            const emprestimosAtivos = yield (0, emprestimoService_1.listarEmprestimosAtivos)();
            res.status(200).json(emprestimosAtivos);
        }
        catch (error) {
            res.status(400).json({ erro: error.message });
        }
    }),
    /// buscarPorId: async (req: Request, res: Response) => {
    ///   try {
    ///     const id = parseInt(req.params.id);
    ///     const emprestimo = await buscarEmprestimoPorId(id);
    ///     
    ///     if (!emprestimo) {
    ///       return res.status(404).json({ erro: "Empréstimo não encontrado" });
    ///     }
    ///     
    ///     res.status(200).json(emprestimo);
    ///   } catch (error: any) {
    ///     res.status(400).json({ erro: error.message });
    ///   }
    /// }
};
