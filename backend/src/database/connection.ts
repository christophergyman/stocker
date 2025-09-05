import sqlite3 from 'sqlite3';
import path from 'path';

const dbPath = path.join(__dirname, '../../stocker.db');
const db = new sqlite3.Database(dbPath);

// Enable foreign keys and create tables
db.serialize(() => {
  db.run('PRAGMA foreign_keys = ON');
  
  db.exec(`
    CREATE TABLE IF NOT EXISTS stocks (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      symbol TEXT UNIQUE NOT NULL,
      name TEXT NOT NULL,
      price REAL,
      change_percent REAL,
      volume INTEGER,
      market_cap REAL,
      last_updated DATETIME DEFAULT CURRENT_TIMESTAMP
    );

    CREATE TABLE IF NOT EXISTS stock_history (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      stock_id INTEGER,
      price REAL NOT NULL,
      volume INTEGER,
      timestamp DATETIME DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (stock_id) REFERENCES stocks (id)
    );

    CREATE INDEX IF NOT EXISTS idx_stocks_symbol ON stocks(symbol);
    CREATE INDEX IF NOT EXISTS idx_stock_history_stock_id ON stock_history(stock_id);
  `);
});

export default db;
