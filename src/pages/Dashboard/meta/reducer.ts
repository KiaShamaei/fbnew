import { Reducer } from "redux";
import { SET_ACTIVE_PANEL_RIGHT_BOTTOM } from "./actionTypes";
import { IDashboardAction, IDashboardState } from "./types";

const dashboardReducer: Reducer<IDashboardState, IDashboardAction> = (state = {
    activePanelRightBottom: 'NEWS',
}, { type, payload, params }) => {
    switch (type) {
        case SET_ACTIVE_PANEL_RIGHT_BOTTOM:
            return { ...state, activePanelRightBottom: payload, params };
        default:
            return state;
    }
}

export default dashboardReducer;