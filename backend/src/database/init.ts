import { StockModel } from '../models/Stock';

// Initialize with some sample stocks
const sampleStocks = [
  { symbol: 'AAPL', name: 'Apple Inc.', price: 175.43, change_percent: 2.34, volume: 45000000, market_cap: 2800000000000 },
  { symbol: 'GOOGL', name: 'Alphabet Inc.', price: 142.56, change_percent: -1.23, volume: 25000000, market_cap: 1800000000000 },
  { symbol: 'MSFT', name: 'Microsoft Corporation', price: 378.85, change_percent: 0.87, volume: 30000000, market_cap: 2800000000000 },
  { symbol: 'TSLA', name: 'Tesla Inc.', price: 248.50, change_percent: 5.67, volume: 60000000, market_cap: 800000000000 },
  { symbol: 'AMZN', name: 'Amazon.com Inc.', price: 155.20, change_percent: -0.45, volume: 35000000, market_cap: 1600000000000 }
];

async function initializeDatabase() {
  console.log('🗄️ Initializing database with sample stocks...');

  try {
    for (const stock of sampleStocks) {
      await StockModel.upsert(stock);
      console.log(`✅ Added ${stock.symbol}: ${stock.name}`);
    }
    console.log('🎉 Database initialization complete!');
  } catch (error) {
    console.error('❌ Database initialization failed:', error);
  }
}

initializeDatabase();
