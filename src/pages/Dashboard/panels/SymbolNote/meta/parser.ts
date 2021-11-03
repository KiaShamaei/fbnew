import {Isymbolnote} from './type'
import {REQUEST_INOTE_MAP} from "./dataMap";

export function prseSymbolNote(data: any[]):Isymbolnote[] {
return data.map(row => ({
    isin: row[REQUEST_INOTE_MAP.isin],
    instrumentName: row[REQUEST_INOTE_MAP.instrumentName],
    titr: row[REQUEST_INOTE_MAP.titr],
    note: row[REQUEST_INOTE_MAP.note],
    color: row[REQUEST_INOTE_MAP.color],
    date: row[REQUEST_INOTE_MAP.date],
    time: row[REQUEST_INOTE_MAP.time],
}))
}