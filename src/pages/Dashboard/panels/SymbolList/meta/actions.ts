import { takeEvery } from "@redux-saga/core/effects";
import API from "API";
import { AxiosError, AxiosResponse } from "axios";
import { call, put } from "redux-saga/effects";
import { IFetchAction, IFetchDataAction } from "redux/types";
import { getSetDataType, getSetErrorType, getSetLoadingType } from "redux/utils/sagaTypeGetter";
import { commonErrorHandler } from "utils/errorHandler";
import { FETCH_SYMBOL_LIST, SYMBOL_LIST } from "./actionTypes";
import { INDUSTRY_SEARCH_DATA_MAP, SYMBOL_SERACH_DATA_MAP } from "./dataMap";
import { dataParser } from "./utils";

function* fetchSymbolListData(action: IFetchAction) {
    try {
        yield put({ type: getSetLoadingType(SYMBOL_LIST), payload: true })
        let url = '';
        let dataMap: any = SYMBOL_SERACH_DATA_MAP;
        if(action.urlParams.searchKey) {
            url = `/instrument/search/${action.urlParams.searchKey}`
        }
        if(action.urlParams.selectedSymbolGroup){
            url = `/instrument/industry/${action.urlParams.selectedSymbolGroup}`
            dataMap = INDUSTRY_SEARCH_DATA_MAP;
        }
        const res: AxiosResponse = yield call(API.get, url)
        const data = dataParser(res.data || [], dataMap)
        yield put({
            type: getSetDataType(SYMBOL_LIST),
            payload: { hasEnd: true, data }
        })
    } catch (err) {
        const error = err as AxiosError;
        const errorMessage: string = commonErrorHandler(error)
        yield put<IFetchDataAction>({ type: getSetErrorType(SYMBOL_LIST), payload: errorMessage });
    } finally {
        yield put<IFetchDataAction>({ type: getSetLoadingType(SYMBOL_LIST), payload: false });
    }
}

export function* fetchSymbolList() { 
    yield takeEvery(FETCH_SYMBOL_LIST, fetchSymbolListData);
}