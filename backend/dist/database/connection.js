"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const sqlite3_1 = __importDefault(require("sqlite3"));
const path_1 = __importDefault(require("path"));
const dbPath = path_1.default.join(__dirname, '../../stocker.db');
const db = new sqlite3_1.default.Database(dbPath);
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
exports.default = db;
//# sourceMappingURL=connection.js.map