import cadastroRepository from "../repositories/cadastro.repository.js";

async function createCadastroService(cadastroData) {
    const cadastro = await cadastroRepository.createCadastroRepository(cadastroData);
    if (!cadastro) throw new Error("Erro ao criar novo cadastro!");
    return cadastro;
}

async function findAllCadastroService() {
    return await cadastroRepository.findAllCadastroRepository();
}

async function findCadastroByIdService(id) {
    // retorna objeto ou null (não lança exceção) — controlador decide o status HTTP
    return await cadastroRepository.findCadastroByIdRepository(id);
}

async function updateCadastroService(id, cadastroData) {
    // repository já retorna null se não existir
    const cadastroAtualizado = await cadastroRepository.updateCadastroRepository(id, cadastroData);
    return cadastroAtualizado;
}

async function deleteCadastroService(id) {
    // retorna true se removido, false se não encontrado
    const removed = await cadastroRepository.deleteCadastroRepository(id);
    return removed;
}

export default {
    createCadastroService,
    findAllCadastroService,
    findCadastroByIdService,
    updateCadastroService,
    deleteCadastroService
};
