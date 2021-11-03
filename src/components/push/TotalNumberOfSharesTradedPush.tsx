import React, { ReactElement } from 'react'
import NumberFormatter from 'components/Formatters/NumberFormatter'
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { useEffect } from 'react'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import { useState } from 'react'
import { closingPriceSignalParser } from 'utils/socketParsers'

interface Props {
    isin: string;
    totalNumberOfSharesTraded: number;
}

function TotalNumberOfSharesTradedPushContent({
    isin,
    totalNumberOfSharesTraded: totalNumberOfSharesTradedInput
}: Props): ReactElement {

    const [totalNumberOfSharesTraded, setTotalNumberOfSharesTraded] = useState(totalNumberOfSharesTradedInput)

    const {
        register,
        unRegister
    } = useTseSocket()

    useEffect(() => {
        const cb = (data: any) => {
            const finalData = closingPriceSignalParser(data)
            setTotalNumberOfSharesTraded(finalData.totalNumberOfSharesTraded)
        }
        if(register) {
            register(isin, cb, SocketKeysEnum.TseInstrumentClosingPriceChangeSignal)
        }
        return () => {
            if(unRegister) {
                unRegister(isin, cb)
            }
        }
    }, [isin, register, unRegister])

    return <NumberFormatter>{totalNumberOfSharesTraded || 0}</NumberFormatter>
}

interface TotalNumberOfSharesTradedPushProps {
    isin: string;
    totalNumberOfSharesTraded: number;
}

function TotalNumberOfSharesTradedPush({
    isin,
    totalNumberOfSharesTraded
}: TotalNumberOfSharesTradedPushProps) {
    if(totalNumberOfSharesTraded !== undefined && totalNumberOfSharesTraded !== null)
        return <TotalNumberOfSharesTradedPushContent
            isin={isin}
            totalNumberOfSharesTraded={totalNumberOfSharesTraded}
        />
    return null;
}

export default TotalNumberOfSharesTradedPush
