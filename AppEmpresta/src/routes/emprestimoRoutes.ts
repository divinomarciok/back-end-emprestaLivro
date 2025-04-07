import { Router } from "express";
import { emprestimoController } from "../controller/emprestimoController";

const router = Router();

router.post("/emprestimo", emprestimoController.criar);
router.put("/emprestimos/:id/devolucao", emprestimoController.registrarDevolucao);
//router.get("/emprestimos/:id", emprestimoController.buscarPorId); 

export default router;