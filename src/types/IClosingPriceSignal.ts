export interface IClosingPriceSignal {
    isin: string;
    closingPrice: number;
    closingPriceVariation: number;
    closingPriceVariationPercentage: number;
    totalNumberOfTrades: number;
    totalNumberOfSharesTraded: number;
    totalTradeValue: number;
}
