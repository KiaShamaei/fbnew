import produce from "immer";
import { SET_TIME_CALENDER, SET_TIME_CALENDER_LOADING } from "redux/actionTypes/timeCalenderTypes";
import { ITimeCalenderAction, ITimeCalenderState } from "redux/types";

const intialState: ITimeCalenderState = {
    isLoading: false
} 

export function timeCalenderReducer(state: ITimeCalenderState = intialState, action: ITimeCalenderAction): ITimeCalenderState {
    return produce(state, (draft) => {
        switch(action.type) {
            case SET_TIME_CALENDER:
                if(action.currentTime)
                    draft.currentTime = action.currentTime ;
                draft.tse = action.tse;
                draft.isLoading = false;
                
            break;
            case SET_TIME_CALENDER_LOADING:
                draft.isLoading = action.isLoading ?? false;
            break;
        }
    });
}