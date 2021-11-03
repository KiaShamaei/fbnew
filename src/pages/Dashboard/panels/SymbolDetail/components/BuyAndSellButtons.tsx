import React from 'react'
import Button from 'components/Button/Button'
import BuyIcon from 'components/Icons/BuyIcon'
import SellIcon from 'components/Icons/SellIcon'
import { ToggleTransactionType } from '../meta/types'
import { memo } from 'react'
import { FormattedMessage } from 'react-intl'
import { useOrder } from 'container/BuyAndSellDialog/BuyAndSellDialogProvider'

interface Props {
    toggleTransaction: ToggleTransactionType;
    isin?: string;
}

const BuyAndSellButtonsMemo = memo(({
    toggleTransaction,
    isin = ''
}: Props) => {
    return (
        <div className="sell-and-buy">
            <div className="button-container buy">
                <Button
                    onClick={(e) => toggleTransaction(e, { isin: isin ,mode: 'BUY' })}
                    className="d-flex justify-content-center"
                    color="green">
                    <BuyIcon style={{ fill: '#fff' , height:"25px" }} />
                    <span className="d-block mr-2" style={{ color: 'white',fontSize:"15px",paddingTop:"2px" }}>
                        <FormattedMessage id="buy" defaultMessage="buy" />
                    </span>
                </Button>
            </div>
            <div className="button-container sell">
                <Button 
                    onClick={(e) => toggleTransaction(e, { isin: isin ,mode:'SELL'})}
                    className="d-flex justify-content-center"
                    color="red">
                    <SellIcon style={{ fill: '#fff', height:"25px" }} />
                    <span className="d-block mt-1 mr-2" style={{ color: 'white',fontSize:"15px" }}>
                        <FormattedMessage id="sell" defaultMessage="sell" />
                    </span>
                </Button>
            </div>
        </div>
    )
})

interface BuyAndSellButtonsProps {
    isin?: string;
}

function BuyAndSellButtons({
    isin
}: BuyAndSellButtonsProps) {
    const {
        openDialog,
    } = useOrder()
    return <BuyAndSellButtonsMemo 
        isin={isin}
        toggleTransaction={(e, payload) => {
            openDialog(payload?.isin ?? '', payload?.mode)
        }}
    />
}

export default BuyAndSellButtons
