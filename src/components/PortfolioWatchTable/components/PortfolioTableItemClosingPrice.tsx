import React, { ReactElement } from 'react'
import NumberWidthPercent from 'components/NumberWidthPercent/NumberWidthPercent'
import { useState } from 'react'
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { useCache } from 'container/Cache/Cache'
import { useEffect } from 'react'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import { closingPriceSignalParser } from 'utils/socketParsers'

interface ClosingPriceProps {
    closingPrice: number;
    closingPricePercent: number;
}

interface Props extends ClosingPriceProps{
    isin: string;
}

function PortfolioTableItemClosingPrice({
    closingPrice,
    closingPricePercent,
    isin
}: Props): ReactElement {
    
    const {
        getCache,
        setCache
    } = useCache()

    const saveNameClosingPrice = `${isin}_portfolio_closingPrice`
    const saveNameClosingPercent = `${isin}_portfolio_closingPricePercent`
    const [state, setState] = useState<ClosingPriceProps>({
        closingPrice: getCache(`${isin}_portfolio_closingPrice`) ?? closingPrice,
        closingPricePercent: getCache(`${isin}_portfolio_closingPricePercent`) ?? closingPricePercent
    })

    const {
        register,
        unRegister
    } = useTseSocket()

    useEffect(() => {
        const cb = (data: any[]) => {
            const parsedData = closingPriceSignalParser(data)
            setState({
                closingPrice: parsedData.closingPrice,
                closingPricePercent: Number((parsedData.closingPriceVariationPercentage ?? 0).toFixed(2))
            })
        }
        if(register) {
            register(isin, cb, SocketKeysEnum.TseInstrumentClosingPriceChangeSignal);
        }
        return () => {
            if(unRegister){
                setCache(saveNameClosingPercent, state.closingPricePercent);
                setCache(saveNameClosingPrice, state.closingPrice);
                unRegister(isin, cb);
            }
        }
    }, [isin,
        register,
        saveNameClosingPercent,
        saveNameClosingPrice,
        setCache,
        state.closingPrice, 
        state.closingPricePercent,
        unRegister])

    return (
        <NumberWidthPercent
            className="final"
            number={state.closingPrice}
            percent={state.closingPricePercent}
        />
    )
}

export default PortfolioTableItemClosingPrice
