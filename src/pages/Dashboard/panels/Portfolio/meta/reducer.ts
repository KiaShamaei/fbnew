import { IFetchState, IRegularAction } from "redux/types";
import { createSagaFetchReducer } from "redux/utils/sagaFetchReducer";
import {
    PORTFOLIO, PORTFOLIO_CLEAR,
} from './actionTypes'

const initialState: IFetchState = {
    data: []
}

export const portfolioReducer = (state = initialState, { type, payload }: IRegularAction) => {
    switch (type) {
        case PORTFOLIO_CLEAR: {
            return {
                ...state,
                hasEnd: false,
                data: []
            }
        }
        default: return createSagaFetchReducer(PORTFOLIO)(state, { type, payload })
    }
}
