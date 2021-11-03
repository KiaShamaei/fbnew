export interface IOrder {
    id: number;
    instrumentName?: string;
    count?: number;
    price?: number;
    numberOfSharesTraded?: number;
    canceled?: number;
    order?: string;
    time?: string;
    lastPrice?: number;
}