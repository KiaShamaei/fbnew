import { IFetchState } from "redux/types";

export interface ICODAL {
   id: string,
   Subject: string,
   isin:string,
   name:string,
   instrumentName:string,
   date:string,
   url:string,
}

export interface ICodalFilter {
   base: 'PORFOLIO' | 'ALL_MESSGES' | 'WATCH',
   symbol?: { label: string, id: string }
}

export interface ICodalState extends IFetchState {
   filters?: any;
}