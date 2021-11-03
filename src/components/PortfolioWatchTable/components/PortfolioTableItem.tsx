import classNames from 'classnames'
import NumberWidthPercent from 'components/NumberWidthPercent/NumberWidthPercent'
import React, { ReactElement, useCallback } from 'react'
import { IPortfolioItem } from '../meta/type'
import '../assets/PortfolioTableItem.scss'
import AnimationBoldContent from 'components/Animations/AnimationBoldContent/AnimationBoldContent'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ACTIVE_SYMBOL_ISIN } from 'redux/actionTypes/activeSymbolTypes'
import { IActiveSymbolAction, IReduxState } from 'redux/types'
import PortfolioBaselineChart from 'components/PortfolioBaselineChart/PortfolioBaselineChart'
import PortfolioItemDropdown from './PortfolioItemDropdown'
import { getInstrumentState } from 'utils/busnis'
import { useEffect } from 'react'
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { useCache } from 'container/Cache/Cache'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import { instrumentTradeChangeSignalParser } from 'utils/socketParsers'
import { useState } from 'react'
import PortfolioTableItemClosingPrice from './PortfolioTableItemClosingPrice'
import usePortfolioWatchItemHistoryChart from 'hooks/usePortfolioWatchItemHistoryChart'

interface Props extends IPortfolioItem {
    index: number;
    dispatchLast: (index: number, value: number) => void;
    dispatchInstantaneousValue: (index: number, value: number) => void;
    socketName: string;
    instantaneousValueCachedLive: number[];
    cachedValuesPriceLivePrice: number[];
}

function PortfolioTableItem({
    isin,
    instrumentName,
    closingPrice,
    closingPricePercent,
    lastTradePrice,
    lastTradePricePercent,
    quantity,
    history,
    instrumentStateCode,
    instrumentStateTitle,
    cachedValuesPriceLivePrice = [],
    instantaneousValueCachedLive = [],
    index,
    socketName
}: Props): ReactElement {
    const activeSymbolIzin = useSelector((state: IReduxState) => state.activeSymbol.isin)
    const isActive = activeSymbolIzin === isin
    /*const [lastLive, setLastLive] = useState<IPriceSocket>({
        price: cachedValuesPriceLivePrice[index] || lastTradePrice,
        present: lastTradePricePercent,
        positive: false,
        negative: false
    })*/

    /*const [instantaneousValueLive, setInstantaneousValueLive] = useState<IPriceSocket>({
        price: instantaneousValueCachedLive[index] || closingPrice,
        present: closingPricePercent,
        positive: false,
        negative: false
    })*/

    const {
        register,
        unRegister
    } = useTseSocket()

    const {
        getCache,
        setCache
    } = useCache()

    const saveNameLastTradePrice = `${isin}_lastTradePrice`;
    const saveNameLastTradePricePercent = `${isin}_lastTradePricePercent`;

    const [state, setState] = useState<{
        lastTradePrice: number;
        lastTradePricePercent: number;
    }>({
        lastTradePrice: Number(getCache(saveNameLastTradePrice)) || lastTradePrice || 0,
        lastTradePricePercent: Number(getCache(saveNameLastTradePricePercent)) || lastTradePricePercent || 0,
    })

    const dispatch = useDispatch()

    const setActiveIzin = useCallback((isin: string) => {
        dispatch<IActiveSymbolAction>({ type: SET_ACTIVE_SYMBOL_ISIN, isin })
    }, [dispatch])

    const {
        getHistoryWeeklyOrDaily,
        historyState,
        loading
    } = usePortfolioWatchItemHistoryChart({
        history,
        isin
    })

    useEffect(() => {
        const cb = (data: any[]) => {
            const parsedData = instrumentTradeChangeSignalParser(data)
            setState({
                lastTradePrice: parsedData.lastTradePrice,
                lastTradePricePercent: Number((parsedData.referencePriceVariationPercentage ?? 0).toFixed(2))
            })
        }
        if (register) {
            register(isin, cb, SocketKeysEnum.TseInstrumentTradePriceChangeSignal)
        }

        return () => {
            if (unRegister) {
                setCache(saveNameLastTradePrice, state.lastTradePrice)
                setCache(saveNameLastTradePricePercent, state.lastTradePricePercent)
                unRegister(isin, cb)
            }
        }
    }, [isin, register, saveNameLastTradePrice, saveNameLastTradePricePercent, setCache, state.lastTradePrice, state.lastTradePricePercent, unRegister])

    const symbolState = getInstrumentState(instrumentStateCode);

    return (
        <div onClickCapture={() => {
            setActiveIzin(isin)
        }} className={classNames("portfolio-table-item-container", { 'is-active': isActive })}>
            <div className="portfolio-table-item" >
                <div className="symbol cursor-pointer" >
                    <span className={classNames("circle", {
                        'green': symbolState === 2,
                        'orange': symbolState === 3,
                        'red': symbolState === 1
                    })}></span>
                    <span className="title">{instrumentName}</span>
                </div>
                <div className="instantaneous-value">
                    <div className="m-auto instantaneous-value-container">
                        <span className="instantaneous-value-text">
                            <AnimationBoldContent
                                value={state.lastTradePrice}
                                positive={state.lastTradePricePercent > 0}
                                negative={state.lastTradePricePercent < 0}
                                neutral
                                signPass
                            >
                                {lastTradePrice.toLocaleString()}
                            </AnimationBoldContent>
                        </span>
                        <span className="number">{quantity.toLocaleString()}</span>
                    </div>
                </div>
                <div className="last-final">
                    <NumberWidthPercent
                        positive={state.lastTradePricePercent > 0}
                        negative={state.lastTradePricePercent < 0}
                        number={state.lastTradePrice}
                        percent={state.lastTradePricePercent}
                    />
                    <PortfolioTableItemClosingPrice
                        isin={isin}
                        closingPrice={closingPrice}
                        closingPricePercent={closingPricePercent}
                    />
                </div>
                <div className="chart d-flex">
                    <PortfolioBaselineChart
                        loading={loading}
                        data={historyState[historyState.activeModel] ?? []}
                        isin={isin}
                        percent={state.lastTradePricePercent}
                    />
                    <PortfolioItemDropdown
                        isin={isin}
                        name={instrumentName}
                        getHistoryWeeklyOrDaily={getHistoryWeeklyOrDaily}
                        activeChart={historyState.activeModel}
                    />
                </div>
            </div>
        </div>

    )

}

export default PortfolioTableItem
