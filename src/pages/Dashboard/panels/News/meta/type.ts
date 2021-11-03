export interface INewsTag {
  isin: string;
  name: string;
}

export interface INews {
  id: string;
  titr: string;
  summarytitr: string;
  text: string;
  dateTime: string;
  sourceNews: string;
  tags: INewsTag[];
  newsLink: string;
}
