import { Router } from "express";
import { pessoaController } from "../controller/pessoaController";

const pessoaRouter = Router();

pessoaRouter.post("/pessoas", pessoaController.criar);
pessoaRouter.get("/pessoas", pessoaController.listarTodos);
pessoaRouter.put("/pessoas/:id", pessoaController.atualizar);
pessoaRouter.delete("/pessoas/:id", pessoaController.remover);

export default pessoaRouter;
