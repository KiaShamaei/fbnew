import { fetchSymbolDetailAction } from "pages/Dashboard/panels/SymbolDetail/meta/actions";
import { put, select, takeLatest } from "redux-saga/effects";
import { SET_ACTIVE_SYMBOL_ISIN, SET_ACTIVE_SYMBOL_ISIN_ISIN } from "redux/actionTypes/activeSymbolTypes";
import { IActiveSymbolAction, IReduxState } from "redux/types";

function* setActiveSymbolAction(action: IActiveSymbolAction) {
    const currentIsin: string = yield select((state: IReduxState) => state.activeSymbol.isin)
    if(!action.isin) {
        yield *fetchSymbolDetailAction({ type: SET_ACTIVE_SYMBOL_ISIN_ISIN, activeIsin: action?.isin || '' });
    }
    if(currentIsin !== action.isin) {
        yield put({ type: SET_ACTIVE_SYMBOL_ISIN_ISIN, isin: action?.isin })
        yield *fetchSymbolDetailAction({ activeIsin: action?.isin || '' });
    }
}

export function* setActiveSymbol() {
    yield takeLatest(SET_ACTIVE_SYMBOL_ISIN, setActiveSymbolAction);
}
