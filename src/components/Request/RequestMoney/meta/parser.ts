import {IRequestMoneyTypes} from './type'
import {REQUEST_MONEY_MAP} from "./dataMap";

export function requestMoneyParser(data: any[]):IRequestMoneyTypes[] {
return data.map(row => ({
    id: row[REQUEST_MONEY_MAP.id],
    paymentRequestDate: row[REQUEST_MONEY_MAP.paymentRequestDate],
    accountNumber: row[REQUEST_MONEY_MAP.accountNumber],
    amount: row[REQUEST_MONEY_MAP.amount],
    bankName: row[REQUEST_MONEY_MAP.bankName],
    creationDate: row[REQUEST_MONEY_MAP.creationDate],
    status: row[REQUEST_MONEY_MAP.status],
    statusId: row[REQUEST_MONEY_MAP.statusId]
}))
}