import express from 'express';
import { StockModel, Stock } from '../models/Stock';
import axios from 'axios';

const router = express.Router();

// Get all stocks
router.get('/', async (req, res) => {
  try {
    const stocks = await StockModel.getAll();
    res.json({ success: true, data: stocks });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch stocks' });
  }
});

// Get stock by symbol
router.get('/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    const stock = await StockModel.getBySymbol(symbol.toUpperCase());
    
    if (!stock) {
      return res.status(404).json({ success: false, error: 'Stock not found' });
    }
    
    res.json({ success: true, data: stock });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch stock' });
  }
});

// Search stocks
router.get('/search/:query', async (req, res) => {
  try {
    const { query } = req.params;
    const stocks = await StockModel.search(query);
    res.json({ success: true, data: stocks });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Search failed' });
  }
});

// Add/update stock (with mock data)
router.post('/:symbol', async (req, res) => {
  try {
    const { symbol } = req.params;
    
    // Mock stock data for demo
    const mockStock: Stock = {
      symbol: symbol.toUpperCase(),
      name: `${symbol.toUpperCase()} Inc.`,
      price: Math.random() * 1000 + 50,
      change_percent: (Math.random() - 0.5) * 10,
      volume: Math.floor(Math.random() * 1000000),
      market_cap: Math.random() * 1000000000
    };
    
    await StockModel.upsert(mockStock);
    
    // Add to price history
    const dbStock = await StockModel.getBySymbol(symbol.toUpperCase());
    if (dbStock?.id && mockStock.price) {
      await StockModel.addPriceHistory(dbStock.id, mockStock.price, mockStock.volume);
    }
    
    res.json({ success: true, data: mockStock });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch stock data' });
  }
});

// Get price history
router.get('/:symbol/history', async (req, res) => {
  try {
    const { symbol } = req.params;
    const { days = '30' } = req.query;
    
    const history = await StockModel.getPriceHistory(symbol, parseInt(days as string));
    res.json({ success: true, data: history });
  } catch (error) {
    res.status(500).json({ success: false, error: 'Failed to fetch price history' });
  }
});

export default router;
