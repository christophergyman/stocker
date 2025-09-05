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
export declare class StockModel {
    static getAll(): Promise<Stock[]>;
    static getBySymbol(symbol: string): Promise<Stock | null>;
    static upsert(stock: Stock): Promise<void>;
    static search(query: string): Promise<Stock[]>;
    static addPriceHistory(stockId: number, price: number, volume?: number): Promise<void>;
    static getPriceHistory(symbol: string, days?: number): Promise<any[]>;
}
//# sourceMappingURL=Stock.d.ts.map