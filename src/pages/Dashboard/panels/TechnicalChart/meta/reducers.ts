import { SET_ACTIVE_TECHNICAL_TAB } from "./actionTypes";
import { IActiveTechnicalTabAction, IActiveTechnicalTabState } from "./type";

export function technicalTabsReducer(state: IActiveTechnicalTabState = {
    active: 1
}, action: IActiveTechnicalTabAction): IActiveTechnicalTabState {
    switch (action.type) {
        case SET_ACTIVE_TECHNICAL_TAB:
            return {
                ...state,
                active: action.active
            }
        default:
            return state;
    }
}