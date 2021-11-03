import { createContext } from 'react'
import { ISymbolDetailContextProps } from '../meta/types'

const noop = () => {};

export const SymbolDetailContext = createContext<ISymbolDetailContextProps>({
    close: noop,
    backToIndustry: noop,
    openIndustry: noop,
    openSymbolList: noop,
    searchValue: '',
    setSearchValue: noop,
    isIndustryOpen: false,
    isSymbolListOpen: false,
    selectedSymbolGroup: '',
    finalSearchValue: '',
    closeTransactionDialog: noop,
    toggleTransaction: noop,
    onIndustryClick: noop,
    transactionDialog: {
        isOpen: false,
        x: 0,
        y: 0,
    }
})
