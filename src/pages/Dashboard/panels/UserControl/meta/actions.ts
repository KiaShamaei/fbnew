// import TestAPI from "_API";
import { AxiosError } from "axios";
import { put, select, takeEvery, takeLatest } from "redux-saga/effects";
import { IActiveSymbolAction, IReduxState } from "redux/types";
import { FETCH_USER_CONTROL, USER_BUTTON_REFRESH, USER_CONTROL_ERROR, USER_CONTROL_LOADING, USER_CONTROL_SET_ACTIVE_USER_CONTROL_TAB } from "./actionTypes";
import { commonErrorHandler } from "utils/errorHandler";
import { fetchPortfolioListAction } from "../../Portfolio/meta/actions";
import { fetchAllWatchs, fetchWatchMenuListAction } from "../../Watch/meta/actions";
import { SET_ACTIVE_WATCH } from "../../Watch/meta/actionTypes";
import { IWatchMenuItem, IWatchState } from "../../Watch/meta/types";
import { SET_ACTIVE_SYMBOL_ISIN } from "redux/actionTypes/activeSymbolTypes";
import { PORTFOLIO_CLEAR } from "../../Portfolio/meta/actionTypes";

export function* getWatchList() {
    yield* fetchWatchMenuListAction();
    const watchMenuItems: IWatchMenuItem[] = yield select((state: IReduxState) => state.watchMenu.data)
    let activeMenuItem: IWatchMenuItem = (watchMenuItems ?? [])[0];
    if(activeMenuItem && activeMenuItem.id) {
        yield put({
            type: SET_ACTIVE_WATCH,
            payload: activeMenuItem
        })
    }
    yield* fetchAllWatchs();
    // const data: IWatchState = yield select((state: IReduxState) => state.watch.data)
    // // if(data[activeMenuItem.id] && data[activeMenuItem.id][0] && data[activeMenuItem.id][0].isin) {
    // //     yield put<IActiveSymbolAction>({ type: SET_ACTIVE_SYMBOL_ISIN, isin: data[activeMenuItem.id][0].isin })
    // // }    
}

export function* getWatchListAndPortfolio(): Generator<any, any, any> {
    let hasSymbolSelect = false;
    try {
        yield put({ type: USER_CONTROL_LOADING, payload: true })
        const isUserLoggedIn: boolean = yield select((state: IReduxState) => state.user.isLoggedIn)
        
        if(isUserLoggedIn === null) {
            return;
        }
        if (isUserLoggedIn === true) {
            yield put({ type: USER_CONTROL_SET_ACTIVE_USER_CONTROL_TAB, payload: 'portfolio' })
            // yield put({ type: USER_CONTROL_SET_ACTIVE_USER_CONTROL_TAB, payload: 'watch' })
            yield* getWatchList();
        } else {
            yield put({ type: USER_CONTROL_SET_ACTIVE_USER_CONTROL_TAB, payload: 'watch' })
            yield* getWatchList();
            const data: IWatchState = yield select((state: IReduxState) => state.watch.data)
            let isinToMakeActive;
            try {
                isinToMakeActive = data[Object.keys(data)[0]][0].isin;
            }
            catch(err) {
                isinToMakeActive = 'IRO1FOLD0001';
            }
            yield put<IActiveSymbolAction>({ type: SET_ACTIVE_SYMBOL_ISIN, isin: isinToMakeActive })
        }
        
        yield put({ type: USER_CONTROL_LOADING, payload: false })
    } catch (err) {
        console.error(err)
        const error = err as AxiosError;
        const errorMessage: string = commonErrorHandler(error)
        yield put({ type: USER_CONTROL_ERROR, payload: errorMessage });
    } finally {
        yield put({ type: USER_CONTROL_LOADING, payload: false });
    }
}

export function* refreshPortfolio() {
    yield put({ type: PORTFOLIO_CLEAR })
    yield* fetchPortfolioListAction();
}

export function* fetchWatchListAndPortfolio(): Generator<any, any, any> {
    yield takeEvery(FETCH_USER_CONTROL, getWatchListAndPortfolio);
    yield takeLatest(USER_BUTTON_REFRESH, refreshPortfolio);
}