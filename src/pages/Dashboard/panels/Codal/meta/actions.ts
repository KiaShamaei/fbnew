import API from "API";
import { AxiosResponse } from "axios";
import { call, put, select, takeEvery } from "redux-saga/effects";
import { IReduxState } from "redux/types";
import { getSetDataType, getSetLoadingType } from "redux/utils/sagaTypeGetter";
import { CODAL, FETCH_CODAL_LIST } from "./actionTypes";
import { codalParser } from "./parser";
import { ICODAL } from "./type";

export function* fetchCodalDataAction(action?: { params: any, reset?: boolean }) {
    try {
        yield put({ type: getSetLoadingType(CODAL), payload: true })
        const response: AxiosResponse = yield call(API.get, '/content/codal', {
            params: {
                limit: 24,
                tags: action?.params?.symbol?.id,
                page: action?.params?.page
            }
        });
        const data = response.data
        const codalList = codalParser(data.data);
        let prevData: ICODAL[] = yield select((state: IReduxState) => state.codal.data);
        yield put({
            type: getSetDataType(CODAL),
            payload: {
                data: !action?.reset ? (prevData ?? []).concat(codalList) : codalList,
                hasEnd: codalList.length < 12
            }
        })
    } catch {
        yield put({ type: getSetLoadingType(CODAL), payload: false })
        yield put({
            type: getSetDataType(CODAL), payload: {
                data: [],
                hasEnd: true
            }
        })
    }
}

export function* fetchCodalData() {
    yield takeEvery(FETCH_CODAL_LIST, fetchCodalDataAction);
}