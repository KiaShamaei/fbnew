import NumberViewer from 'components/NumberViewer/NumberViewer'
import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import InfoMarker from './InfoMarker'
import PurchasingPowerList from './PurchasingPowerDropdown'
import InlineLoading from 'components/Loading/InlineLoading'
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { useEffect } from 'react'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import { useState } from 'react'
import { IPurchasingPower } from 'types/IPurchasingPower'
import { omsAccountStateChangeSignalParser } from 'utils/socketParsers'

function PurchasingPower(): ReactElement | null {
    const {
        isLoading,
        purchasingPower
    } = useSelector((state: IReduxState) => state.purchasingPower)

    if (isLoading)
        return <InlineLoading className="purchasing-power-container" />

    if (!purchasingPower)
        return null
    return (
        <PurchasingPowerContent
            purchasingPower={purchasingPower}
        />
    )
}

interface PurchasingPowerContentProps {
    purchasingPower: IPurchasingPower
}

function PurchasingPowerContent({
    purchasingPower
}: PurchasingPowerContentProps) {

    const { registerPublicTse } = useTseSocket()

    const [purchasingPowerState, setPurchasingPowerState] = useState<IPurchasingPower>(purchasingPower)
    useEffect(() => {
        if (registerPublicTse)
            registerPublicTse((data: any[]) => {
                const omsAccount = omsAccountStateChangeSignalParser(data)
                setPurchasingPowerState({
                    blockedValue: omsAccount.blokedValue,
                    buyingPower: omsAccount.buyingPower,
                    creditRemain: omsAccount.creditMoneyRemain,
                    financialRemain: omsAccount.withdrawableMoneyRemain,
                    portfolio: omsAccount.nonWithdrawableMoneyRemain,
                    purchaseUpperBound: omsAccount.nonWithdrawableMoneyRemain

                })
            }, SocketKeysEnum.OmsAccountStateChangeSignal);
    }, [registerPublicTse])

    return <div className="d-flex purchasing-power-container mr-1">
        <InfoMarker dropdownClassName="purchasing-power">
            <div className="p-2">
                <PurchasingPowerList
                    portfolio={purchasingPowerState.portfolio}
                    buyingPower={purchasingPowerState.buyingPower}
                    creditRemain={purchasingPowerState.creditRemain}
                    financialRemain={purchasingPowerState.financialRemain}
                    purchaseUpperBound={purchasingPowerState.purchaseUpperBound}
                    blockedValue={purchasingPowerState.blockedValue}
                    percent={purchasingPowerState.percent}
                    profitLoss={purchasingPowerState.profitLoss}
                    credit={purchasingPowerState.credit}
                />
            </div>
        </InfoMarker>
        <FormattedMessage
            id="purchasing-power"
            defaultMessage="purchasing power"
        />
        {':'}
        <NumberViewer className="mr-1" value={purchasingPowerState.buyingPower || 0}>
            {(purchasingPowerState.buyingPower || 0).toLocaleString()}
        </NumberViewer>
    </div>
}

export default PurchasingPower
