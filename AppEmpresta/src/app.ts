import express from "express";
import livroRouter from "./routes/livroRoutes";
import { AppDataSource } from "./models/config/dataSource";
import pessoaRouter from "./routes/pessoaRoutes";
import emprestimoRoutes from "./routes/emprestimoRoutes";

const app = express();
app.use(express.json());

AppDataSource.initialize()
  .then(() => {
    console.log("📦 Conectado ao banco com sucesso!");
  })
  .catch((err) => {
    console.error(" Erro ao conectar:", err);
  });


app.use("/api", livroRouter);
app.use("/api", pessoaRouter);
app.use("/api", emprestimoRoutes);


app.listen(3000, () => {
  console.log("Servidor rodando na porta 3000");
});
