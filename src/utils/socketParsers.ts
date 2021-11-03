import { IInstrumentTradeChangeSignal } from "types/IInstrumentTradeChangeSignal"
import { IOmsAccountStateChangeSignal } from "types/IOmsAccountStateChangeSignal"
import { IBidAsk } from 'types/IBidAsk'
import { IClosingPriceSignal } from "types/IClosingPriceSignal"
import { ITseMarketSummary } from "types/ITseMarketSummary"
import { IOmsTradeSignal } from "types/IOmsTradeSignal"
import { IContentSignal } from "types/IContentSignal"
import { IOmsIpoOrderChangeSignal } from "types/IOmsIpoOrderChangeSignal"
import { IOmsResultSignal } from "types/IOmsResultSignal"
import { ITseTheoreticalOpeningPrice } from "types/ITseTheoreticalOpeningPrice"
import { IMarketTimeCalender } from "types/IMarketTimeCalender"
import { IIndexs } from "types/IIndexs"

export const OMS_ACCOUNT_STATE_CHANGE_SIGNAL_DATA_MAP = {
    TotalAsset: 0,
    BuyingPower: 1,
    BlokedValue: 2,
    InvestorBourseCodeId: 3,
    InvestorBourseCodeIsin: 4,
    CreditBlockedMoney: 5,
    CreditMoneyRemain: 6,
    CreditMoney: 7,
    NonWithdrawableBlockedMoney: 8,
    NonWithdrawableMoneyRemain: 9,
    WithdrawableBlockedMoney: 10,
    WithdrawableMoneyRemain: 11
}

export function omsAccountStateChangeSignalParser(data: any[]): IOmsAccountStateChangeSignal {
    return {
        totalAsset: data[OMS_ACCOUNT_STATE_CHANGE_SIGNAL_DATA_MAP.TotalAsset],
        buyingPower: data[OMS_ACCOUNT_STATE_CHANGE_SIGNAL_DATA_MAP.BuyingPower],
        blokedValue: data[OMS_ACCOUNT_STATE_CHANGE_SIGNAL_DATA_MAP.BlokedValue],
        investorBourseCodeId: data[OMS_ACCOUNT_STATE_CHANGE_SIGNAL_DATA_MAP.InvestorBourseCodeId],
        investorBourseCodeIsin: data[OMS_ACCOUNT_STATE_CHANGE_SIGNAL_DATA_MAP.InvestorBourseCodeIsin],
        creditBlockedMoney: data[OMS_ACCOUNT_STATE_CHANGE_SIGNAL_DATA_MAP.CreditBlockedMoney],
        creditMoneyRemain: data[OMS_ACCOUNT_STATE_CHANGE_SIGNAL_DATA_MAP.CreditMoneyRemain],
        creditMoney: data[OMS_ACCOUNT_STATE_CHANGE_SIGNAL_DATA_MAP.CreditMoney],
        nonWithdrawableBlockedMoney: data[OMS_ACCOUNT_STATE_CHANGE_SIGNAL_DATA_MAP.NonWithdrawableBlockedMoney],
        nonWithdrawableMoneyRemain: data[OMS_ACCOUNT_STATE_CHANGE_SIGNAL_DATA_MAP.NonWithdrawableMoneyRemain],
        withdrawableBlockedMoney: data[OMS_ACCOUNT_STATE_CHANGE_SIGNAL_DATA_MAP.WithdrawableBlockedMoney],
        withdrawableMoneyRemain: data[OMS_ACCOUNT_STATE_CHANGE_SIGNAL_DATA_MAP.WithdrawableMoneyRemain]
    }
}

const INSTRUMENT_TRADE_CHANGE_SIGNAL_DATA_MAP = {
    InstrumentIsin: 0,
    LastTradePrice: 1,
    ReferencePriceVariation: 2,
    ReferencePriceVariationPercentage: 3,
    LastTradeDate: 4,
    LowestTradePrice: 5,
    HighestTradePrice: 6,
    TradeNumber: 7,
    TradeQuantity: 8
}

export function instrumentTradeChangeSignalParser(data: any[]): IInstrumentTradeChangeSignal {
    return {
        instrumentIsin: data[INSTRUMENT_TRADE_CHANGE_SIGNAL_DATA_MAP.InstrumentIsin],
        lastTradePrice: data[INSTRUMENT_TRADE_CHANGE_SIGNAL_DATA_MAP.LastTradePrice],
        referencePriceVariation: data[INSTRUMENT_TRADE_CHANGE_SIGNAL_DATA_MAP.ReferencePriceVariation],
        referencePriceVariationPercentage: data[INSTRUMENT_TRADE_CHANGE_SIGNAL_DATA_MAP.ReferencePriceVariationPercentage],
        lastTradeDate: data[INSTRUMENT_TRADE_CHANGE_SIGNAL_DATA_MAP.LastTradeDate],
        lowestTradePrice: data[INSTRUMENT_TRADE_CHANGE_SIGNAL_DATA_MAP.LowestTradePrice],
        highestTradePrice: data[INSTRUMENT_TRADE_CHANGE_SIGNAL_DATA_MAP.HighestTradePrice],
        tradeNumber: data[INSTRUMENT_TRADE_CHANGE_SIGNAL_DATA_MAP.TradeNumber],
        tradeQuantity: data[INSTRUMENT_TRADE_CHANGE_SIGNAL_DATA_MAP.TradeQuantity],
    }
}

export function bidAskParser(data: any[]): {
    isin: string,
    bidAsk: IBidAsk
} {
    return {
        isin: data[0],
        bidAsk: {
            rowPlace: data[1],
            bidPrice: data[2],
            bidNumber: data[3],
            bidQuantity: data[4],
            askPrice: data[5],
            askNumber: data[6],
            askQuantity: data[7],
        }
    }
}

const INDI_FIRM_CHANGE_SIGNAL_DATA_MAP = {
    Isin: 0,
    BuyIndividualVolume: 1,
    BuyIndividualVolumePercentage: 2,
    BuyIndividualCount: 3,
    BuyFirmVolume: 4,
    BuyFirmVolumePercentage: 5,
    BuyFirmCount: 6,
    SelIndividualVolume: 7,
    SelIndividualVolumePercentage: 8,
    SelIndividualCount: 9,
    SelFirmVolume: 10,
    SelFirmVolumePercentage: 11,
    SelFirmCount: 12,
}


export function indiFirmChangeSignalParser(data: any) {
    return {
        isin: data[INDI_FIRM_CHANGE_SIGNAL_DATA_MAP.Isin],
        buyIndividualVolume: data[INDI_FIRM_CHANGE_SIGNAL_DATA_MAP.BuyIndividualVolume],
        buyIndividualVolumePercentage: data[INDI_FIRM_CHANGE_SIGNAL_DATA_MAP.BuyIndividualVolumePercentage],
        buyIndividualCount: data[INDI_FIRM_CHANGE_SIGNAL_DATA_MAP.BuyIndividualCount],
        buyFirmVolume: data[INDI_FIRM_CHANGE_SIGNAL_DATA_MAP.BuyFirmVolume],
        buyFirmVolumePercentage: data[INDI_FIRM_CHANGE_SIGNAL_DATA_MAP.BuyFirmVolumePercentage],
        buyFirmCount: data[INDI_FIRM_CHANGE_SIGNAL_DATA_MAP.BuyFirmCount],
        selIndividualVolume: data[INDI_FIRM_CHANGE_SIGNAL_DATA_MAP.SelIndividualVolume],
        selIndividualVolumePercentage: data[INDI_FIRM_CHANGE_SIGNAL_DATA_MAP.SelIndividualVolumePercentage],
        selIndividualCount: data[INDI_FIRM_CHANGE_SIGNAL_DATA_MAP.SelIndividualCount],
        selFirmVolume: data[INDI_FIRM_CHANGE_SIGNAL_DATA_MAP.SelFirmVolume],
        selFirmVolumePercentage: data[INDI_FIRM_CHANGE_SIGNAL_DATA_MAP.SelFirmVolumePercentage],
        selFirmCount: data[INDI_FIRM_CHANGE_SIGNAL_DATA_MAP.SelFirmCount],
    }
}


const CLOSING_PRICE_SINGAL_DATA_MAP = {
    Isin: 0,
    ClosingPrice: 1,
    ClosingPriceVariation: 2,
    ClosingPriceVariationPercentage: 3,
    TotalNumberOfTrades: 4,
    TotalNumberOfSharesTraded: 5,
    TotalTradeValue: 6

}

export function closingPriceSignalParser(data: any): IClosingPriceSignal {
    return {
        isin: data[CLOSING_PRICE_SINGAL_DATA_MAP.Isin],
        closingPrice: data[CLOSING_PRICE_SINGAL_DATA_MAP.ClosingPrice],
        closingPriceVariation: data[CLOSING_PRICE_SINGAL_DATA_MAP.ClosingPriceVariation],
        closingPriceVariationPercentage: data[CLOSING_PRICE_SINGAL_DATA_MAP.ClosingPriceVariationPercentage],
        totalNumberOfTrades: data[CLOSING_PRICE_SINGAL_DATA_MAP.TotalNumberOfTrades],
        totalNumberOfSharesTraded: data[CLOSING_PRICE_SINGAL_DATA_MAP.TotalNumberOfSharesTraded],
        totalTradeValue: data[CLOSING_PRICE_SINGAL_DATA_MAP.TotalTradeValue],
    }
}

const TSE_MARKET_SUMMARY_DATA_MAP = {
    Isin: 0,
    InstrumentId: 1,
    MarketValue: 2,
    TotalNumberOfSharesTraded: 3,
    TotalNumberOfTrades: 4,
    TotalTradeValue: 5,
    LastIndexLevel: 6,
    LastIndexLevelVariation: 7,
    LastIndexLevelVariationPercentage: 8
}

export function tseMarketSummaryParser(data: any): ITseMarketSummary {
    return {
        isin: data[TSE_MARKET_SUMMARY_DATA_MAP.Isin],
        instrumentId: data[TSE_MARKET_SUMMARY_DATA_MAP.InstrumentId],
        marketValue: data[TSE_MARKET_SUMMARY_DATA_MAP.MarketValue],
        totalNumberOfSharesTraded: data[TSE_MARKET_SUMMARY_DATA_MAP.TotalNumberOfSharesTraded],
        totalNumberOfTrades: data[TSE_MARKET_SUMMARY_DATA_MAP.TotalNumberOfTrades],
        totalTradeValue: data[TSE_MARKET_SUMMARY_DATA_MAP.TotalTradeValue],
        lastIndexLevel: data[TSE_MARKET_SUMMARY_DATA_MAP.LastIndexLevel],
        lastIndexLevelVariation: data[TSE_MARKET_SUMMARY_DATA_MAP.LastIndexLevelVariation],
        lastIndexLevelVariationPercentage: data[TSE_MARKET_SUMMARY_DATA_MAP.LastIndexLevelVariationPercentage],
    }
}

export const OMS_TRADE_SIGNAL_DATA_MAP = {
    InstrumentId: 0,
    InvestorBourseCode: 1,
    InvestorBourseCodeId: 1,
    OrderId: 3,
    TradeId: 4,
    TradePrice: 5,
    TradeQuantity: 6,
    InstrumentName: 7,
    InvestorBourseTitle: 8,
    OrderNumber: 9,
    TradeNumber: 10,
    TradeSide: 11,
    TradeDateTime: 12,
    TradeRemainingQuantity: 13,
    InstrumentIdentification: 14,
}

export function omsTradeSignalParser(data: any): IOmsTradeSignal {
    return {
        instrumentId: data[OMS_TRADE_SIGNAL_DATA_MAP.InstrumentId],
        investorBourseCode: data[OMS_TRADE_SIGNAL_DATA_MAP.InvestorBourseCode],
        investorBourseCodeId: data[OMS_TRADE_SIGNAL_DATA_MAP.InvestorBourseCodeId],
        orderId: data[OMS_TRADE_SIGNAL_DATA_MAP.OrderId],
        tradeId: data[OMS_TRADE_SIGNAL_DATA_MAP.TradeId],
        tradePrice: data[OMS_TRADE_SIGNAL_DATA_MAP.TradePrice],
        tradeQuantity: data[OMS_TRADE_SIGNAL_DATA_MAP.TradeQuantity],
        instrumentName: data[OMS_TRADE_SIGNAL_DATA_MAP.InstrumentName],
        investorBourseTitle: data[OMS_TRADE_SIGNAL_DATA_MAP.InvestorBourseTitle],
        orderNumber: data[OMS_TRADE_SIGNAL_DATA_MAP.OrderNumber],
        tradeNumber: data[OMS_TRADE_SIGNAL_DATA_MAP.TradeNumber],
        tradeSide: data[OMS_TRADE_SIGNAL_DATA_MAP.TradeSide],
        tradeDateTime: data[OMS_TRADE_SIGNAL_DATA_MAP.TradeDateTime],
        tradeRemainingQuantity: data[OMS_TRADE_SIGNAL_DATA_MAP.TradeRemainingQuantity],
        instrumentIdentification: data[OMS_TRADE_SIGNAL_DATA_MAP.InstrumentIdentification],
    }
}

export const CONTENT_SIGNAL_DATA_MAP = {
    Id: 0,
    Title: 1,
    PersianDateTime: 2,
    ContentReferenceTitle: 3,
    ContentTypeId: 4,
    ContentTypeTitle: 5,
    IntegrationNames: 6,
    Isin: 7,
    // Title: 0,
    CompanyTitle: 9
}

export function contentSignalParser(data: any): IContentSignal {
    return {
        Id: data[CONTENT_SIGNAL_DATA_MAP.Id],
        Title: data[CONTENT_SIGNAL_DATA_MAP.Title],
        PersianDateTime: data[CONTENT_SIGNAL_DATA_MAP.PersianDateTime],
        ContentReferenceTitle: data[CONTENT_SIGNAL_DATA_MAP.ContentReferenceTitle],
        ContentTypeId: data[CONTENT_SIGNAL_DATA_MAP.ContentTypeId],
        ContentTypeTitle: data[CONTENT_SIGNAL_DATA_MAP.ContentTypeTitle],
        IntegrationNames: data[CONTENT_SIGNAL_DATA_MAP.IntegrationNames],
        Isin: data[CONTENT_SIGNAL_DATA_MAP.Isin],
        CompanyTitle: data[CONTENT_SIGNAL_DATA_MAP.CompanyTitle]
        // Title: 8,
    }
}

export const OMS_IPO_ORDER_CHANGE_SIGNAL_DATA_MAP = {
    InstrumentIsin: 0,
    StartDateTime: 1,
    EndDateTime: 2,
    MaxOrderQuntity: 3,
    Minimumprice: 4,
    Maximumprice: 5,
    Action: 6,
}

export function omsIpoOrderChangeSignalParser(data: any): IOmsIpoOrderChangeSignal {
    return {
        instrumentIsin: data[OMS_IPO_ORDER_CHANGE_SIGNAL_DATA_MAP.InstrumentIsin],
        startDateTime: data[OMS_IPO_ORDER_CHANGE_SIGNAL_DATA_MAP.StartDateTime],
        endDateTime: data[OMS_IPO_ORDER_CHANGE_SIGNAL_DATA_MAP.EndDateTime],
        maxOrderQuntity: data[OMS_IPO_ORDER_CHANGE_SIGNAL_DATA_MAP.MaxOrderQuntity],
        minimumprice: data[OMS_IPO_ORDER_CHANGE_SIGNAL_DATA_MAP.Minimumprice],
        maximumprice: data[OMS_IPO_ORDER_CHANGE_SIGNAL_DATA_MAP.Maximumprice],
        action: data[OMS_IPO_ORDER_CHANGE_SIGNAL_DATA_MAP.Action],
    }
}


export const OMS_RESULT_SIGNAL_DATA_MAP = {
    OrderId: 0,
    PersonageId: 1,
    InvestorBourseCode: 2,
    InvestorBourseCodeId: 3,
    Action: 4,
    NoticeMessage: 5,
    isPopupClosable: 6,
    RemainQuantity: 7,
    Quantity1: 8,
    ClientInternalId: 9,
    AccountRouteTypeId: 10,
    AccountRouteTypeTitle: 11,
    ParentExecutedQuantity: 12,
    Description: 13,
    InstrumentIsin: 14,
    InstrumentName: 15,
    InvestorTitle: 16,
    OrderNumber: 17,
    HostOrderNumber: 18,
    OrderSide: 19, //number 1|2 (Buy/Sell)
    OrderStateId: 20,
    OrderStateEnglishTitle: 21,
    ParentDescription: 22,
    ParentOrderId: 23,
    ParentOrderStateId: 24,
    Price1: 25,
    UserOrderEntryId: 26,
    OrderEntryDate: 27,
    OrderEntryTime: 28,
    OrderStatus: 29,
    ParentOrderStatus: 30,
    CanceledQuantity: 31,
    Executed: 32,
    Quantity2: 33,
    Price2: 34,

}

export function omsResultSignalParser(data: any): IOmsResultSignal  {
    return {
        orderId: data[OMS_RESULT_SIGNAL_DATA_MAP.OrderId],
        personageId: data[OMS_RESULT_SIGNAL_DATA_MAP.PersonageId],
        investorBourseCode: data[OMS_RESULT_SIGNAL_DATA_MAP.InvestorBourseCode],
        investorBourseCodeId: data[OMS_RESULT_SIGNAL_DATA_MAP.InvestorBourseCodeId],
        action: data[OMS_RESULT_SIGNAL_DATA_MAP.Action],
        noticeMessage: data[OMS_RESULT_SIGNAL_DATA_MAP.NoticeMessage],
        isPopupClosable: data[OMS_RESULT_SIGNAL_DATA_MAP.isPopupClosable],
        remainQuantity: data[OMS_RESULT_SIGNAL_DATA_MAP.RemainQuantity],
        quantity1: data[OMS_RESULT_SIGNAL_DATA_MAP.Quantity1],
        clientInternalId: data[OMS_RESULT_SIGNAL_DATA_MAP.ClientInternalId],
        accountRouteTypeId: data[OMS_RESULT_SIGNAL_DATA_MAP.AccountRouteTypeId],
        accountRouteTypeTitle: data[OMS_RESULT_SIGNAL_DATA_MAP.AccountRouteTypeTitle],
        parentExecutedQuantity: data[OMS_RESULT_SIGNAL_DATA_MAP.ParentExecutedQuantity],
        description: data[OMS_RESULT_SIGNAL_DATA_MAP.Description],
        instrumentIsin: data[OMS_RESULT_SIGNAL_DATA_MAP.InstrumentIsin],
        instrumentName: data[OMS_RESULT_SIGNAL_DATA_MAP.InstrumentName],
        investorTitle: data[OMS_RESULT_SIGNAL_DATA_MAP.InvestorTitle],
        orderNumber: data[OMS_RESULT_SIGNAL_DATA_MAP.OrderNumber],
        hostOrderNumber: data[OMS_RESULT_SIGNAL_DATA_MAP.HostOrderNumber],
        orderSide: data[OMS_RESULT_SIGNAL_DATA_MAP.OrderSide],
        orderStateId: data[OMS_RESULT_SIGNAL_DATA_MAP.OrderStateId],
        orderStateEnglishTitle: data[OMS_RESULT_SIGNAL_DATA_MAP.OrderStateEnglishTitle],
        parentDescription: data[OMS_RESULT_SIGNAL_DATA_MAP.ParentDescription],
        parentOrderId: data[OMS_RESULT_SIGNAL_DATA_MAP.ParentOrderId],
        parentOrderStateId: data[OMS_RESULT_SIGNAL_DATA_MAP.ParentOrderStateId],
        price1: data[OMS_RESULT_SIGNAL_DATA_MAP.Price1],
        userOrderEntryId: data[OMS_RESULT_SIGNAL_DATA_MAP.UserOrderEntryId],
        orderEntryDate: data[OMS_RESULT_SIGNAL_DATA_MAP.OrderEntryDate],
        orderEntryTime: data[OMS_RESULT_SIGNAL_DATA_MAP.OrderEntryTime],
        orderStatus: data[OMS_RESULT_SIGNAL_DATA_MAP.OrderStatus],
        parentOrderStatus: data[OMS_RESULT_SIGNAL_DATA_MAP.ParentOrderStatus],
        canceledQuantity: data[OMS_RESULT_SIGNAL_DATA_MAP.CanceledQuantity],
        executed: data[OMS_RESULT_SIGNAL_DATA_MAP.Executed],
        quantity2: data[OMS_RESULT_SIGNAL_DATA_MAP.Quantity2],
        price2: data[OMS_RESULT_SIGNAL_DATA_MAP.Price2], 
    }
}

const TSE_THEORETICAL_OPENING_PRICE_DATA_MAP = {
    Isin: 0,
    TheoreticalOpeningPrice: 1,
    TopVariation: 2,
    TopVariationPercentage: 3,
}

export function tseTheoreticalOpeningPriceParser(data: any): ITseTheoreticalOpeningPrice {
    return {
        isin: data[TSE_THEORETICAL_OPENING_PRICE_DATA_MAP.Isin],
        theoreticalOpeningPrice: data[TSE_THEORETICAL_OPENING_PRICE_DATA_MAP.TheoreticalOpeningPrice],
        topVariation: data[TSE_THEORETICAL_OPENING_PRICE_DATA_MAP.TopVariation],
        topVariationPercentage: data[TSE_THEORETICAL_OPENING_PRICE_DATA_MAP.TopVariationPercentage],
    }
}



const MARKET_TIME_CALENDER = {
    TseStateCode:0,
    TseStateTitle:1
}
export function MarketTimeCalenderParser(data:any):IMarketTimeCalender{
    return{
        TseStateCode:data[MARKET_TIME_CALENDER.TseStateCode],
        TseStateTitle:data[MARKET_TIME_CALENDER.TseStateTitle]
    }
}

const INDEXES = {
    IndexTitle: 0,
    IndexIndexCode: 1,
    IndexIndexValue: 2,
    IndexTime: 3,
    IndexIndexValueChange: 4,
    IndexIndexValueChangePercent: 5,
    IndexIndexLevelCode: 6,
    IndexindexCisinCode: 7,
}

export function indexesSocketParser(data: any): IIndexs {
    return {
        indexTitle: data[INDEXES.IndexTitle],
        indexIndexCode: data[INDEXES.IndexIndexCode],
        indexIndexValue: data[INDEXES.IndexIndexValue],
        indexTime: data[INDEXES.IndexTime],
        indexIndexValueChange: data[INDEXES.IndexIndexValueChange],
        indexIndexValueChangePercent: data[INDEXES.IndexIndexValueChangePercent],
        indexIndexLevelCode: data[INDEXES.IndexIndexLevelCode],
        indexindexCisinCode: data[INDEXES.IndexindexCisinCode],
    }
}


/*export const SOCKET_PARSER_MAP = {
    10: instrumentTradeChangeSignalParser,
    // 11: ,
    12: closingPriceSignalParser,
    // 13: 
    14: bidAskParser,
    15: indiFirmChangeSignalParser,
    16: tseMarketSummaryParser,
    19: contentSignalParser,
    20: omsIpoOrderChangeSignalParser,
    21: omsResultSignalParser,
    22: omsTradeSignalParser,
    23: omsAccountStateChangeSignalParser,
    39: tseTheoreticalOpeningPriceParser,
}*/