"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const Stock_1 = require("../models/Stock");
const router = express_1.default.Router();
// Get all stocks
router.get('/', async (req, res) => {
    try {
        const stocks = await Stock_1.StockModel.getAll();
        res.json({ success: true, data: stocks });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch stocks' });
    }
});
// Get stock by symbol
router.get('/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;
        const stock = await Stock_1.StockModel.getBySymbol(symbol.toUpperCase());
        if (!stock) {
            return res.status(404).json({ success: false, error: 'Stock not found' });
        }
        res.json({ success: true, data: stock });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch stock' });
    }
});
// Search stocks
router.get('/search/:query', async (req, res) => {
    try {
        const { query } = req.params;
        const stocks = await Stock_1.StockModel.search(query);
        res.json({ success: true, data: stocks });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Search failed' });
    }
});
// Add/update stock (with mock data)
router.post('/:symbol', async (req, res) => {
    try {
        const { symbol } = req.params;
        // Mock stock data for demo
        const mockStock = {
            symbol: symbol.toUpperCase(),
            name: `${symbol.toUpperCase()} Inc.`,
            price: Math.random() * 1000 + 50,
            change_percent: (Math.random() - 0.5) * 10,
            volume: Math.floor(Math.random() * 1000000),
            market_cap: Math.random() * 1000000000
        };
        await Stock_1.StockModel.upsert(mockStock);
        // Add to price history
        const dbStock = await Stock_1.StockModel.getBySymbol(symbol.toUpperCase());
        if (dbStock?.id && mockStock.price) {
            await Stock_1.StockModel.addPriceHistory(dbStock.id, mockStock.price, mockStock.volume);
        }
        res.json({ success: true, data: mockStock });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch stock data' });
    }
});
// Get price history
router.get('/:symbol/history', async (req, res) => {
    try {
        const { symbol } = req.params;
        const { days = '30' } = req.query;
        const history = await Stock_1.StockModel.getPriceHistory(symbol, parseInt(days));
        res.json({ success: true, data: history });
    }
    catch (error) {
        res.status(500).json({ success: false, error: 'Failed to fetch price history' });
    }
});
exports.default = router;
//# sourceMappingURL=stocks.js.map