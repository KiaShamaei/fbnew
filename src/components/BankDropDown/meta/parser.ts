import {IGatewayTypes} from "./type";
import {GATEWAY_MAP} from "./dataMap";

export function gatewayParser (data: any[]):IGatewayTypes[]{
    return data.map(row => ({
        id : row[GATEWAY_MAP.id],
        bankName:row[GATEWAY_MAP.bankName]
    }))
}