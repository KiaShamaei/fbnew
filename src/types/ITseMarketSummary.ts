export interface ITseMarketSummary {
    isin: string;
    instrumentId: number;
    marketValue: number;
    totalNumberOfSharesTraded: number;
    totalNumberOfTrades: number;
    totalTradeValue: number;
    lastIndexLevel: number;
    lastIndexLevelVariation: number;
    lastIndexLevelVariationPercentage: number;   
}