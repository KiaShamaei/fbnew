import API from "API";
import { AxiosResponse } from "axios";
import { purchasingPowerActionParser } from "parsers/purchasingPowerActionParser";
import { call, put, takeLatest, select } from "redux-saga/effects";
import { FETCH_PURCHASING_POWER, SET_PURCHASING_POWER, SET_PURCHASING_POWER_LOADING } from "redux/actionTypes/purchasingPowerTypes";
import { IPurchasingPowerAction, IReduxState } from "redux/types";
import { IPurchasingPower } from "types/IPurchasingPower";

export function* purchasingPowerAction(): Generator<any, any, any> {
    try {
        const isLoggenIn = yield select((state: IReduxState) => state.user.isLoggedIn)
        if(!isLoggenIn) {
            yield put<IPurchasingPowerAction>({
                type: SET_PURCHASING_POWER,
                payload: {
                    isLoading: false,
                    purchasingPower: undefined
                }
            });
            return;
        }
        yield put<IPurchasingPowerAction>({
            type: SET_PURCHASING_POWER_LOADING,
            payload: {
                isLoading: true
            }
        });
        const res: AxiosResponse = yield call(API.get, '/customer/buying-power');
        const result = res.data;
        const data: IPurchasingPower = purchasingPowerActionParser(result?.data || {});

        yield put<IPurchasingPowerAction>({
            type: SET_PURCHASING_POWER,
            payload: {
                isLoading: false,
                purchasingPower: data
            }
        });
    } catch (err) {
        console.error(err)
        yield put<IPurchasingPowerAction>({
            type: SET_PURCHASING_POWER_LOADING,
            payload: {
                isLoading: false
            }
        });
    }
}

export function* purchasingPower() {
    yield takeLatest(FETCH_PURCHASING_POWER, purchasingPowerAction);
}