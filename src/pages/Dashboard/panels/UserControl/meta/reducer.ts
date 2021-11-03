import { USER_CONTROL_SET_ACTIVE_USER_CONTROL_TAB, USER_CONTROL_ERROR, USER_CONTROL_LOADING } from "./actionTypes";
import { IUserControlAction, IUserControlState } from "./types";

export function userControlReducer(state: IUserControlState = {}, { payload, type }: IUserControlAction ): IUserControlState {
    switch(type) {
        case USER_CONTROL_LOADING:
            return { ...state, isLoading: payload }
        case USER_CONTROL_ERROR:
            return { ...state, error: payload }
        case USER_CONTROL_SET_ACTIVE_USER_CONTROL_TAB:
            return { ...state, activeTab: payload };
        default:
            return state;
    }
}