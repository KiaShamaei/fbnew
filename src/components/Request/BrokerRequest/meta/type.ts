import {Moment} from "jalali-moment";

export interface IBrokerRequestTypes {
    id: number;
    instrumentName: string;
    changeRequestDate: Moment;
    requestStatus: string;
    requestStatusId: number;
}