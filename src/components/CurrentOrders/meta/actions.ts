import API from "API";
import { call, put, select, takeLatest } from "redux-saga/effects";
import { AxiosResponse } from "axios";
import { endpoints } from "appConstants";
import { FETCH_CURRNET_ORDERS } from "./actionType";
import {
  getSetLoadingType,
  getSetDataType,
  getSetErrorType,
} from "redux/utils/sagaTypeGetter";
import { gatDataOrder, gatDataPreOrder } from "./parser";

export function* fetchCurrentOrders() {
  try {
      yield put({
        type: getSetLoadingType(FETCH_CURRNET_ORDERS),
        payload: { isLoading: true },
      });
      const responsePreOrder: AxiosResponse = yield call(
        API.get,
        endpoints.preOrder.getAllPreOrder
      );
      const responseOrder: AxiosResponse = yield call(
        API.get,
        endpoints.order.getAllOrder
      );
      const preOrderData = gatDataPreOrder(responsePreOrder?.data?.data);
      const orderData = gatDataOrder(responseOrder?.data?.data);
      const finalData = [...preOrderData, ...orderData];
      yield put({
        type: getSetDataType(FETCH_CURRNET_ORDERS),
        payload: { data: finalData, isLoading: false },
      });
  } catch (err) {
    yield put({
      type: getSetErrorType(FETCH_CURRNET_ORDERS),
      payload: { isLoading: false },
    });
  }
}

export function* fetchCurrentOrder() {
  yield takeLatest(FETCH_CURRNET_ORDERS, fetchCurrentOrders);
}
