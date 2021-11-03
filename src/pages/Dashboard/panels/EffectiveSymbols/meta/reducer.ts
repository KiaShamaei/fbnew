import {FETCH_EFFECTIVE_SYMBOLS_GET , FETCH_EFFECTIVE_SYMBOLS_ERROR,FETCH_EFFECTIVE_SYMBOLS_LOADING} from "./actionTypes";
import {IEffectiveSymbolsAction,IEffectiveSymbolsState} from "./types";


export function effectiveSymbolsReducer(state: IEffectiveSymbolsState = {}, { payload, type }: IEffectiveSymbolsAction ) {
    switch(type) {
        case FETCH_EFFECTIVE_SYMBOLS_LOADING:
            return {...state , isLoading : payload}
        case FETCH_EFFECTIVE_SYMBOLS_GET:
            return { ...state, payload: payload }
        case FETCH_EFFECTIVE_SYMBOLS_ERROR:
            return { ...state, error: payload }
        default:
            return state;
    }
}