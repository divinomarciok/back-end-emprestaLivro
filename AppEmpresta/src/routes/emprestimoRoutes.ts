// routes/emprestimoRoutes.ts
import { Router } from "express";
import { emprestimoController } from "../controller/emprestimoController";

const router = Router();

router.post("/emprestimo", emprestimoController.criar);
router.put("/emprestimos/:id/devolucao", emprestimoController.registrarDevolucao);

export default router;