import express from "express";
import cadastroRouter from "./src/routes/cadastro.routes.js";

const app = express();

app.use(express.json());
app.use("/api", cadastroRouter);

app.listen(3000, () => {
    console.log("Servidor rodando na porta 3000...");
});
