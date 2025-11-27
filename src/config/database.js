import sqlite3 from "sqlite3";
import { dirname, join } from "path";
import { fileURLToPath } from "url";

const __dirname = dirname(fileURLToPath(import.meta.url));
const dbPath = join(__dirname, "..", "..", "database.sqlite");

sqlite3.verbose();

const db = new sqlite3.Database(dbPath, sqlite3.OPEN_READWRITE | sqlite3.OPEN_CREATE, (error) => {
    if (error) {
        console.error("Erro ao conectar ao banco de dados:", error.message);
    } else {
        console.log("Conectado ao banco de dados com sucesso.");
    }
});

// inicializa tabela de forma serializada
db.serialize(() => {
    db.run(`
        CREATE TABLE IF NOT EXISTS cadastro (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            login TEXT NOT NULL,
            email TEXT,
            senha TEXT,
            foto TEXT
        )
    `, (err) => {
        if (err) console.error("Erro ao criar tabela:", err.message);
    });
});

// wrappers Promise para run/get/all
const run = (sql, params = []) => new Promise((resolve, reject) => {
    db.run(sql, params, function (err) {
        if (err) return reject(err);
        // this.lastID / this.changes disponíveis aqui
        resolve({ lastID: this.lastID, changes: this.changes });
    });
});
const get = (sql, params = []) => new Promise((resolve, reject) => {
    db.get(sql, params, (err, row) => {
        if (err) return reject(err);
        resolve(row);
    });
});
const all = (sql, params = []) => new Promise((resolve, reject) => {
    db.all(sql, params, (err, rows) => {
        if (err) return reject(err);
        resolve(rows);
    });
});

export default db;
export { run, get, all };
