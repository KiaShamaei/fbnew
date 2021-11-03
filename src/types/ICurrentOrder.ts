export interface ICurrentOrder {
    id: number;
    symbolName: string;
    orderValue: number;
    number: number;
    amount: number;
    time: number;
    type: CurrentOrderType;
    headToHeadPrices: number;
    transactionFee: number;
    total: number;
    credit: string;
    accountType: string;
    displayVolume: string;
}

export type CurrentOrderType = 'SELL_DRAFT' | 'BUY_DRAFT' | 'SELL' | 'BUY'