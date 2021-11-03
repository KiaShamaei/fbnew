import { DATA_MAP } from "./dataMap";
import { IRiskStateMent } from "./types";

export function riskStatementParser(data: any[] = []): IRiskStateMent[] {
    return data.map((row: any) => ({
        abbreviationCode: row[DATA_MAP.AbbreviationCode],
        description: row[DATA_MAP.Description],
        insertTimpStamp: row[DATA_MAP.InsertTimpStamp],
        confirmed: row[DATA_MAP.Confirmed],
        riskStatementCode: row[DATA_MAP.RiskStatementCode],
        riskStatementId: row[DATA_MAP.RiskStatementId],
        originTypeId: row[DATA_MAP.OriginTypeId],
    }))
}