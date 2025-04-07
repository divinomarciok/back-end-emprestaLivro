"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
// routes/emprestimoRoutes.ts
const express_1 = require("express");
const emprestimoController_1 = require("../controller/emprestimoController");
const router = (0, express_1.Router)();
router.post("/emprestimo", emprestimoController_1.emprestimoController.criar);
router.put("/emprestimos/:id/devolucao", emprestimoController_1.emprestimoController.registrarDevolucao);
exports.default = router;
