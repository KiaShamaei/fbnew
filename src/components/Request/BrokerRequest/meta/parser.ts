import {IBrokerRequestTypes} from "./type";
import {BROKER_REQUEST_MAP} from "./dataMap";

export function brokerRequestParser(data:any[]):IBrokerRequestTypes[] {
    return data.map(row => ({
        id : row[BROKER_REQUEST_MAP.id],
        instrumentName : row[BROKER_REQUEST_MAP.instrumentName],
        changeRequestDate : row[BROKER_REQUEST_MAP.changeRequestDate],
        requestStatus : row[BROKER_REQUEST_MAP.requestStatus],
        requestStatusId : row[BROKER_REQUEST_MAP.requestStatusId]
    }))

}