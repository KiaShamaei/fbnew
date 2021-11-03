import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import React, { Fragment, ReactElement } from 'react'
import { useState } from 'react'
import { useEffect } from 'react'
import { useRef } from 'react'
import { indiFirmChangeSignalParser } from 'utils/socketParsers'
import TurnoverContainer from '../../pages/Dashboard/panels/SymbolDetail/components/TurnoverContainer'

interface Props {
    buyFirmVolumePercentage?: number;
    selFirmVolumePercentage?: number;
    isin: string;
}

function TurnOverPush({
    buyFirmVolumePercentage,
    selFirmVolumePercentage,
    isin
}: Props): ReactElement {
    const [state, setState] = useState({
        buyFirmVolumePercentage,
        selFirmVolumePercentage
    })
    const isFirst = useRef<boolean>(true)
    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false
            return;
        }
        setState({
            buyFirmVolumePercentage,
            selFirmVolumePercentage
        })
    }, [buyFirmVolumePercentage,
        selFirmVolumePercentage])

    const { register, unRegister } = useTseSocket()

    useEffect(() => {
        const callback = (data: any) => {
            const parsedData = indiFirmChangeSignalParser(data);
            setState({
                buyFirmVolumePercentage: parsedData.buyFirmVolumePercentage,
                selFirmVolumePercentage: parsedData.selFirmVolumePercentage
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
        <Fragment>
            <TurnoverContainer color="green" value={(((state?.buyFirmVolumePercentage ? state?.buyFirmVolumePercentage : 0) * 180) / 100) - 90} className="pr-xl-8 right" />
            <TurnoverContainer color="red" value={(((state?.selFirmVolumePercentage ? state?.selFirmVolumePercentage : 0) * 180) / 100) - 90} className="pl-xl-8 left" />
        </Fragment>
    )
}

export default TurnOverPush
