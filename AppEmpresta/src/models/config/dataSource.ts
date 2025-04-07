import { DataSource } from "typeorm";
import { Livro } from "../livro";
import { Pessoa } from "../pessoa";
import { Emprestimo } from "../emprestimo";

export const AppDataSource = new DataSource({
  type: "postgres",
  host: "localhost",
  port: 5432,
  username: "postgres",
  password: "postgres",
  database: "emprestaLivro",
  synchronize: false, // cuidado: use false em produção!
  logging: true,
  entities: [Livro, Pessoa, Emprestimo],
  migrations: ["src/dist/migrations/*.js"],
  subscribers: [],
});

