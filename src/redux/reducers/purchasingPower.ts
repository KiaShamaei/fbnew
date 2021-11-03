import { IPurchasingPowerAction, IPurchasingPowerState } from "redux/types"
import produce from 'immer'
import { Reducer } from "react"
import { SET_PURCHASING_POWER, SET_PURCHASING_POWER_LOADING } from "redux/actionTypes/purchasingPowerTypes"

const intialState: IPurchasingPowerState = {
}

const reducer: Reducer<IPurchasingPowerState, IPurchasingPowerAction> = (state = intialState, { type, payload }: IPurchasingPowerAction = {
    type: '',
    payload: {
    }
}) => {
    return produce<IPurchasingPowerState>(state, (draf) => {
        switch (type) {
            case SET_PURCHASING_POWER:
                draf.purchasingPower = payload.purchasingPower;
                draf.isLoading = payload.isLoading
            break;
            case SET_PURCHASING_POWER_LOADING:
                draf.isLoading = payload.isLoading
                draf.purchasingPower = {  }
            break;
        }
    })
}

export default reducer