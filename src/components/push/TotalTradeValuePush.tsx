import React, { ReactElement } from 'react'
import NumberFormatter from 'components/Formatters/NumberFormatter'
import { useState } from 'react'
import { useEffect } from 'react'
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import { closingPriceSignalParser } from 'utils/socketParsers'

interface Props {
    totalTradeValue: number;
    isin: string;
}

function TotalTradeValuePushContent({
    totalTradeValue: totalTradeValueInput,
    isin
}: Props): ReactElement {
    const [totalTradeValue, setTotalTradeValue] = useState(totalTradeValueInput)
    const { register, unRegister } = useTseSocket()
    useEffect(() => {
        const cb = (data: any) => {
            const closing = closingPriceSignalParser(data)
            setTotalTradeValue(closing.totalTradeValue)
        };
        if (register) {
            register(isin, cb, SocketKeysEnum.TseInstrumentClosingPriceChangeSignal)
        }
        return () => {
            if (unRegister) {
                unRegister(isin, cb);
            }
        }
    }, [isin, register, unRegister])

    return (
        <NumberFormatter>{totalTradeValue || 0}</NumberFormatter>
    )
}

interface TotalTradeValuePushProps {
    isin: string;
    totalTradeValue: number;
}

function TotalTradeValuePush({
    isin,
    totalTradeValue
}: TotalTradeValuePushProps) {
    if (totalTradeValue !== null && totalTradeValue !== undefined)
        return <TotalTradeValuePushContent
            isin={isin}
            totalTradeValue={totalTradeValue}
        />
    return null;
}

export default TotalTradeValuePush
