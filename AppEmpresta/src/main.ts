import "reflect-metadata";
import { AppDataSource } from "./models/config/dataSource";

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conectado ao banco com sucesso!");
    // Aqui você inicia o Express ou lógica principal
  })
  .catch((err) => {
    console.error(" Erro ao conectar:", err);
  });
