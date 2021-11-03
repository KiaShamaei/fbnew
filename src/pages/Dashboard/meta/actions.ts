import { SET_ACTIVE_PANEL_RIGHT_BOTTOM } from "./actionTypes";

import { PanelRightBottomType } from "./types";

export function setActivePanelRightBottom(payload: PanelRightBottomType, params?: any) {
    return { type: SET_ACTIVE_PANEL_RIGHT_BOTTOM, payload, params }
}
