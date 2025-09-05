"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StockModel = void 0;
const connection_1 = __importDefault(require("../database/connection"));
class StockModel {
    // Get all stocks
    static getAll() {
        return new Promise((resolve, reject) => {
            connection_1.default.all('SELECT * FROM stocks ORDER BY symbol', (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
    // Get stock by symbol
    static getBySymbol(symbol) {
        return new Promise((resolve, reject) => {
            connection_1.default.get('SELECT * FROM stocks WHERE symbol = ?', [symbol], (err, row) => {
                if (err)
                    reject(err);
                else
                    resolve(row || null);
            });
        });
    }
    // Add or update stock
    static upsert(stock) {
        return new Promise((resolve, reject) => {
            const stmt = connection_1.default.prepare(`
        INSERT INTO stocks (symbol, name, price, change_percent, volume, market_cap)
        VALUES (?, ?, ?, ?, ?, ?)
        ON CONFLICT(symbol) DO UPDATE SET
          name = excluded.name,
          price = excluded.price,
          change_percent = excluded.change_percent,
          volume = excluded.volume,
          market_cap = excluded.market_cap,
          last_updated = CURRENT_TIMESTAMP
      `);
            stmt.run([stock.symbol, stock.name, stock.price, stock.change_percent, stock.volume, stock.market_cap], (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    // Search stocks by symbol or name
    static search(query) {
        return new Promise((resolve, reject) => {
            const searchTerm = `%${query}%`;
            connection_1.default.all('SELECT * FROM stocks WHERE symbol LIKE ? OR name LIKE ? ORDER BY symbol', [searchTerm, searchTerm], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
    // Add price history
    static addPriceHistory(stockId, price, volume) {
        return new Promise((resolve, reject) => {
            const stmt = connection_1.default.prepare('INSERT INTO stock_history (stock_id, price, volume) VALUES (?, ?, ?)');
            stmt.run([stockId, price, volume], (err) => {
                if (err)
                    reject(err);
                else
                    resolve();
            });
        });
    }
    // Get price history for a stock
    static getPriceHistory(symbol, days = 30) {
        return new Promise((resolve, reject) => {
            connection_1.default.all(`SELECT sh.price, sh.volume, sh.timestamp
         FROM stock_history sh
         JOIN stocks s ON sh.stock_id = s.id
         WHERE s.symbol = ? AND sh.timestamp >= datetime('now', '-${days} days')
         ORDER BY sh.timestamp DESC`, [symbol], (err, rows) => {
                if (err)
                    reject(err);
                else
                    resolve(rows);
            });
        });
    }
}
exports.StockModel = StockModel;
//# sourceMappingURL=Stock.js.map