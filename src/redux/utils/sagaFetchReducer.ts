import produce from "immer"
import { Reducer } from "react"
import { IFetchDataAction, IFetchState } from "redux/types"

const initialState: IFetchState = {
    hasEnd: false
}

export const createSagaFetchReducer: (name: string) => Reducer<IFetchState, IFetchDataAction> = (name: string) => (state: IFetchState = initialState, { type, payload, hasEnd }: IFetchDataAction) => {
    return produce<IFetchState>(state, (draft) => {
        switch (type) {
            case `SET_${name}_LOADING`:
                draft.error = undefined;
                draft.isLoading = payload;
                break;
            case `SET_${name}_DATA`:
                draft.data = payload.data;
                draft.hasEnd = payload.hasEnd;
                break;
            case `SET_${name}_ERROR`:
                draft.error = payload;
                break;
            default:
                return;
        }
    })
}
