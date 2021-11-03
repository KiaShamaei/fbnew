import { takeEvery } from "@redux-saga/core/effects";
import API from "API";
import { AxiosError, AxiosResponse } from "axios";
import { call, put, select } from "redux-saga/effects";
import { IReduxState } from "redux/types";
import { getSetDataType, getSetErrorType, getSetLoadingType } from "redux/utils/sagaTypeGetter";
import { ICommonFetchData } from "types/ICommonFetchData";
import { commonErrorHandler } from "utils/errorHandler";
import { FETCH_WATCH_LIST, FETCH_WATCH_MENU_LIST, SET_ACTIVE_WATCH, WATCH, WATCH_MENU } from "./actionTypes";
import { watchListParser, watchMenuParser } from "./parser";
import { IWatchItem, IWatchListAction, IWatchMenuItem, IWatchState } from "./types";

export function* fetchAllWatchs() {
    try {
        yield put({ type: getSetLoadingType(WATCH), payload: true })
        const isLoggedIn: boolean = yield select((state: IReduxState) => state.user.isLoggedIn);
        const watchMenuList: IWatchMenuItem[] = yield select((state: IReduxState) => state.watchMenu.data);
        const url = isLoggedIn ? (watchListId: number) => `/watchlist/user/${watchListId}/item` : (watchListId: number) => `/watchlist/system/${watchListId}/item`;
        let data: IWatchState = {};
        for (const watchMenuItem of watchMenuList) {
            const watchListDataRes: AxiosResponse<ICommonFetchData> = yield call(API.get, url(watchMenuItem.id));
            const watchListFinalData: IWatchItem[] = watchListParser(watchListDataRes.data.data)
            data[watchMenuItem.id] = watchListFinalData
        }
        yield put({ type: getSetDataType(WATCH), payload: { data: data } })
    } catch (err) {
        const error = err as AxiosError;
        const errorMessage: string = commonErrorHandler(error)
        yield put({ type: getSetErrorType(WATCH), payload: errorMessage });
    } finally {
        yield put({ type: getSetLoadingType(WATCH), payload: false })
    }
}

export function* fetchWatchListAction(action: IWatchListAction) {
    const watchListId = action.payload.id
    const isLoggedIn: boolean = yield select((state: IReduxState) => state.user.isLoggedIn)
    try {

        const url = isLoggedIn ? `/watchlist/user/${watchListId}/item` : `/watchlist/system/${watchListId}/item`
        yield put({ type: getSetLoadingType(WATCH), payload: true })
        const res: AxiosResponse = yield call(API.get, url)
        const data = res.data
        const finalData: IWatchItem[] = watchListParser(data.data)
        const previusData: IWatchState = yield select((state: IReduxState) => state.watch.data)

        yield put({
            type: getSetDataType(WATCH), payload: {
                data: {
                    ...previusData,
                    [watchListId]: finalData
                }
            }
        })
    } catch (err) {
        const error = err as AxiosError;
        const errorMessage: string = commonErrorHandler(error)
        yield put({ type: getSetErrorType(WATCH), payload: errorMessage });
    } finally {
        yield put({ type: getSetLoadingType(WATCH), payload: false })
    }
}

export function* fetchWatchList() {
    yield takeEvery(FETCH_WATCH_LIST, fetchWatchListAction);
}

export function* fetchWatchMenuListAction(action?: any) {
    const isLoggedIn: boolean = yield select((state: IReduxState) => state.user.isLoggedIn);
    try {
        yield put({ type: getSetLoadingType(WATCH_MENU), payload: true })
        let url = isLoggedIn ? `/watchlist/user` : `/watchlist/system`;
        const res: AxiosResponse = yield call(API.get, url)
        const data = res.data;
        let finalData: IWatchMenuItem[] = watchMenuParser(data.data) || [];

        if(isLoggedIn) {
            finalData = finalData.map(item => ({
                ...item,
                removable: true
            }))
        } else {
            finalData = finalData.map(item => ({
                ...item,
                removable: false
            }))
        }
        if(action?.selectMenu) {
            yield put({
                type: SET_ACTIVE_WATCH,
                payload: finalData[0]
            })
        }

        yield put({
            type: getSetDataType(WATCH_MENU),
            payload: {
                data: finalData
            }
        })
    } catch (err) {
        const error = err as AxiosError;
        const errorMessage: string = commonErrorHandler(error)
        yield put({ type: getSetErrorType(WATCH_MENU), payload: errorMessage });
    } finally {
        yield put({ type: getSetLoadingType(WATCH_MENU), payload: false })
    }
}

export function* fetchWatchMenuList() {
    yield takeEvery(FETCH_WATCH_MENU_LIST, fetchWatchMenuListAction)
}