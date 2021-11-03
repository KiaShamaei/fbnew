import { Action } from "redux";

export interface IEffectiveSymbolsState {
    isLoading?: boolean;
    payload?: any;
    error?: any;
}

export interface IEffectiveSymbolsAction extends Action {
    payload: any;
}