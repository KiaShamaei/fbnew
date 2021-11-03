export type ActiveFormType = 'BUY' | 'SELL'

export interface IBuyAndSellHeaderProps {
    name: any;
    lastPrice?: number;
    lastPricePercent?: number;
    lastPriceVariation?: number;
}

export interface SymbolBuyAndSellRefProps {
    update: (...args: any[]) => void;
    values?: any;
}