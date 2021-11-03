import { call, put, select, takeLatest } from "redux-saga/effects";
import API from "../../../../../API";
import { AxiosResponse } from "axios";
import { FETCH_EFFECTIVE_SYMBOLS, FETCH_EFFECTIVE_SYMBOLS_GET } from "./actionTypes";
import { effectiveSymbolsParserImapact, effectiveSymbolsParserIpo } from "./Parser/parser";
import { IReduxState } from "redux/types";
import moment from "jalali-moment";
import { calCulateTime } from "utils/calCulateTIme";

function* getEffectives() {
    const responseImpact: AxiosResponse = yield call(API.get, '/market/impact/1')
    const parsed = effectiveSymbolsParserImapact(responseImpact.data.data)
    yield put({
        type: FETCH_EFFECTIVE_SYMBOLS_GET,
        payload: { effective: parsed }
    })
}

export function* getEffectiveSymbols() {
    try {
        const isLoggedIn: boolean = yield select((state: IReduxState) => state.user?.isLoggedIn);
        if (isLoggedIn === true) {
            const response: AxiosResponse = yield call(API.get, '/instrument/ipo');
            const data = response.data.data;
            if (data && data.length > 0) {
                
                const parsedIpo = effectiveSymbolsParserIpo(response.data.data)
                let serverTime: string = yield select((sta: IReduxState) => +sta.serverTime.time);                
                
                const currentDate = moment(calCulateTime(+serverTime))
                const currentTime = currentDate.format('hh:mm')

                const todaysIpo = parsedIpo.filter((item) => {
                    if(moment(item.ipoDate).isSame(currentDate, 'days')) {
                        return true;
                    } 
                    return false;
                })
                if(todaysIpo.length === 0) {
                    yield *getEffectives()
                } else {
                    yield put({
                        type: FETCH_EFFECTIVE_SYMBOLS_GET, payload: {
                            ipo: todaysIpo
                        }
                    })
                }
            } else {
                yield *getEffectives()
            }
        }
        if (isLoggedIn === false) {
            const responseImpact: AxiosResponse = yield call(API.get, '/market/impact/1')
            const parsed = effectiveSymbolsParserImapact(responseImpact.data.data)
            yield put({
                type: FETCH_EFFECTIVE_SYMBOLS_GET,
                payload: { effective: parsed }
            })
        }
    } catch (e) {
    }

}

export function* fetchEffectiveSymbols(): Generator<any, any, any> {
    yield takeLatest(FETCH_EFFECTIVE_SYMBOLS, getEffectiveSymbols);
}