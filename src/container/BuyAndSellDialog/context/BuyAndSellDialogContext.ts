import { createContext } from 'react'
import { IBuyAndSellDialogContextProps } from '../meta/types'

export const BuyAndSellDialogContext = createContext<IBuyAndSellDialogContextProps>({
    symbolList: [],
    openDialog: () => { },
    closeDialog: () => { },
    setIsChainActive: () => { },
    setFreeze: () => { }
})