"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const livroController_1 = require("../controller/livroController");
const livroRouter = (0, express_1.Router)();
livroRouter.post("/livros", livroController_1.livroController.cadastrar);
livroRouter.get("/livros", livroController_1.livroController.listarTodos);
livroRouter.get("/livros/disponiveis", livroController_1.livroController.listarDisponiveis);
exports.default = livroRouter;
