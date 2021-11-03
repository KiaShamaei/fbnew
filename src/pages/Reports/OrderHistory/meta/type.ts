import moment, { Moment } from "jalali-moment";

export interface OrderHistoryTableTypes{
    orderId: number;
    isin: string;
    instrumentName: string;
    orderSide: number;
    orderSideName: string;
    price: number;
    quntity: number;
    personageName:string;
    remainQuantity:string;
    orderStatusName: string;
    validityTypeName: string;
    validityDate: Moment;
    entryDateTime: Moment; 
}