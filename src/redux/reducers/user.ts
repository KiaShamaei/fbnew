import { SET_USER, SET_USER_LOADING } from "redux/actionTypes"
import { IUserAction, IUserReducerState } from "redux/types"
import produce from 'immer'
import { Reducer } from "react"

const reducer: Reducer<IUserReducerState, IUserAction> = (state: IUserReducerState = { isLoggedIn: null }, { type, payload, loading }: IUserAction = {
    type: '',
    loading: false,
    payload: {}
}) => {
    return produce<IUserReducerState>(state, (draf) => {
        switch (type) {
            case SET_USER_LOADING:
                draf.loading = loading;
                break;
            case SET_USER:
                if (payload)
                    draf.isLoggedIn = true;
                else
                    draf.isLoggedIn = false;
                draf.userInfo = payload;
                draf.loading = false;
                break;
        }
    })
}

export default reducer