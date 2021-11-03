export interface IInstrumentTradeChangeSignal {
    instrumentIsin: string,
    lastTradePrice: number,
    referencePriceVariation: number,
    referencePriceVariationPercentage: number,
    lastTradeDate: string,
    lowestTradePrice: number,
    highestTradePrice: number,
    tradeNumber: number,
    tradeQuantity: number
}