import { Reducer } from "react"
import { SET_ACTIVE_SECTOR } from "redux/actionTypes/activeSectorTypes"
import { IActiveSector, IActiveSectorAction } from "redux/types"

const initialState: IActiveSector = {

}

const reducer: Reducer<IActiveSector, IActiveSectorAction> = (state = initialState, { type, sectorCode }) => {
    switch (type) {
        case SET_ACTIVE_SECTOR:
            return {
                sectorCode
            };
        default:
            return state
    }
}


export default reducer