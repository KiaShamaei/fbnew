import { Reducer } from "react"
import { SET_ACTIVE_SYMBOL_ISIN_ISIN } from "redux/actionTypes/activeSymbolTypes"
import { IActiveSymbol, IActiveSymbolAction } from "redux/types"

const initialState: IActiveSymbol = {

}

const reducer: Reducer<IActiveSymbol, IActiveSymbolAction> = (state = initialState, { type, isin }) => {
    switch (type) {
        case SET_ACTIVE_SYMBOL_ISIN_ISIN:
            return {
                isin
            };
        default:
            return state
    }
}


export default reducer