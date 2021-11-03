import React from 'react'
import { useCallback } from 'react';
import { useState } from 'react'
import { BuyAndSellDialogContext } from './context/BuyAndSellDialogContext'
import SymbolBuyAndSell from 'components/SymbolBuyAndSell/SymbolBuyAndSell'
import { ISymbolToOrder } from './meta/types';
import { useContext } from 'react';

interface Props {

}

const BuyAndSellDialogProvider: React.FC<Props> = ({
    children
}) => {
    const [symbolList, setSymbolList] = useState<ISymbolToOrder[]>([]);
    const [isChainActive, setIsChainActive] = useState<boolean>(false)
    const [freeze, setFreeze] = useState(false)


    const openDialog = useCallback((isin: string, defaultMode: 'BUY' | 'SELL' = 'BUY', initialFormValues?: any) => {
        /*const symbolToEditIndex = symbolList.findIndex(symbol => symbol?.isin === isin)
        if(symbolToEditIndex !== -1) {
            setSymbolList(prev => {
                const symbolListCopy = [...prev]
                const itemToEdit = symbolListCopy[symbolToEditIndex]
                if(itemToEdit) {
                    itemToEdit.defaultMode = defaultMode;
                    itemToEdit.initialFormValues = { ...itemToEdit.initialFormValues, ...initialFormValues};
                }
                return symbolListCopy
            })
        } else {*/
        setSymbolList(prev => prev.concat({ id: prev.length + 1, isin, defaultMode, initialFormValues }))
        //}
    }, [])

    const closeDialog = useCallback((id: number) => {
        const itemToRemoveIndex = symbolList.findIndex(item => item?.id === id)
        setFreeze(false)
        setIsChainActive(false)
        if (itemToRemoveIndex !== -1) {
            const copy = [...symbolList]
            copy.splice(itemToRemoveIndex, 1)
            setSymbolList(copy)
        }
    }, [symbolList])

    return (
        <BuyAndSellDialogContext.Provider
            value={{
                symbolList,
                closeDialog,
                openDialog,
                isChainActive,
                setIsChainActive,
                setFreeze,
                freeze
            }}
        >
            {children}
            {symbolList.map((symbol, index) => <SymbolBuyAndSell
                key={symbol.id}
                isin={symbol.isin}
                defaultX={(window.innerWidth / 2) - 400 + index * 40}
                defaultY={(window.innerHeight / 2) - 250 + index * 40}
                close={() => closeDialog(symbol.id)}
                defaultMode={symbol?.defaultMode}
                initialFormValues={symbol?.initialFormValues}
            />)}
        </BuyAndSellDialogContext.Provider>
    )
}

export function useOrder() {
    const { closeDialog, symbolList, openDialog } = useContext(BuyAndSellDialogContext)
    return { closeDialog, symbolList, openDialog }
}

export default BuyAndSellDialogProvider
