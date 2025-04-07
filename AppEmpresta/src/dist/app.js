"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const livroRoutes_1 = __importDefault(require("./routes/livroRoutes"));
const dataSource_1 = require("./models/config/dataSource");
const pessoaRoutes_1 = __importDefault(require("./routes/pessoaRoutes"));
const emprestimoRoutes_1 = __importDefault(require("./routes/emprestimoRoutes"));
const app = (0, express_1.default)();
app.use(express_1.default.json());
dataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log("📦 Conectado ao banco com sucesso!");
})
    .catch((err) => {
    console.error(" Erro ao conectar:", err);
});
app.use("/api", livroRoutes_1.default);
app.use("/api", pessoaRoutes_1.default);
app.use("/api", emprestimoRoutes_1.default);
// Exemplo: POST /api/livros
app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000");
});
