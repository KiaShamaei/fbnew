import { CUMATIVE_ORDER_DATA_MAP } from "./dataMap"
import { ICumativeOrder } from "./types"

export const cumativeOrderItemParser = (data: any): ICumativeOrder => {
    return {
        id: data[CUMATIVE_ORDER_DATA_MAP.OrderId],
        isin: data[CUMATIVE_ORDER_DATA_MAP.Isin],
        instrumentName: data[CUMATIVE_ORDER_DATA_MAP.InstrumentName],
        orderSide: data[CUMATIVE_ORDER_DATA_MAP.OrderSide],
        orderSideName: data[CUMATIVE_ORDER_DATA_MAP.OrderSideName],
        price: data[CUMATIVE_ORDER_DATA_MAP.Price],
        quantity: data[CUMATIVE_ORDER_DATA_MAP.Quntity],
        remainQuantity: data[CUMATIVE_ORDER_DATA_MAP.RemainQuantity],
        orderStatusName: data[CUMATIVE_ORDER_DATA_MAP.OrderStatusName],
        upperPriceThreshold: data[CUMATIVE_ORDER_DATA_MAP.Details][0],
        lowerPriceThreshold: data[CUMATIVE_ORDER_DATA_MAP.Details][1],
        entryTime: data[CUMATIVE_ORDER_DATA_MAP.EntryTime]
    }
}

export const cumativeOrderParser = (data: any[] = []) => {
    return data.reduce((total, item) => {
        const parsedItem = cumativeOrderItemParser(item);
        const title = parsedItem.isin + '_' + parsedItem.orderSide
        return {
            ...total,
            [title]: {
                rows: ((total[title] && total[title].rows) || []).concat(parsedItem),
                isin: parsedItem.isin,
                instrumentName: parsedItem.instrumentName,
                orderSide: parsedItem.orderSide,
                upperPriceThreshold: parsedItem.upperPriceThreshold,
                lowerPriceThreshold: parsedItem.lowerPriceThreshold,
                orderSideName: parsedItem.orderSide === 1 ? 'خرید' : 'فروش'
            }
        }
    }, {})
}


export const cumativeOrderListParser = (data: any[] = []) => {
    return Object.entries(cumativeOrderParser(data)).map(([key, item]: any) => {
        return {
            title: `${item.orderSideName} ${item.instrumentName}`,
            orderSide: item.orderSide,
            upperPriceThreshold: item.upperPriceThreshold,
            lowerPriceThreshold: item.lowerPriceThreshold,
            rows: item.rows
        }
    })
}