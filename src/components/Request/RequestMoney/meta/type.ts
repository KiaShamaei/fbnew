import {Moment} from "jalali-moment";

export interface IRequestMoneyTypes {
    id?: number;
    paymentRequestDate?: Moment;
    accountNumber?: number;
    amount?: number;
    bankName?: string;
    creationDate?: Moment;
    status?: string;
    statusId?: string;
}

export interface IWithdrawalDepositDates {
    date: Moment;
    remain: number;
}