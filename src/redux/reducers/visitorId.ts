import { Reducer } from "react"
import { SET_VISITOR_ID } from "redux/actionTypes/visitorIdTypes"
import { IVisitorIdAction, IVisitorIdState } from "redux/types"

const initialState: IVisitorIdState = {

}

const reducer: Reducer<IVisitorIdState, IVisitorIdAction> = (state = initialState, { type, visitorId }) => {
    switch (type) {
        case SET_VISITOR_ID:
            return {
                visitorId
            };
        default:
            return state
    }
}


export default reducer