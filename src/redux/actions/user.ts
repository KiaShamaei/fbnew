import API from 'API'
import { LOCALE_STORAGE_KEYS } from 'appConstants'
import { AxiosResponse } from 'axios'
import { PORTFOLIO } from 'pages/Dashboard/panels/Portfolio/meta/actionTypes'
import { call, put, takeLatest } from 'redux-saga/effects'
import { SET_USER_LOADING, SET_USER, FETCH_USER, LOGOUT } from 'redux/actionTypes'
import { getSetDataType } from 'redux/utils/sagaTypeGetter'
import { getData, removeItem } from 'redux/utils/storage'
import { IUserInfo } from 'types/IUserInfo'
import { purchasingPowerAction } from './purchasingPower'

function* fetchUser(): Generator<any, any, any> {
    yield put({ type: SET_USER_LOADING, payload: true })
    const accessToken: string | null = getData(LOCALE_STORAGE_KEYS.accessToken)
    API.defaults.headers['Authorization'] = `Bearer ${accessToken}`;
    try {
        if (!accessToken) {
            yield put({ type: SET_USER, payload: null })
            return;
        }
        const res: AxiosResponse = yield call(API.get, '/authentication/user-info')
        const user: IUserInfo = res.data?.data;
        if (user) {
            if (accessToken)
                user.accessToken = accessToken;
            yield put({ type: SET_USER, payload: user })
            yield* purchasingPowerAction();
        }
    } catch (err) {
        console.error(err)
        yield put({ type: SET_USER, payload: null })
    }
}

export function* logoutAction() {
    yield put({ type: SET_USER_LOADING, payload: true })
    try {
        yield call(API.post, '/authentication/logout');
        if (removeItem(LOCALE_STORAGE_KEYS.accessToken)) {
            API.defaults.headers['Authorization'] = undefined;
            yield put({ type: SET_USER, payload: null })
            yield put({ type: getSetDataType(PORTFOLIO), payload: { data: [] } })
            yield* purchasingPowerAction();
        }
    } catch (err) {
        yield put({ type: SET_USER_LOADING, payload: false })
    }
}

export function* user() {
    yield takeLatest(FETCH_USER, fetchUser)
    yield takeLatest(LOGOUT, logoutAction);
}