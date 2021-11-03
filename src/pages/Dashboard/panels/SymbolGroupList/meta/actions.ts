import { takeEvery } from "@redux-saga/core/effects";
import API from "API";
import { AxiosError, AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";
import { IReduxState } from "redux/types";
import { getSetDataType, getSetErrorType, getSetLoadingType } from "redux/utils/sagaTypeGetter";
import { commonErrorHandler } from "utils/errorHandler";
import { FETCH_SYMBOL_GROUP_LIST, SYMBOL_GROUP_LIST } from "./actionTypes";
import { symbolGroupParser } from "./parser";

function* fetchSymbolGroupListAction() {
    try {
        const data: any[] = yield select((state: IReduxState) => state.symbolGroup.data);
        if(data && data.length > 0) 
            return;
        yield put({ type: getSetLoadingType(SYMBOL_GROUP_LIST), payload: true })
        const res: AxiosResponse = yield call(API.get, '/market/industry');
        const finalData = symbolGroupParser(res.data.data);
        yield put({ type: getSetDataType(SYMBOL_GROUP_LIST), payload: { data: finalData } })
    } catch(err) {
        const error = err as AxiosError;
        const errorMessage: string = commonErrorHandler(error)
        yield put({ type: getSetErrorType(SYMBOL_GROUP_LIST), payload: errorMessage });
    } finally {
        yield put({ type: getSetLoadingType(SYMBOL_GROUP_LIST), payload: false });
    }
}

export function* fetchSymbolGroupList() { 
    yield takeEvery(FETCH_SYMBOL_GROUP_LIST, fetchSymbolGroupListAction);
}