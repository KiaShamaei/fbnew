import { IBidAsk } from "./IBidAsk";

export interface ISymbol {
    isin: string, //Isin
    instrumentName: string,//نام نماد
    instrumentTitle: string,//عنوان نماد
    instrumentCode: string,//کد
    instrumentStateCode: string,//وضعیت نماد
    instrumentStateTitle: string,//عنوان وضعیت نماد
    minimumOrderQuantity: number,//حداقل تعداد سفارش
    maximumOrderQuantity: number,//حداکثر تعداد سفارش
    upperPriceThreshold: number,//حد بالای قیمت
    lowerPriceThreshold: number,//حد پایین قیمت
    closingPrice: number,//قیمت پایانی 
    closingPricePercent: number,//درصد قیمت پایانی
    lastPrice: number,//آخرین قیمت
    lastPricePercent: number,//درصد آخرین 
    yesterdayPrice: number,//قیمت دیروز 
    yearHighestTradePrice: number,//بیشترین قیمت در سال 
    yearLowestTradePrice: number,//کمترین قیمت در 
    upperTradePrice: number,//بیشترین قیمت معامله 
    lowestTradePrice: number,//کمترین قیمت معامله 
    theoryOpeningPrice: number,//قیمت پیش گشایش 
    lastTradeDate: string,//آخرین زمان معامله 
    bidAsk: IBidAsk[],//صف خرید و فروش 
    buyFirmCount: number,//تعداد خرید حقوقی 
    buyFirmVolume: number,//حجم خرید حقوقی  
    buyFirmVolumePercentage: number,//درصد خرید حقوقی  
    buyIndividualCount: number,//تعداد خرید حقیقی 
    buyIndividualVolume: number,//حجم خرید حقیقی  
    buyIndividualVolumePercentage: number,//درصد خرید حقیقی 
    selFirmCount: number,//تعداد فروش حقوقی  
    selFirmVolume: number,//حجم فروش حقوقی 
    selFirmVolumePercentage: number,//درصد فروش حقوقی 
    selIndividualCount: number,//تعداد فروش حقیقی 
    selIndividualVolume: number,//حجم فروش حقیقی  
    selIndividualVolumePercentage: number,//درصد فروش حقیقی  
    totalNumberOfSharesTraded: number,//حجم معاملات
    totalNumberOfTrades: number,//ارزش بازار
    totalTradeValue: number,//ارزش معاملات  
    baseVolume: number,//حجم مبنا  
    sectorCode: string,//کد صنعت  
    exchangeName: string,//نوع بازار  
    exchangeCode: string,//کد بازار سهم  
    instrumentTypeCode: string,//نوع سهم  
    instrumentTypeTitle: string,//عنوان نوع سهم 
    tsetmcId: string//کد سایت تی اس 
    firstTradedPrice: number,// اولین قیمت
    liquidity: number,// نقد شوندگی
    indexImpact: number,// تاثیر در شاخص
    PE: number,// PE
    PEGroup: number,// PEGroup
    EPS: number,// EPS
    lastMonthTurnover: number,// بازده یکماهه
    lastThreeMonthesTurnover: number,// بازده سه ماهه
    closingPriceVariation: number,// پایانی تغییر
    lastPriceVariation: number, // آخرین تغییر
    InstrumentMarketValue: number, // ارزش بازار
    TomorrowLowerThreshold: number,
    TomorrowUpperThreshold: number,
    PriceTick: number
}