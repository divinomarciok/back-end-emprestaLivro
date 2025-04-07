import { Router } from "express";
import { livroController } from "../controller/livroController";

const livroRouter = Router();

livroRouter.post("/livros", livroController.cadastrar);
livroRouter.get("/livros", livroController.listarTodos);
livroRouter.get("/livros/disponiveis",livroController.listarLivrosDisponiveis);
livroRouter.post("/livros/atualiza",livroController.atualizaStatus);



export default livroRouter;
