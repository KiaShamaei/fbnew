import { CurrentItemMode } from "./types";

export interface DataTypePreOrder {
  id: string;
  isin: string;
  instrumentName: string;
  orderSide: number;
  price: number;
  quantity: number;
  entryDate: any;
  validityDate: any;
  validityType: any;
  instrument: any;
}
export interface DataTypeOrder {
  id: number;
  isin: string;
  instrumentName: any;
  orderSide: number;
  orderSideName: string;
  price: number;
  quntity: number;
  remainQuantity: any;
  orderStatusName: string;
  entryTime:string;
  instrument: any;
  executedQuantity:number;
  validityType:number;
  validityDate:any;
}
export interface InstrumentTypes {
  upperPriceThreshold: number;
  lowerPriceThreshold: number;
  upperTradePrice: number;
  lowestTradePrice: number;
  lastPrice: number;
  closingPrice: number;
  yesterdayPrice: number;
}

export interface CurrentOrderListContextProps {
  handleOrder: (values: any) => void;
  handlePreOrder: (values: any) => void;
}

export interface CurrentOrdersCheckListContextProps {
  checkList: string[];
  onCheck: (id: string) => void;
  setCheckList: (checkList: string[]) => void;
}
