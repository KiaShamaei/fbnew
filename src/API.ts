import axios, { AxiosResponse } from "axios";
import { SET_USER } from "redux/actionTypes";
import { SET_PURCHASING_POWER } from "redux/actionTypes/purchasingPowerTypes";
import store from "redux/store";

const API = axios.create({
    baseURL: process.env.REACT_APP_BASE_URL,
});

API.interceptors.response.use((value: AxiosResponse) => {
    return value;
}, (error) => {
    const response = error?.response
    if(response?.status === 401) {
        const state: any = store.getState()
        let isLoggedIn;
        if(state) {
            isLoggedIn = state.user?.isLoggedIn;
        }
        if(isLoggedIn) {
            store.dispatch({ type: SET_USER, payload: null })
            store.dispatch({
                type: SET_PURCHASING_POWER,
                payload: {
                    isLoading: false,
                    purchasingPower: undefined
                }
            });
            localStorage.removeItem('accessToken')
        }
        // window.history.pushState('/');
        return Promise.reject(error);
    }
    return Promise.reject(error);
})

export default API;