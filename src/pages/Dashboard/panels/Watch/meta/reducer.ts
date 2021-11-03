import produce from "immer";
import { IFetchState, IRegularAction } from "redux/types";
import { createSagaFetchReducer } from "redux/utils/sagaFetchReducer";
import { getSetDataType } from "redux/utils/sagaTypeGetter";
import {
    WATCH,
    SET_ACTIVE_WATCH,
    WATCH_MENU,
    REMOVE_WATCH_ITEM
} from './actionTypes'
import { IWatchMenuItem, IWatchMenuState, IWatchState } from "./types";

const initialState: IFetchState = {

}


export const watchReducer = (state = initialState, { type, payload }: IRegularAction) => {
    return produce<IFetchState<IWatchState>>(state, (draft: any) => {
        switch(type) {
            default:
                return createSagaFetchReducer(WATCH)(state, { type, payload })
        }    
    })
}

const initailWatchMenuReducer: IWatchMenuState<IWatchMenuItem[]> = {

} 

export const watchMenuReducer = (state = initailWatchMenuReducer, { type, payload }: IRegularAction) => {
    return produce<IWatchMenuState<IWatchMenuItem[]>>(state, (draft: any) => {
        switch(type) {
            case getSetDataType(WATCH_MENU): {
                const { data } = payload as { data: IWatchMenuItem[] };
                draft.data = data;
                return;
            }
            case REMOVE_WATCH_ITEM: {
                const isin = payload;
                delete draft.data[isin];
                return;
            }
            case SET_ACTIVE_WATCH: {
                const activeWatchMenu: IWatchMenuItem = payload;
                draft.activeWatchMenu = activeWatchMenu
                return;
            }
            default:
                return createSagaFetchReducer(WATCH_MENU)(state, { type, payload })
        }    
    })
}
