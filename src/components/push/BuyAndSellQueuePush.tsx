import React, { ReactElement } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { IBidAsk } from 'types/IBidAsk'
import SymbolChangeTableChart from 'components/SymbolChangeTableChart/SymbolChangeTableChart'
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import { bidAskParser } from 'utils/socketParsers'
import { IBidAskTableRow } from 'components/SymbolChangeTableChart/meta/types'


interface Props {
    bidAsk?: IBidAsk[];
    lowerPriceThreshold?: number;
    upperPriceThreshold?: number;
    isin: string;
    className?: string;
    onRowClick?: (orderSide: number, row: IBidAskTableRow) => void;
    onVolumeClick: (orderSide: number, volume: number, price: number) => void;
    onPriceClick: (orderSide: number, volume: number) => void;
}

function BuyAndSellQueuePush({
    bidAsk = [],
    isin,
    lowerPriceThreshold,
    upperPriceThreshold,
    className,
    onRowClick,
    onPriceClick,
    onVolumeClick
}: Props): ReactElement {

    const [bidAskState, setBidAskState] = useState<IBidAsk[]>(bidAsk)
    const {

        queueRegister,
        queueUnRegister

    } = useTseSocket()

    useEffect(() => {
        if (bidAsk) {
            setBidAskState(bidAsk)
        }
    }, [bidAsk])

    useEffect(() => {
        const cb = (data: any[]) => {

            const bidAskData = bidAskParser(data);

            setBidAskState(prev => {
                const copy = [...prev]
                copy[bidAskData.bidAsk.rowPlace - 1] = bidAskData.bidAsk;
                return copy
            })
        }
        if (queueRegister) {
            queueRegister(isin, cb, SocketKeysEnum.TseBidAskChangeSignal)
        }
        return () => {
            if (queueUnRegister) {
                queueUnRegister(isin, cb)
            }
        }
    }, [bidAsk, isin, queueRegister, queueUnRegister])

    return (
        <SymbolChangeTableChart
            bidAsk={bidAskState}
            isin={isin}
            upperPriceThreshold={upperPriceThreshold}
            lowerPriceThreshold={lowerPriceThreshold}
            className={className}
            onRowClick={onRowClick}
            onVolumeClick={onVolumeClick}
            onPriceClick={onPriceClick}
        />
    )
}

export default BuyAndSellQueuePush
