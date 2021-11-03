import {Moment} from "jalali-moment";

export interface EffectiveSymbolTypesIpo {
    isin?: string;
    instrumentName?: string;
    instrumentTitle?: string;
    maxPrice:number;
    minPrice: number;
    maxQuantity:number;
    minQuantity:number;
    ipoDate?: string;
    startTime?: string;
    endTime?: string;
}

export interface EffectiveSymbolTypesImpact {
    isin?: string;
    instrumentName?: string;
    instrumentTitle?: string;
    lastPrice:number;
    lastPercent: number;
    impact:number;
    marketType: string;
}