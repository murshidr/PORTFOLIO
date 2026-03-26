import Database from 'better-sqlite3';
import { join } from 'path';

const dbPath = join(process.cwd(), 'database.db');
const db = new Database(dbPath);

db.exec(`
  CREATE TABLE IF NOT EXISTS testers (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    email TEXT UNIQUE NOT NULL,
    created_at DATETIME DEFAULT CURRENT_TIMESTAMP
  );

  CREATE TABLE IF NOT EXISTS stats (
    id INTEGER PRIMARY KEY AUTOINCREMENT,
    key TEXT UNIQUE NOT NULL,
    value INTEGER DEFAULT 0
  );

  INSERT OR IGNORE INTO stats (key, value) VALUES ('visitor_count', 0);
`);

console.log('Database initialized at:', dbPath);

export default db;
