import { call, put, takeLatest } from "redux-saga/effects";
import { endpoints } from "appConstants";
import API from "API";
import { GET_SERVER_TIME, FETCH_SERVER_TIME} from "./timeActionTypes"
import { AxiosResponse } from "axios";


export function* getServerTime() {
  const response: AxiosResponse = yield call(API.get, endpoints.time)
  if (response.data)
    yield put({type: GET_SERVER_TIME, payload: {...response.data.data}});
}



export function* fetchServerTime() {
  yield takeLatest(FETCH_SERVER_TIME, getServerTime)
}


