import db from '../database/connection';

export interface Stock {
  id?: number;
  symbol: string;
  name: string;
  price?: number;
  change_percent?: number;
  volume?: number;
  market_cap?: number;
  last_updated?: string;
}

export class StockModel {
  // Get all stocks
  static getAll(): Promise<Stock[]> {
    return new Promise((resolve, reject) => {
      db.all('SELECT * FROM stocks ORDER BY symbol', (err, rows) => {
        if (err) reject(err);
        else resolve(rows as Stock[]);
      });
    });
  }

  // Get stock by symbol
  static getBySymbol(symbol: string): Promise<Stock | null> {
    return new Promise((resolve, reject) => {
      db.get('SELECT * FROM stocks WHERE symbol = ?', [symbol], (err, row) => {
        if (err) reject(err);
        else resolve(row as Stock || null);
      });
    });
  }

  // Add or update stock
  static upsert(stock: Stock): Promise<void> {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare(`
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
      
      stmt.run(
        [stock.symbol, stock.name, stock.price, stock.change_percent, stock.volume, stock.market_cap],
        (err) => {
          if (err) reject(err);
          else resolve();
        }
      );
    });
  }

  // Search stocks by symbol or name
  static search(query: string): Promise<Stock[]> {
    return new Promise((resolve, reject) => {
      const searchTerm = `%${query}%`;
      db.all(
        'SELECT * FROM stocks WHERE symbol LIKE ? OR name LIKE ? ORDER BY symbol',
        [searchTerm, searchTerm],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows as Stock[]);
        }
      );
    });
  }

  // Add price history
  static addPriceHistory(stockId: number, price: number, volume?: number): Promise<void> {
    return new Promise((resolve, reject) => {
      const stmt = db.prepare('INSERT INTO stock_history (stock_id, price, volume) VALUES (?, ?, ?)');
      stmt.run([stockId, price, volume], (err) => {
        if (err) reject(err);
        else resolve();
      });
    });
  }

  // Get price history for a stock
  static getPriceHistory(symbol: string, days: number = 30): Promise<any[]> {
    return new Promise((resolve, reject) => {
      db.all(
        `SELECT sh.price, sh.volume, sh.timestamp
         FROM stock_history sh
         JOIN stocks s ON sh.stock_id = s.id
         WHERE s.symbol = ? AND sh.timestamp >= datetime('now', '-${days} days')
         ORDER BY sh.timestamp DESC`,
        [symbol],
        (err, rows) => {
          if (err) reject(err);
          else resolve(rows);
        }
      );
    });
  }
}
