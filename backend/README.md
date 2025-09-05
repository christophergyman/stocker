# Stocker Backend API

A lightweight Express.js + TypeScript + SQLite backend for the Stocker stock tracking application.

## �� Quick Start

1. **Install dependencies:**
   ```bash
   cd backend
   npm install
   ```

2. **Initialize the database:**
   ```bash
   npm run build
   npm run db:init
   ```

3. **Start development server:**
   ```bash
   npm run dev
   ```

4. **Build for production:**
   ```bash
   npm run build
   npm start
   ```

## �� API Endpoints

- `GET /health` - Health check
- `GET /api/stocks` - Get all stocks
- `GET /api/stocks/:symbol` - Get specific stock
- `GET /api/stocks/search/:query` - Search stocks
- `POST /api/stocks/:symbol` - Add/update stock
- `GET /api/stocks/:symbol/history?days=30` - Get price history

## ��️ Database

- **SQLite** database file: `stocker.db`
- **Tables**: `stocks`, `stock_history`
- **Features**: Full-text search, price history tracking

## 🔧 Configuration

Copy `.env.example` to `.env` and configure:
- `PORT` - Server port (default: 3001)
- `ALPHA_VANTAGE_API_KEY` - For real stock data (optional)

## 📦 Scripts

- `npm run dev` - Start development server with hot reload
- `npm run build` - Build TypeScript to JavaScript
- `npm start` - Start production server
- `npm run db:init` - Initialize database with sample data
