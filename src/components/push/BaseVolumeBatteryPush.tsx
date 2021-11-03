import React, { ReactElement } from 'react'
import Battery from 'components/Battery/Battery'
import { useState } from 'react';
import { useEffect } from 'react';
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager';
import { SocketKeysEnum } from 'enums/SocketKeysEnum';
import { closingPriceSignalParser } from 'utils/socketParsers';

interface Props {
    baseVolume: number;
    totalNumberOfSharesTraded: number;
    isin: string;
}

function BaseVolumeBatteryPushContent({
    baseVolume,
    totalNumberOfSharesTraded: totalNumberOfSharesTradedInput,
    isin
}: Props): ReactElement {

    const [totalNumberOfSharesTraded, setTotalNumberOfSharesTraded] = useState(totalNumberOfSharesTradedInput)

    const { register, unRegister } = useTseSocket()

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

    const percent = ((totalNumberOfSharesTraded || 0) * 100) / baseVolume;
    return <div className="d-flex">
        <span className="ml-1">
            {baseVolume.toLocaleString()}
        </span>
        <Battery value={percent > 100 ? 100 : percent} />
    </div>
}

interface BaseVolumeBatteryPushProps {
    baseVolume: number;
    totalNumberOfSharesTraded: number;
    isin: string;
}

function BaseVolumeBatteryPush({
    baseVolume,
    isin,
    totalNumberOfSharesTraded
}: BaseVolumeBatteryPushProps) {
    if(totalNumberOfSharesTraded !== undefined && totalNumberOfSharesTraded !== null)
    return <BaseVolumeBatteryPushContent
        baseVolume={baseVolume}
        totalNumberOfSharesTraded={totalNumberOfSharesTraded}
        isin={isin}
    />
    return null;
}

export default BaseVolumeBatteryPush
