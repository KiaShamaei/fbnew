import API from "API";
import { AxiosResponse } from "axios";
import moment, { Moment } from "jalali-moment";
import { call, put, takeLatest } from "redux-saga/effects";
import { FETCH_TIME_CALENDER, SET_TIME_CALENDER, SET_TIME_CALENDER_LOADING } from "redux/actionTypes/timeCalenderTypes";
import { ITimeCalenderAction, ITimeCalenderResponse } from "redux/types";
import { ICommonFetchData } from "types/ICommonFetchData";

function* timeCalenderAction() {
    try {
        yield put<ITimeCalenderAction>({ type: SET_TIME_CALENDER_LOADING, isLoading: true })
        const response: AxiosResponse<ICommonFetchData<ITimeCalenderResponse>> = yield call(API.get, `/market/time-calendar`);
        const data: ITimeCalenderResponse = response.data?.data;
        const currentTime: Moment = moment(data.currentTime);
        const tse = data.tse;
        yield put<ITimeCalenderAction>({ type: SET_TIME_CALENDER,
            currentTime,
            tse
        })
    } catch(err) {
        yield put<ITimeCalenderAction>({ type: SET_TIME_CALENDER_LOADING, isLoading: false })
    }
}

export function* timeCalender() {
    yield takeLatest(FETCH_TIME_CALENDER, timeCalenderAction);
}