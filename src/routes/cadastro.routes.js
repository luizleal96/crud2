import { Router } from "express";
import cadastroController from "../controller/cadastro.controller.js";

const cadastroRouter = Router();

cadastroRouter.post("/cadastro", cadastroController.createCadastroController);
cadastroRouter.get("/cadastro", cadastroController.findAllCadastroController);
cadastroRouter.get("/cadastro/:id", cadastroController.findCadastroByIdController);
cadastroRouter.put("/cadastro/:id", cadastroController.updateCadastroController);
cadastroRouter.delete("/cadastro/:id", cadastroController.deleteCadastroController);

export default cadastroRouter;
