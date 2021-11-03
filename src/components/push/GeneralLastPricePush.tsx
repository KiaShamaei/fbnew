import AnimatedNumber from 'components/Animations/AnimatedNumber/AnimatedNumber';
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager';
import { SocketKeysEnum } from 'enums/SocketKeysEnum';
import React, { ReactElement } from 'react'
import { useEffect } from 'react';
import { useRef } from 'react'
import { useState } from 'react'
import NumberViewer from 'components/NumberViewer/NumberViewer'

interface Props {
    lastPrice?: number;
    referencePriceVariationPercentage?: number;
    isin: string;
}

function GeneralLastPricePush({
    lastPrice: defaultLastPrice,
    referencePriceVariationPercentage,
    isin
}: Props): ReactElement {
    const [lastPrice, setLastPrice] = useState<{
        percent?: number;
        price?: number;
    }>({
        percent: referencePriceVariationPercentage,
        price: defaultLastPrice
    })
    const isFirst = useRef<boolean>(true);
    const { register, unRegister } = useTseSocket()
    useEffect(() => {
        if (isFirst.current === true) {
            isFirst.current = false;
            return;
        }
        if (defaultLastPrice) {
            setLastPrice({
                percent: referencePriceVariationPercentage,
                price: defaultLastPrice
            })
        }
    }, [defaultLastPrice, referencePriceVariationPercentage])

    useEffect(() => {
        const cb = (data: any[]) => {
            const price = data[1]
            const pricePercent = data[3]
            setLastPrice({
                percent: pricePercent,
                price: price
            })
        }
        if (register) {
            register(isin, cb, SocketKeysEnum.TseInstrumentTradePriceChangeSignal)
        }

        return () => {
            if (unRegister) {
                unRegister(isin, cb)
            }
        }
    }, [register, isin, unRegister])

    return (
        <NumberViewer value={lastPrice.percent ?? 0}>
            <AnimatedNumber value={lastPrice.price?.toLocaleString() ?? ''} width={10} height={25} />
        </NumberViewer>
    )
}

export default GeneralLastPricePush
