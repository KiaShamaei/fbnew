import {Moment} from "jalali-moment";

export interface IDepositMoney {
    orderNumber: number;
    amount: number;
    bankName: string;
    status: string;
    orderDate: Moment;
}

export interface IEPaymentReponse {
    id: string;
    method: string;
    params: any;
    url: string;
    refrenceId: string;
}