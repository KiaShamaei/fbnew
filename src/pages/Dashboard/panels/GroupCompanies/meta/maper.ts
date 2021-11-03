import {DATA_MAP} from "./constants"
import { IportfolioTable } from "./type";


export function dataTablePortfolio(data: any[]):IportfolioTable [] {
  return data.map(row => ({
    Isin: row[DATA_MAP.Isin],
    InstrumentName:  row[DATA_MAP.InstrumentName],
    InstrumentTitle:  row[DATA_MAP.InstrumentTitle],
    InstrumentCode:  row[DATA_MAP.InstrumentCode],
    InstrumentStateCode:  row[DATA_MAP.InstrumentStateCode],
    InstrumentStateTitle:  row[DATA_MAP.InstrumentStateTitle],
    MinimumOrderQuantity:  row[DATA_MAP.MinimumOrderQuantity],
    MaximumOrderQuantity: row[DATA_MAP.MaximumOrderQuantity],
    UpperPriceThreshold:  row[DATA_MAP.UpperPriceThreshold],
    LowerPriceThreshold:  row[DATA_MAP.LowerPriceThreshold],
    ClosingPrice:  row[DATA_MAP.ClosingPrice],
    ClosingPriceVariation:  row[DATA_MAP.ClosingPriceVariation],
    ClosingPricePercent:  row[DATA_MAP.ClosingPricePercent],
    LastPrice:  row[DATA_MAP.LastPrice],
    LastPriceVariation:  row[DATA_MAP.LastPriceVariation],
    LastPricePercent:  row[DATA_MAP.LastPricePercent],
    YesterdayPrice:  row[DATA_MAP.YesterdayPrice],
    YearHighestTradePrice:  row[DATA_MAP.YearHighestTradePrice],
    YearLowestTradePrice:  row[DATA_MAP.YearLowestTradePrice],
    UpperTradePrice:  row[DATA_MAP.UpperTradePrice],
    LowestTradePrice:  row[DATA_MAP.LowestTradePrice],
    TheoryOpeningPrice:  row[DATA_MAP.TheoryOpeningPrice],
    LastTradeDate:  row[DATA_MAP.LastTradeDate],
    AskPrice:  row[DATA_MAP.AskPrice],
    AskNumber:  row[DATA_MAP.AskNumber],
    AskQuantity:  row[DATA_MAP.AskQuantity],
    BidPrice:  row[DATA_MAP.BidPrice],
    BidNumber:  row[DATA_MAP.BidNumber],
    BidQuantity:  row[DATA_MAP.BidQuantity],
    BuyFirmCount:  row[DATA_MAP.BuyFirmCount],
    BuyFirmVolume:  row[DATA_MAP.BuyFirmVolume],
    BuyFirmVolumePercentage:  row[DATA_MAP.BuyFirmVolumePercentage],
    BuyIndividualCount:  row[DATA_MAP.BuyIndividualCount],
    BuyIndividualVolume:  row[DATA_MAP.BuyIndividualVolume],
    BuyIndividualVolumePercentage:  row[DATA_MAP.BuyIndividualVolumePercentage],
    SelFirmCount:  row[DATA_MAP.SelFirmCount],
    SelFirmVolume:  row[DATA_MAP.SelFirmVolume],
    SelFirmVolumePercentage:  row[DATA_MAP.SelFirmVolumePercentage],
    SelIndividualCount:  row[DATA_MAP.SelIndividualCount],
    SelIndividualVolume:  row[DATA_MAP.SelIndividualVolume],
    SelIndividualVolumePercentage:  row[DATA_MAP.SelIndividualVolumePercentage],
    BuyDensity:  row[DATA_MAP.BuyDensity],
    SellDensity:  row[DATA_MAP.SellDensity],
    InputMony:  row[DATA_MAP.InputMony],
    TotalNumberOfSharesTraded:  row[DATA_MAP.TotalNumberOfSharesTraded],
    TotalNumberOfTrades:  row[DATA_MAP.TotalNumberOfTrades],
    TotalTradeValue:  row[DATA_MAP.TotalTradeValue],
    BaseVolume:  row[DATA_MAP.BaseVolume],
    ExchangeName:  row[DATA_MAP.ExchangeName],
    ExchangeCode:  row[DATA_MAP.ExchangeCode],
    InstrumentTypeCode:  row[DATA_MAP.InstrumentTypeCode],
    InstrumentTypeTitle:  row[DATA_MAP.InstrumentTypeTitle]
  }));
}




