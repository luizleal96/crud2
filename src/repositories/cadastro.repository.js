import { run, get, all } from "../config/database.js";

/**
 * Cria um novo cadastro
 * @param {Object} cadastroData - { login, email, senha, foto }
 * @returns {Promise<Object>} Cadastro criado (sem senha)
 */
export async function createCadastroRepository(cadastroData) {
    const { login, email = null, senha, foto = null } = cadastroData;

    const result = await run(
        `INSERT INTO cadastro (login, email, senha, foto) VALUES (?, ?, ?, ?)`,
        [login, email, senha, foto]
    );

    // retorna o registro criado sem a senha
    return await get(
        `SELECT id, login, email, foto FROM cadastro WHERE id = ?`,
        [result.lastID]
    );
}

/**
 * Retorna todos os cadastros (sem senha)
 * @returns {Promise<Array>}
 */
export async function findAllCadastroRepository() {
    return await all(`SELECT id, login, email, foto FROM cadastro`);
}

/**
 * Retorna cadastro por ID (sem senha)
 * @param {number} id
 * @returns {Promise<Object|null>}
 */
export async function findCadastroByIdRepository(id) {
    return await get(
        `SELECT id, login, email, foto FROM cadastro WHERE id = ?`,
        [id]
    );
}

/**
 * Atualiza cadastro por ID
 * @param {number} id
 * @param {Object} cadastroData - { login, email, senha, foto } (campos opcionais)
 * @returns {Promise<Object|null>} Registro atualizado (sem senha) ou null se não encontrado
 */
export async function updateCadastroRepository(id, cadastroData) {
    // busca existente (inclui senha caso precise manter)
    const existing = await get(`SELECT * FROM cadastro WHERE id = ?`, [id]);
    if (!existing) return null;

    const login = cadastroData.login ?? existing.login;
    const email = cadastroData.email ?? existing.email;
    const senha = cadastroData.senha ?? existing.senha;
    const foto = cadastroData.foto ?? existing.foto;

    const result = await run(
        `UPDATE cadastro SET login = ?, email = ?, senha = ?, foto = ? WHERE id = ?`,
        [login, email, senha, foto, id]
    );

    if (result.changes === 0) return null;

    return await get(`SELECT id, login, email, foto FROM cadastro WHERE id = ?`, [id]);
}

/**
 * Remove cadastro por ID
 * @param {number} id
 * @returns {Promise<boolean>} true se removido, false se não encontrado
 */
export async function deleteCadastroRepository(id) {
    const result = await run(`DELETE FROM cadastro WHERE id = ?`, [id]);
    return result.changes > 0;
}

export default {
    createCadastroRepository,
    findAllCadastroRepository,
    findCadastroByIdRepository,
    updateCadastroRepository,
    deleteCadastroRepository
};
