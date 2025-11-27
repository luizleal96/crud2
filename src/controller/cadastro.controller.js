import cadastroService from "../services/cadastro.services.js";

const validateId = (id) => {
    const num = Number(id);
    return Number.isInteger(num) && num > 0;
};

async function createCadastroController(req, res) {
    const { login, senha, email, foto } = req.body || {};
    if (!login || !senha) {
        return res.status(400).json({ error: "login e senha são obrigatórios" });
    }

    try {
        const cadastro = await cadastroService.createCadastroService({ login, senha, email, foto });
        return res.status(201).json(cadastro);
    } catch (error) {
        return res.status(500).json({ error: error?.message ?? "Erro ao criar cadastro" });
    }
}

async function findAllCadastroController(req, res) {
    try {
        const cadastros = await cadastroService.findAllCadastroService();
        return res.status(200).json(cadastros);
    } catch (error) {
        return res.status(500).json({ error: error?.message ?? "Erro ao listar cadastros" });
    }
}

async function findCadastroByIdController(req, res) {
    const { id } = req.params;
    if (!validateId(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const cadastro = await cadastroService.findCadastroByIdService(id);
        if (!cadastro) return res.status(404).json({ error: "Cadastro não encontrado" });
        return res.status(200).json(cadastro);
    } catch (error) {
        return res.status(500).json({ error: error?.message ?? "Erro ao buscar cadastro" });
    }
}

async function updateCadastroController(req, res) {
    const { id } = req.params;
    const cadastroData = req.body || {};

    if (!validateId(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }
    if (Object.keys(cadastroData).length === 0) {
        return res.status(400).json({ error: "Nenhum dado para atualizar" });
    }

    try {
        const updated = await cadastroService.updateCadastroService(id, cadastroData);
        if (!updated) return res.status(404).json({ error: "Cadastro não encontrado" });
        return res.status(200).json(updated);
    } catch (error) {
        return res.status(500).json({ error: error?.message ?? "Erro ao atualizar cadastro" });
    }
}

async function deleteCadastroController(req, res) {
    const { id } = req.params;
    if (!validateId(id)) {
        return res.status(400).json({ error: "ID inválido" });
    }

    try {
        const removed = await cadastroService.deleteCadastroService(id);
        if (!removed) return res.status(404).json({ error: "Cadastro não encontrado" });
        return res.status(204).send();
    } catch (error) {
        return res.status(500).json({ error: error?.message ?? "Erro ao remover cadastro" });
    }
}

export default {
    createCadastroController,
    findAllCadastroController,
    findCadastroByIdController,
    updateCadastroController,
    deleteCadastroController
};
