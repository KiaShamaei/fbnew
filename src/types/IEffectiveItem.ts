import { ISymbol } from "./ISymbol_";

export interface IEffectiveItem {
    id: number;
    type: string;
    title: string;
    link?: null | string;
    index?: number;
    indexPrecent?: number;
    symbols?: ISymbol[];
}