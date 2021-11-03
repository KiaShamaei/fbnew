import React, { ReactElement } from 'react'
import Tooltip from 'components/Tooltip/Tooltip'
import { useState } from 'react'
import { useEffect } from 'react'
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import { instrumentTradeChangeSignalParser, omsTradeSignalParser } from 'utils/socketParsers'
import moment from 'jalali-moment'

interface Props {
    lastTradeDate: string;
    isin: string;
}

function LastTradeDatePushContent({
    isin,
    lastTradeDate: lastTradeDateInput
}: Props): ReactElement {

    const [lastTradeDate, setLastTradeDate] = useState(lastTradeDateInput)

    const {
        register,
        unRegister
    } = useTseSocket()

    useEffect(() => {
        const cb = (data: any) => {
            const tradeSignal = instrumentTradeChangeSignalParser(data)
            try {
                const date = tradeSignal.lastTradeDate.slice(0, 8)
                const time = tradeSignal.lastTradeDate.slice(8)
                const dateSlices = [];
                const timeSlice = [];
                dateSlices.push(date.slice(0, 4))
                dateSlices.push(date.slice(4, 6))
                dateSlices.push(date.slice(6, 8))
                for(let i=0; i<time.length;i+=2) {
                    timeSlice.push(time.slice(i, i + 2))
                }
                const finalDate = dateSlices.join('/')
                const finalTime = timeSlice.join(':')
                const finalDateForamtted = moment(finalDate).format('jYYYY/jMM/jDD')
                setLastTradeDate(`${finalDateForamtted} ${finalTime}`);
            } catch {

            }
        }
        if(register) {
            register(isin, cb, SocketKeysEnum.TseInstrumentTradePriceChangeSignal)
        }
        return () => {
            if(unRegister) {
                unRegister(isin, cb)
            }
        }
    }, [isin, register, unRegister])

    const arr = (lastTradeDate || '').split(' ')
    return <Tooltip tooltipText={arr[0]} id="lastTradeDate">
        {(lastTradeDate || '').split(' ')[1]}
    </Tooltip>
}

interface LastTradeDatePushProps {
    isin: string;
    lastTradeDate: string;
}

function LastTradeDatePush({
    isin,
    lastTradeDate
}: LastTradeDatePushProps) {
    if (lastTradeDate !== null && lastTradeDate !== undefined)
        return <LastTradeDatePushContent
            isin={isin}
            lastTradeDate={lastTradeDate}
        />
    return null;
}

export default LastTradeDatePush
