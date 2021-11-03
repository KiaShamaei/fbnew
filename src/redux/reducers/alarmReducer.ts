import { ISymbolNoteAction, ISymbolNoteState } from "redux/types"
import produce from 'immer'
import { Reducer } from "react"
import { CLOSE_ALARM, OPEN_ALARM } from "redux/actionTypes/alarmTypes"

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
            case OPEN_ALARM:
                draf.isOpen = true;
                draf.symbol = payload?.symbol
            break;
            case CLOSE_ALARM:
                draf.isOpen = false;
            break;
        }
    })
}

export default symbolNoteReducer