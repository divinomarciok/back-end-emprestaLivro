import { Router } from "express";
import { pessoaController } from "../controller/pessoaController";

const pessoaRouter = Router();

pessoaRouter.post("/pessoas", pessoaController.criar);

export default pessoaRouter;
