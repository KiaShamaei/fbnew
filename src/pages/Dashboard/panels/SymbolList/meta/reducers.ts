import { IFetchState, IRegularAction } from "redux/types";
import { createSagaFetchReducer } from "redux/utils/sagaFetchReducer";
import {
    SYMBOL_LIST
} from './actionTypes'

const initialState: IFetchState = {

}


export const symbolListReducer = (state = initialState, { type, payload }: IRegularAction) => {
    return createSagaFetchReducer(SYMBOL_LIST)(state, { type, payload })
}
