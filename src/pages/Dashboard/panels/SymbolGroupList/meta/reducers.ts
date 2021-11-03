import { IFetchState, IRegularAction } from "redux/types";
import { createSagaFetchReducer } from "redux/utils/sagaFetchReducer";
import {
    SYMBOL_GROUP_LIST
} from './actionTypes'

const initialState: IFetchState = {

}


export const symbolGroupReducer = (state = initialState, { type, payload }: IRegularAction) => {
    return createSagaFetchReducer(SYMBOL_GROUP_LIST)(state, { type, payload })
}
