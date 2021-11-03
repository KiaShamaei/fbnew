import {IDepositMoney} from './type'
import {DEPOSIT_MONEY_MAP} from "./dataMap";

export function depositMoneyParser(data: any[]):IDepositMoney[] {
    return data.map(row => ({
        orderNumber : row[DEPOSIT_MONEY_MAP.orderNumber],
        amount : row[DEPOSIT_MONEY_MAP.amount],
        bankName : row[DEPOSIT_MONEY_MAP.bankName],
        status : row[DEPOSIT_MONEY_MAP.status],
        orderDate : row[DEPOSIT_MONEY_MAP.orderDate]
    }))
}
