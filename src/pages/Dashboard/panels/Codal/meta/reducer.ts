import { createSagaFetchReducer } from "redux/utils/sagaFetchReducer";
import { CODAL, CODAL_FILTERS } from "./actionTypes";
import { ICodalState } from "./type";

const initialState: ICodalState = {
    data: []
}

const reducer = (state: ICodalState = initialState, action: { type: string, payload: any }) => {
    switch(action.type) {
        case CODAL_FILTERS:
            return {
                ...state,
                filters: action.payload
            }
        default: return createSagaFetchReducer(CODAL)(state, action);
    }
}

export default reducer;