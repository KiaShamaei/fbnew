import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import NumberViewer from 'components/NumberViewer/NumberViewer'
import { formattNumber } from 'utils/string'
import { useState } from 'react'
import { useEffect } from 'react'
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { closingPriceSignalParser } from 'utils/socketParsers'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import TotalTradeValuePush from './TotalTradeValuePush'
import NumberFormatter from 'components/Formatters/NumberFormatter'

interface IFinalPriceAndVolume {
    closingPricePercent?: number;
    closingPrice?: number;
}

interface Props extends IFinalPriceAndVolume {
    isin: string;
    baseVolume: number,
}

function FinalPriceAndVolumePush({
    closingPrice,
    closingPricePercent,
    isin,
    baseVolume
}: Props): ReactElement {

    const [state, setState] = useState<IFinalPriceAndVolume>({
        closingPrice,
        closingPricePercent
    })

    const {
        register,
        unRegister
    } = useTseSocket()

    useEffect(() => {
        if (closingPrice || closingPricePercent) {
            setState({
                closingPrice,
                closingPricePercent
            });
        }
    }, [baseVolume, closingPrice, closingPricePercent])

    useEffect(() => {
        const cb = (data: any) => {
            const closing = closingPriceSignalParser(data)
            setState(prev => ({
                ...prev,
                baseVolume: closing.totalNumberOfSharesTraded,
                closingPrice: closing.closingPrice,
                // TODO: replace it
                // closingPricePercent: closing.closingPriceVariationPercentage,
            }));
        };
        if (register)
            register(isin, cb, SocketKeysEnum.TseInstrumentClosingPriceChangeSignal)
        return () => {
            if (unRegister)
                unRegister(isin, cb);
        }
    }, [isin, register, unRegister])

    return (
        <div className="final-price-and-volumne d-flex justify-content-space-between">
            <div className="final-price-and-value d-flex">
                <label className="color-gray-text">
                    <FormattedMessage id="final-price" defaultMessage="final price" />:
                </label>
                <div className="final-price-diffrence d-flex">
                    <NumberViewer value={state.closingPricePercent ?? 0} className="color-green percent mr-1 ml-1">
                        <span className="ltr">
                            {`(${formattNumber(state.closingPricePercent, 2)}%)`}
                        </span>
                        <span className="ml-1">
                            {formattNumber(state.closingPrice)}
                        </span>
                    </NumberViewer>
                </div>
            </div>
            <div className="volume-container ml-3 d-flex">
                <label className="color-gray-text">
                    <FormattedMessage id="volume" defaultMessage="Volume" />:
                </label>
                <div className="volumne mr-1 ">
                    <NumberFormatter>{baseVolume}</NumberFormatter>
                </div>
            </div>
        </div>
    )
}

export default FinalPriceAndVolumePush
