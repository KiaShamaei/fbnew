import { useCallback, useState } from "react"
import { IOrderCollapsable, IOrderCollapsableState } from '../meta/types'

function useOrderDetail(): [IOrderCollapsableState | undefined, (order: IOrderCollapsable, mode: 'EDIT' | 'CANCEL', title: string, orderSide: number) => void, () => void] {
    const [orderDetailState, setOrderDetailState] = useState<IOrderCollapsableState>()
    const close: () => void = useCallback(() => {
        setOrderDetailState(undefined)
    }, [])
    const openOrderDetail = useCallback((order: IOrderCollapsable, mode: 'EDIT' | 'CANCEL', title: string, orderSide: number) => {
        setOrderDetailState({
            order,
            mode,
            title,
            orderSide
        })
    }, [])
    return [orderDetailState, openOrderDetail, close]
}

export default useOrderDetail
