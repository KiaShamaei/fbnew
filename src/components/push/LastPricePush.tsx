import React, { ReactElement } from 'react'
import { useEffect } from 'react'
import NumberViewer from 'components/NumberViewer/NumberViewer'
import { useState } from 'react'
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import AnimatedNumber from 'components/Animations/AnimatedNumber/AnimatedNumber'

const PRICE_DATA_MAP = {
    InstrumentIsin: 0,
    LastTradePrice: 1,
    ReferencePriceVariation: 2,
    ReferencePriceVariationPercentage: 3,
    LastTradeDate: 4,
    LowestTradePrice: 5,
    HighestTradePrice: 6,
    TradeNumber: 7,
    TradeQuantity: 8
}

interface Props {
    isin?: string;
    lastPricePercent?: number;
    lastPrice?: number;
    width?: number;
    height?: number;
    name?:string;
    lastPriceVariation?: number;
}

function LastPricePush({
    name,
    isin,
    lastPricePercent: lastPricePercentDefault,
    lastPrice: lastPriceDefault,
    lastPriceVariation: lastPriceVariationDefault,
    width,
    height = 35
}: Props): ReactElement {
    const [data, setData] = useState<{
        lastPricePercent?: number,
        lastPrice?: number,
        lastPriceVariation?: number
    }>({
        lastPrice: lastPriceDefault,
        lastPricePercent: lastPricePercentDefault,
        lastPriceVariation: lastPriceVariationDefault
    })
    useEffect(() => {
        setData({
            lastPrice: lastPriceDefault,
            lastPricePercent: lastPricePercentDefault,
            lastPriceVariation: lastPriceVariationDefault
        })
    }, [lastPriceDefault, lastPricePercentDefault, lastPriceVariationDefault])
    const {
        register,
        unRegister
    } = useTseSocket()
    useEffect(() => {
        const update = (data: any) => {
            const lastPrice = data[PRICE_DATA_MAP.LastTradePrice];
            const lastPricePercent = data[PRICE_DATA_MAP.ReferencePriceVariationPercentage];
            setData({
                lastPrice,
                lastPricePercent: Number((!isNaN(lastPricePercent) ? lastPricePercent : 0).toFixed(3))
            })
        }
        if (register && isin) {
            register(isin, update, SocketKeysEnum.TseInstrumentTradePriceChangeSignal)
        }
        return () => {
            if (unRegister) {
                unRegister(isin ?? '', update);
            }
        }
    }, [unRegister, register, isin])
    return (
        <div className="price my-auto d-flex flex-grow-1 ltr">
            <div className="final-price">
                <NumberViewer value={data?.lastPricePercent || 0}>
                    <AnimatedNumber value={(data.lastPrice || 0).toLocaleString()} width={width} height={height} />
                </NumberViewer>
            </div>
            <div className="change-and-diffrence d-flex ltr">
                <NumberViewer value={data?.lastPricePercent || 0}>
                    <div className="diffrence ltr">
                        {data?.lastPriceVariation}
                    </div>
                    <div className="percent ltr">
                        <span className="ltr">
                            {`(${data?.lastPricePercent ?? 0}%)`}
                        </span>

                    </div>
                </NumberViewer>
            </div>
        </div>
    )
}

export default LastPricePush
