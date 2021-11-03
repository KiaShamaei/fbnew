import { ISymbolNoteAction, ISymbolNoteState } from "redux/types"
import produce from 'immer'
import { Reducer } from "react"
import { CLOSE_SYMBOL_NOTE, OPEN_SYMBOL_NOTE } from "redux/actionTypes/symbolNoteTypes"

const intialState: ISymbolNoteState = {
    isOpen: false
}

const symbolNoteReducer: Reducer<ISymbolNoteState, ISymbolNoteAction> = (state = intialState, { type, payload }: ISymbolNoteAction = {
    type: '',
    payload: {
    }
}) => {
    return produce<ISymbolNoteState>(state, (draf) => {
        switch (type) {
            case OPEN_SYMBOL_NOTE:
                draf.isOpen = true;
                draf.symbol = payload?.symbol
            break;
            case CLOSE_SYMBOL_NOTE:
                draf.isOpen = false;
            break;
        }
    })
}

export default symbolNoteReducer