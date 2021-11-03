import { ORDER_HISTORY_MAP } from "./dataMap";
import { OrderHistoryTableTypes } from "./type";

export default function orderHistoryDataParser(data:any[]):OrderHistoryTableTypes[] {
    return data.map(row=> ({
        orderId: row[ORDER_HISTORY_MAP.orderId],
        isin: row[ORDER_HISTORY_MAP.isin],
        instrumentName: row[ORDER_HISTORY_MAP.instrumentName],
        orderSide: row[ORDER_HISTORY_MAP.orderSide],
        orderSideName: row[ORDER_HISTORY_MAP.orderSideName],
        price: row[ORDER_HISTORY_MAP.price],
        quntity: row[ORDER_HISTORY_MAP.quntity],
        personageName:row[ORDER_HISTORY_MAP.personageName],
        remainQuantity:row[ORDER_HISTORY_MAP.remainQuantity],
        orderStatusName: row[ORDER_HISTORY_MAP.orderStatusName],
        validityTypeName: row[ORDER_HISTORY_MAP.validityTypeName],
        validityDate: row[ORDER_HISTORY_MAP.validityDate],
        entryDateTime: row[ORDER_HISTORY_MAP.entryDateTime] 
    }))
}