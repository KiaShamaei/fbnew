import { IPortfolioItem } from "components/PortfolioWatchTable/meta/type";
import { PORTFOLIO_DATA_MAP } from "./dataMap";

export function portflioParser(data: any[]): IPortfolioItem[] {
    return data.map(row => ({
        isin: row[PORTFOLIO_DATA_MAP.Isin],
        instrumentName: row[PORTFOLIO_DATA_MAP.InstrumentName],
        closingPrice: row[PORTFOLIO_DATA_MAP.ClosingPrice],
        closingPricePercent: row[PORTFOLIO_DATA_MAP.ClosingPricePercent],
        lastTradePrice: row[PORTFOLIO_DATA_MAP.LastTradePrice],
        lastTradePricePercent: row[PORTFOLIO_DATA_MAP.LastTradePricePercent],
        quantity: row[PORTFOLIO_DATA_MAP.Quantity],
        history: row[PORTFOLIO_DATA_MAP.History],
        instrumentStateCode: row[PORTFOLIO_DATA_MAP.InstrumentStateCode],
        instrumentStateTitle: row[PORTFOLIO_DATA_MAP.InstrumentStateTitle]
    }))
}