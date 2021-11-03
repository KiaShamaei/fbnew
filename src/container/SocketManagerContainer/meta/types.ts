import { SocketKeysEnum } from "enums/SocketKeysEnum";

export type RegisterCallback = (data: any) => void;

export type ForgottFuncType = (isin: string, cb: RegisterCallback) => void;
export type RegisterFuncType = (isin: string, cb: RegisterCallback, code: SocketKeysEnum) => void;
export type RegisterPublicTseType = (cb: RegisterCallback, code: SocketKeysEnum) => void;

export interface SocketManagerContextProps {
    register: RegisterFuncType;
    unRegister: ForgottFuncType;
    registerPublicTse: RegisterPublicTseType,
    queueRegister: RegisterFuncType,
    unRegisterGlobal: (cb: RegisterCallback) => void,
    queueUnRegister: ForgottFuncType,
}