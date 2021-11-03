import { DataTypePreOrder,DataTypeOrder , InstrumentTypes } from "./type";
import { DATA_MAP_PREORDER, INSTRUMENT_MAP ,DATA_MAP_ORDER } from "./dataMap";

export function gatDataPreOrder(data: any[]): DataTypePreOrder[] {
  return (data || []).map((row: any) => ({
    id: row[DATA_MAP_PREORDER.id],
    isin: row[DATA_MAP_PREORDER.isin],
    instrumentName: row[DATA_MAP_PREORDER.instrumentName],
    orderSide: row[DATA_MAP_PREORDER.orderSide] + 2,
    price: row[DATA_MAP_PREORDER.price],
    quantity: row[DATA_MAP_PREORDER.quantity],
    entryDate: row[DATA_MAP_PREORDER.entryDate],
    validityDate: row[DATA_MAP_PREORDER.validityDate],
    validityType: row[DATA_MAP_PREORDER.validityType],
    instrument: row[DATA_MAP_PREORDER.instrument],
  }));
}

export function gatDataOrder(data: any[]): DataTypeOrder[] {
  return (data || []).map((row: any) => ({
    id: row[DATA_MAP_ORDER.orderId],
    isin: row[DATA_MAP_ORDER.isin],
    instrumentName: row[DATA_MAP_ORDER.instrumentName],
    orderSide: row[DATA_MAP_ORDER.orderSide],
    orderSideName: row[DATA_MAP_ORDER.orderSideName],
    price: row[DATA_MAP_ORDER.price],
    quntity: row[DATA_MAP_ORDER.quntity],
    remainQuantity: row[DATA_MAP_ORDER.remainQuantity],
    orderStatusName: row[DATA_MAP_ORDER.orderStatusName],
    entryTime: row[DATA_MAP_ORDER.entryTime],
    instrument: row[DATA_MAP_ORDER.instrument],
    executedQuantity:row[DATA_MAP_ORDER.executedQuantity],
    validityType:row[DATA_MAP_ORDER.validityType],
    validityDate:row[DATA_MAP_ORDER.validityDate]
  }));
}

export function getInstrumentParser(data: any[]): InstrumentTypes {
  return {
    yesterdayPrice: data[INSTRUMENT_MAP?.yesterdayPrice],
    lowerPriceThreshold: data[INSTRUMENT_MAP?.lowerPriceThreshold],
    upperPriceThreshold: data[INSTRUMENT_MAP?.upperPriceThreshold],
    upperTradePrice: data[INSTRUMENT_MAP?.upperTradePrice],
    lowestTradePrice: data[INSTRUMENT_MAP?.lowestTradePrice],
    lastPrice: data[INSTRUMENT_MAP?.lastPrice],
    closingPrice: data[INSTRUMENT_MAP?.closingPrice],
  };
}
