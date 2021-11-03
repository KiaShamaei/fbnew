import API from "API";
import { AxiosResponse } from "axios";
import { call, put, takeEvery, select } from "redux-saga/effects";
import { getSetDataType, getSetLoadingType } from "redux/utils/sagaTypeGetter";
import { PORTFOLIO } from "./actionTypes";
import { portflioParser } from "./parser";
import { FETCH_PORTFOLIO_LIST } from "./actionTypes";
import { IActiveSymbolAction, IReduxState } from "redux/types";
import { IPortfolioItem } from "components/PortfolioWatchTable/meta/type";
import { SET_ACTIVE_SYMBOL_ISIN } from "redux/actionTypes/activeSymbolTypes";

export function* fetchPortfolioListAction(action?: { select: boolean, clearIfNotEmpty?: boolean, params?: { [prop: string]: any } }) {
    try {
        if (action?.clearIfNotEmpty) {
            yield put({
                type: getSetDataType(PORTFOLIO), payload: {
                    data: [],
                    hasEnd: false,
                    page: 1
                }
            })
        }
        // const isLoading: boolean = yield select((state: IReduxState) => state.portfolio.isLoading)
        // if(isLoading)
        //     return;
        yield put({ type: getSetLoadingType(PORTFOLIO), payload: true })
        const response: AxiosResponse = yield call(API.get, '/watchlist/portfolio/item', { params: action?.params } ?? { limit: 12 });
        const data = response.data
        const portfolioList = portflioParser(data.data);
        const hasSelectActiveSymbol: boolean = yield select((state: IReduxState) => !!state.activeSymbol.isin)
        if(hasSelectActiveSymbol === false) {
            const isin = portfolioList[0].isin
            yield put<IActiveSymbolAction>({ type: SET_ACTIVE_SYMBOL_ISIN, isin })
        }
        let prevData: IPortfolioItem[] | undefined;
        prevData = yield select((state: IReduxState) => state.portfolio.data);
        const hasEnd: boolean = yield select((state: IReduxState) => state?.portfolio?.hasEnd)
        if (prevData) {
            const newData: any[] = action?.clearIfNotEmpty ? portfolioList : !hasEnd ? prevData.concat(portfolioList) : portfolioList;
            yield put({
                type: getSetDataType(PORTFOLIO),
                payload: {
                    data: newData,
                    hasEnd: portfolioList.length < 12,
                    page: action?.params?.page
                }
            })
        }
        yield put({ type: getSetLoadingType(PORTFOLIO), payload: false })
    } catch (err) {
        yield put({ type: getSetLoadingType(PORTFOLIO), payload: false })
        console.error('ERROR', err)
    }
    // finally {
    //     yield put({ type: getSetLoadingType(PORTFOLIO), payload: false })
    // }
}

export function* fetchPortfolioList() {
    yield takeEvery(FETCH_PORTFOLIO_LIST, fetchPortfolioListAction);
}