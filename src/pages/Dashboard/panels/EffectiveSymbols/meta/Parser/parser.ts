import {EffectiveSymbolTypesIpo,EffectiveSymbolTypesImpact} from "./type";
import {EFFECTIVE_SYMBOLS_MAP, EFFECTIVE_SYMBOLS_MAP_IMPACT} from "./dataMap";

export function effectiveSymbolsParserIpo(data:any[]):EffectiveSymbolTypesIpo[] {

        return (data || []).map(row => ({
            isin : row[EFFECTIVE_SYMBOLS_MAP.isin],
            instrumentName : row[EFFECTIVE_SYMBOLS_MAP.instrumentName],
            instrumentTitle : row[EFFECTIVE_SYMBOLS_MAP.instrumentTitle],
            maxPrice : row[EFFECTIVE_SYMBOLS_MAP.maxPrice],
            minPrice : row[EFFECTIVE_SYMBOLS_MAP.minPrice],
            maxQuantity : row[EFFECTIVE_SYMBOLS_MAP.maxQuantity],
            minQuantity:row[EFFECTIVE_SYMBOLS_MAP.minQuantity],
            ipoDate:row[EFFECTIVE_SYMBOLS_MAP.ipoDate],
            startTime :row[EFFECTIVE_SYMBOLS_MAP.startTime],
            endTime : row[EFFECTIVE_SYMBOLS_MAP.endTime]
        }))

}
export function effectiveSymbolsParserImapact(data:any[]):EffectiveSymbolTypesImpact[] {

    return (data || []).map(row => ({
        isin : row[EFFECTIVE_SYMBOLS_MAP_IMPACT.isin],
        instrumentName : row[EFFECTIVE_SYMBOLS_MAP_IMPACT.instrumentName],
        instrumentTitle : row[EFFECTIVE_SYMBOLS_MAP_IMPACT.instrumentTitle],
        lastPrice : row[EFFECTIVE_SYMBOLS_MAP_IMPACT.lastPrice],
        lastPercent : row[EFFECTIVE_SYMBOLS_MAP_IMPACT.lastPercent],
        impact : row[EFFECTIVE_SYMBOLS_MAP_IMPACT.impact],
        marketType:row[EFFECTIVE_SYMBOLS_MAP_IMPACT.marketType]
    }))

}

