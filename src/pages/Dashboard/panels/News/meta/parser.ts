import { PORTFOLIO_DATA_MAP } from "./dataMap";
import { INews } from "./type";

export function newsParser(data: any[]): INews[] {
 
  return data?.map(row => ({
    id: row[PORTFOLIO_DATA_MAP.id],
    titr: row[PORTFOLIO_DATA_MAP.titr],
    summarytitr: row[PORTFOLIO_DATA_MAP.summarytitr],
    text: row[PORTFOLIO_DATA_MAP.text],
    dateTime: row[PORTFOLIO_DATA_MAP.dateTime],
    sourceNews: row[PORTFOLIO_DATA_MAP.sourceNews],
    tags: (row[PORTFOLIO_DATA_MAP.isin] ?? []).map((item: any) => ({
      isin: item[0],
      name: item[1],
    })),
    newsLink: row[PORTFOLIO_DATA_MAP.newsLink],
  }));
}
