import React, { ReactElement } from 'react'
import SymbolChangeChart from 'components/SymbolChangeChart/SymbolChangeChart'
import { useEffect } from 'react'
import { useState } from 'react'
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import { instrumentTradeChangeSignalParser } from 'utils/socketParsers'

interface ChartProps {
    yesterdayPrice?: number;
    lowerPriceThreshold?: number;
    upperPriceThreshold?: number;
    lastPrice?: number;
    upperTradePrice?: number;
    lowestTradePrice?: number;
    closingPrice?: number;
}

interface Props extends ChartProps {
    isin: string;
    className?: string;
}

function SymbolChangesPushChart({
    className,
    isin,
    lastPrice,
    lowerPriceThreshold,
    lowestTradePrice,
    upperPriceThreshold,
    upperTradePrice,
    yesterdayPrice,
    closingPrice
}: Props): ReactElement {
    const [state, setState] = useState<ChartProps>({
        lastPrice,
        lowerPriceThreshold,
        lowestTradePrice,
        upperPriceThreshold,
        upperTradePrice,
        yesterdayPrice,
    })
    const {
        register,
        unRegister
    } = useTseSocket()
    useEffect(() => {
        if (lastPrice ||
            lowerPriceThreshold ||
            lowestTradePrice ||
            upperPriceThreshold ||
            upperTradePrice ||
            yesterdayPrice)
            setState({
                lastPrice,
                lowerPriceThreshold,
                lowestTradePrice,
                upperPriceThreshold,
                upperTradePrice,
                yesterdayPrice,
            })
    }, [
        lastPrice,
        lowerPriceThreshold,
        lowestTradePrice,
        upperPriceThreshold,
        upperTradePrice,
        yesterdayPrice
    ])

    useEffect(() => {
        const callback = (data: any) => {
            const instrumentTradeChangeSignal = instrumentTradeChangeSignalParser(data);
            setState((prev) => ({
                ...prev,
                lastPrice: instrumentTradeChangeSignal.lastTradePrice,
                lowestTradePrice: instrumentTradeChangeSignal.lowestTradePrice,
                upperTradePrice: instrumentTradeChangeSignal.highestTradePrice
            }))
        }
        if (register) {
            register(isin, callback, SocketKeysEnum.TseInstrumentTradePriceChangeSignal)
        }
        return () => {
            if (unRegister) {
                unRegister(isin, callback);
            }
        }
    }, [isin, register, unRegister])

    return (
        <SymbolChangeChart
            className={className}
            lastPrice={state.lastPrice}
            lowerPriceThreshold={state.lowerPriceThreshold}
            lowestTradePrice={state.lowestTradePrice}
            upperPriceThreshold={state.upperPriceThreshold}
            upperTradePrice={state.upperTradePrice}
            closingPrice={closingPrice}
            yesterdayPrice={state.yesterdayPrice} />
    )
}


export default SymbolChangesPushChart
