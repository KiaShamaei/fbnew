
import { CODAL_DATA_MAP } from "./dataMap";
import { ICODAL } from "./type";

export function codalParser(data: any[]): ICODAL[] {
    return data.map(row => ({
        id: row[CODAL_DATA_MAP.id],
        Subject: row[CODAL_DATA_MAP.Subject],
        isin: row[CODAL_DATA_MAP.isin],
        name: row[CODAL_DATA_MAP.name],
        instrumentName: row[CODAL_DATA_MAP.instrumentName],
        date: row[CODAL_DATA_MAP.date],
        url: row[CODAL_DATA_MAP.url],
    }))
}


