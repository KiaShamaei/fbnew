import API from "API";
import { AxiosError, AxiosResponse } from "axios";
import { call, put, takeEvery, takeLatest } from "redux-saga/effects";
import { IFetchDataAction } from "redux/types";
import { getSetDataType, getSetErrorType, getSetLoadingType } from "redux/utils/sagaTypeGetter";
import { IData } from "types/IData";
import { ISymbol } from "types/ISymbol";
import { commonErrorHandler } from "utils/errorHandler";
import { FETCH_SYMBOL_DETAIL, SYMBOL_DETAIL } from "./actionTypes";
import { symbolDetailParser } from "./parser";

export function* fetchSymbolDetailAction(action: any) {
    try {
        const activeIsin = action.activeIsin;
        if(!activeIsin) {
            yield put({
                type: getSetDataType(SYMBOL_DETAIL),
                payload: {
                    data: null
                }
            });    
            return
        }
        yield put({ type: getSetLoadingType(SYMBOL_DETAIL), payload: true });
        const response: AxiosResponse<IData<any[]>> = yield call(API.get, `/instrument/${activeIsin}`);
        const result = response?.data?.data ?? [];
        const symbolDetail: ISymbol = symbolDetailParser(result);
        console.log(symbolDetail, 'Symbol Details')
        yield put({
            type: getSetDataType(SYMBOL_DETAIL),
            payload: {
                data: symbolDetail
            }
        });
    } catch (err) {
        const error = err as AxiosError;
        const errorMessage: string = commonErrorHandler(error)
        yield put<IFetchDataAction>({
            type: getSetErrorType(SYMBOL_DETAIL),
            payload: errorMessage
        });
        yield put({
            type: getSetLoadingType(SYMBOL_DETAIL),
            payload: true
        });
    } finally {
        yield put<IFetchDataAction>({ type: getSetLoadingType(SYMBOL_DETAIL), payload: false });
    }
}

export function* fetchSymbolDetail() {
    yield takeEvery(FETCH_SYMBOL_DETAIL, fetchSymbolDetailAction)
}