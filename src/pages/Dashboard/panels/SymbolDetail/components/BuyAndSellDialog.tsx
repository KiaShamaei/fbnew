import React from 'react'
import SymbolBuyAndSell from 'components/SymbolBuyAndSell/SymbolBuyAndSell'
import { useContext } from 'react'
import { SymbolDetailContext } from '../contexts/SymbolDetailContext'
import { memo } from 'react'
import { IDialogState } from 'components/Dialog/IDialogState'
import { IDialogStatePayload, ToggleTransactionType } from '../meta/types'

interface Props {
    transactionDialog: IDialogState<IDialogStatePayload>,
    toggleTransaction: ToggleTransactionType;
    closeTransactionDialog: () => void;
    isin?: string;
}

const BuyAndSellDialogContainerMemo = memo(({
    closeTransactionDialog,
    toggleTransaction,
    transactionDialog,
    isin
}: Props) => {
    if (!transactionDialog.isOpen)
        return null;
    return (
        <SymbolBuyAndSell
            isin={isin}
            defaultMode={transactionDialog.payload?.mode}
            defaultX={1}
            defaultY={1}
            close={closeTransactionDialog}
        />
    )
})

interface BuyAndSellDialogContainerProps {
    isin?: string
}

function BuyAndSellDialogContainer({
    isin
}: BuyAndSellDialogContainerProps) {
    const { toggleTransaction, transactionDialog, closeTransactionDialog } = useContext(SymbolDetailContext)
    return <BuyAndSellDialogContainerMemo
        isin={transactionDialog.payload?.isin}
        closeTransactionDialog={closeTransactionDialog}
        transactionDialog={transactionDialog}
        toggleTransaction={toggleTransaction}
    />
}

export default BuyAndSellDialogContainer
