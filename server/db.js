const Database = require("better-sqlite3");
const path = require("path");

const dbPath = path.join(__dirname, "todo.db");
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS tasks (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    title TEXT NOT NULL,
    completed INTEGER NOT NULL DEFAULT 0
  )
`);

module.exports = db;