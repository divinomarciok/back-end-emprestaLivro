"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("reflect-metadata");
const dataSource_1 = require("./models/config/dataSource");
dataSource_1.AppDataSource.initialize()
    .then(() => {
    console.log("📦 Conectado ao banco com sucesso!");
    // Aqui você inicia o Express ou lógica principal
})
    .catch((err) => {
    console.error(" Erro ao conectar:", err);
});
