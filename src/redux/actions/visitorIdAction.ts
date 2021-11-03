import FingerprintJS, { Agent, GetResult } from '@fingerprintjs/fingerprintjs'
import API from 'API';
import { call, put, takeEvery } from 'redux-saga/effects'
import { FETCH_VISITOR_ID, SET_VISITOR_ID } from 'redux/actionTypes/visitorIdTypes';
import { IVisitorIdAction } from 'redux/types';


function* visitorIdAction() {
    // debugger;
    const fpPromise: Agent = yield call(FingerprintJS.load);
    const getResult: GetResult = yield call(fpPromise.get);
    API.defaults.headers['fp'] = getResult.visitorId;
    yield put<IVisitorIdAction>({ type: SET_VISITOR_ID, visitorId: getResult.visitorId });
}

export function* visitorId() {
    yield takeEvery(FETCH_VISITOR_ID, visitorIdAction);
}