import React, { ReactElement, useEffect } from 'react'
import { useState } from 'react'
import RealLegal from '../../pages/Dashboard/panels/SymbolDetail/components/RealLegal'
import { FormattedMessage } from 'react-intl'
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import { indiFirmChangeSignalParser } from 'utils/socketParsers'

interface RealLegalPushProps {
    buyFirmVolumePercentage?: number,
    buyFirmVolume?: number,
    buyFirmCount?: number,
    buyIndividualVolumePercentage?: number,
    buyIndividualVolume?: number,
    buyIndividualCount?: number,
    selIndividualVolume?: number,
    selIndividualVolumePercentage?: number,
    selIndividualCount?: number,
    selFirmVolume?: number,
    selFirmVolumePercentage?: number,
    selFirmCount?: number,
}

interface Props extends RealLegalPushProps {
    isin: string
}

function RealLegalPush({
    buyFirmCount,
    buyFirmVolume,
    buyFirmVolumePercentage,
    buyIndividualCount,
    buyIndividualVolume,
    buyIndividualVolumePercentage,
    selIndividualVolume,
    selIndividualVolumePercentage,
    selIndividualCount,
    selFirmVolume,
    selFirmVolumePercentage,
    selFirmCount,
    isin
}: Props): ReactElement {

    const [mapedData, setRealLegalState] = useState<RealLegalPushProps>()

    useEffect(() => {
        if (
            buyFirmCount ??
            buyFirmVolume ??
            buyFirmVolumePercentage ??
            buyIndividualCount ??
            buyIndividualVolume ??
            buyIndividualVolumePercentage ??
            selIndividualVolume ??
            selIndividualVolumePercentage ??
            selIndividualCount ??
            selFirmVolume ??
            selFirmVolumePercentage ??
            selFirmCount)
            setRealLegalState({
                buyFirmCount,
                buyFirmVolume,
                buyFirmVolumePercentage,
                buyIndividualCount,
                buyIndividualVolume,
                buyIndividualVolumePercentage,
                selIndividualVolume,
                selIndividualVolumePercentage,
                selIndividualCount,
                selFirmVolume,
                selFirmVolumePercentage,
                selFirmCount,
            })

    }, [
        buyFirmCount,
        buyFirmVolume,
        buyFirmVolumePercentage,
        buyIndividualCount,
        buyIndividualVolume,
        buyIndividualVolumePercentage,
        selFirmCount,
        selFirmVolume,
        selFirmVolumePercentage,
        selIndividualCount,
        selIndividualVolume,
        selIndividualVolumePercentage
    ])

    const {
        register,
        unRegister
    } = useTseSocket()

    useEffect(() => {
        const callback = (data: any) => {
            const parsedData = indiFirmChangeSignalParser(data);
            setRealLegalState({
                buyFirmCount: parsedData.buyFirmCount,
                buyFirmVolume: parsedData.buyFirmVolume,
                buyFirmVolumePercentage: parsedData.buyFirmVolumePercentage,
                buyIndividualCount: parsedData.buyIndividualCount,
                buyIndividualVolume: parsedData.buyIndividualVolume,
                buyIndividualVolumePercentage: parsedData.buyIndividualVolumePercentage,
                selFirmCount: parsedData.selFirmCount,
                selFirmVolume: parsedData.selFirmVolume,
                selFirmVolumePercentage: parsedData.selFirmVolumePercentage,
                selIndividualCount: parsedData.selIndividualCount,
                selIndividualVolume: parsedData.selIndividualVolume,
                selIndividualVolumePercentage: parsedData.selIndividualVolumePercentage
            })
        }
        if (register) {
            register(isin, callback, SocketKeysEnum.TseIndiFirmChangeSignal);
        }
        return () => {
            if (unRegister)
                unRegister(isin, callback)
        }
    }, [isin, register, unRegister])

    return (
        <div className="w-100 turnover-detail d-flex">
            <div className="w-50 text-center">
                {/** خرید حقیقی  */}

                <RealLegal
                    percent={mapedData?.buyIndividualVolumePercentage || 0}
                    coefficient={mapedData?.buyIndividualVolume || 0}
                    number={mapedData?.buyIndividualCount || 0}
                />

                {/** خرید حقوقی  */}
                <RealLegal
                    percent={mapedData?.buyFirmVolumePercentage || 0}
                    coefficient={mapedData?.buyFirmVolume || 0}
                    number={mapedData?.buyFirmCount || 0}
                />
            </div>
            <div>
                <div>
                    <FormattedMessage
                        id="real"
                        defaultMessage="real"
                    />
                </div>
                <div className="mt-2">
                    <FormattedMessage
                        id="legal"
                        defaultMessage="legal"
                    />
                </div>
            </div>
            <div className="w-50 text-center">

                {/** فروش حقیقی  */}
                <RealLegal
                    percent={mapedData?.selIndividualVolumePercentage || 0}
                    coefficient={mapedData?.selIndividualVolume || 0}
                    number={mapedData?.selIndividualCount || 0}
                />

                {/** فروش حقوقی  */}
                <RealLegal
                    percent={mapedData?.selFirmVolumePercentage || 0}
                    coefficient={mapedData?.selFirmVolume || 0}
                    number={mapedData?.selFirmCount || 0}
                />
            </div>
        </div>

    )
}

export default RealLegalPush
