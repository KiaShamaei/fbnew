import { call, put, select } from "@redux-saga/core/effects";
import API from "API";
import { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from "axios";
import { IFetchAction, IFetchDataAction, IReduxState } from "redux/types";
import { commonErrorHandler } from "utils/errorHandler";
import { getSetDataType, getSetErrorType, getSetLoadingType } from "./sagaTypeGetter";

export function sagaFetch(name: string,
    url: string,
    config?: AxiosRequestConfig,
    selector?: (state: IReduxState) => any,
    hasCache: boolean = false,
    api?: AxiosInstance,
    urlCreator?: (url: string, urlParams: any) => string,
    dataParser?: (data: any) => any) {
    const apiFinal = API
    const fixedUrl = url
    return function* (action: IFetchAction) {
        const params = action.params;
        const urlParams = action.urlParams;
        url = urlCreator ? urlCreator(fixedUrl, urlParams) : url;
        let savedData: any[] = [];
        if(selector) {
            savedData = yield select(selector)
        }
        if(hasCache && ((Array.isArray(savedData) && savedData.length > 0) || savedData)) {
            return
        }
        yield put<IFetchDataAction>({ type: getSetLoadingType(name), payload: true });
        try {
            const res: AxiosResponse = yield call(apiFinal, url, { ...config, params });
            const data: any = dataParser ? dataParser(res.data) : res.data;
            const hasEnd = JSON.parse(res.headers['x-hasend'] || 'false');
            
            yield put<IFetchDataAction>({ type: getSetDataType(name), payload: { hasEnd, data: (savedData || []).concat(data) },  });
        } catch (err: any) {
            const error = err as AxiosError;
            const errorMessage: string = commonErrorHandler(error)
            yield put<IFetchDataAction>({ type: getSetErrorType(name), payload: errorMessage });
        } finally {
            yield put<IFetchDataAction>({ type: getSetLoadingType(name), payload: false });
        }
    }

}