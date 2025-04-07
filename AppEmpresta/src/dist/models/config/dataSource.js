"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppDataSource = void 0;
const typeorm_1 = require("typeorm");
const livro_1 = require("../livro");
const pessoa_1 = require("../pessoa");
const emprestimo_1 = require("../emprestimo");
exports.AppDataSource = new typeorm_1.DataSource({
    type: "postgres",
    host: "localhost",
    port: 5432,
    username: "postgres",
    password: "postgres",
    database: "emprestaLivro",
    synchronize: false, // cuidado: use false em produção!
    logging: true,
    entities: [livro_1.Livro, pessoa_1.Pessoa, emprestimo_1.Emprestimo],
    migrations: ["src/dist/migrations/*.js"],
    subscribers: [],
});
