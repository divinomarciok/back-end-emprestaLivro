"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const pessoaController_1 = require("../controller/pessoaController");
const pessoaRouter = (0, express_1.Router)();
pessoaRouter.post("/pessoas", pessoaController_1.pessoaController.criar);
exports.default = pessoaRouter;
