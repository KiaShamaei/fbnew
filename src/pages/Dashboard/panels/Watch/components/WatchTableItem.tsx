import classNames from 'classnames'
//import { IAnchorProps } from 'components/DropdownMenu/meta/types'
import NumberWidthPercent from 'components/NumberWidthPercent/NumberWidthPercent'
import PortfolioBaselineChart from 'components/PortfolioBaselineChart/PortfolioBaselineChart'
import React, { forwardRef, ReactElement, useCallback, /*useMemo ,*/ useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { SET_ACTIVE_SYMBOL_ISIN } from 'redux/actionTypes/activeSymbolTypes'
import { IActiveSymbolAction, IReduxState } from 'redux/types'
import '../assets/WatchTableItem.scss'
import { IWatchItem } from '../meta/types'
//import PortfolioItemDropdown from 'components/PortfolioWatchTable/components/PortfolioItemDropdown'
import { getInstrumentState } from 'utils/busnis'
import WatchItemDropdown from './WatchItemDropdown'
import { useEffect } from 'react'
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'
import { instrumentTradeChangeSignalParser } from 'utils/socketParsers'
import usePortfolioWatchItemHistoryChart from 'hooks/usePortfolioWatchItemHistoryChart'

interface Props extends IWatchItem {
    // index: number;
    // socketName: string;
    // isActive: boolean;
    instrumentName: string;
    instrumentTitle: string;
    index: number
}

interface ISocketModel {
    finalPrice: number,
    lastPresent: number,
    lastPrice: number,
    finalPercent: number,
    negative: boolean,
    positive: boolean,
}

const WatchTableItem = forwardRef<any, Props>(function ({
    lastPrice,
    isin,
    finalPercent,
    finalPrice,
    history,
    lastPercent,
    title,
    instrumentName,
    InstrumentStateCode,
    instrumentTitle,
    index
}: Props,
    ref): ReactElement {
    const dispatch = useDispatch()
    const activeSymbolIzin = useSelector((state: IReduxState) => state.activeSymbol.isin)
    const isActive = activeSymbolIzin === isin

    const top = index * (66 + 8)

    const setActiveIsin = useCallback(() => {
        dispatch<IActiveSymbolAction>({ type: SET_ACTIVE_SYMBOL_ISIN, isin })
    }, [dispatch, isin])

    const [lastLive, setLastLive] = useState<ISocketModel>({
        lastPrice: lastPrice,
        lastPresent: lastPercent,
        finalPrice: finalPrice,
        finalPercent: finalPercent,
        positive: false,
        negative: false
    })

    const {
        register,
        unRegister,
    } = useTseSocket()

    useEffect(() => {
        const cb = (data: any) => {
            const finalData = instrumentTradeChangeSignalParser(data)
            setLastLive((prev: any) => ({
                ...prev,
                negative: finalData.lastTradePrice < prev.lastPrice,
                positive: finalData.lastTradePrice > prev.lastPrice,
                lastPrice: finalData.lastTradePrice,
                lastPresent: finalData.referencePriceVariationPercentage.toFixed(2),
            }))
        }
        if (register) {
            register(isin, cb, SocketKeysEnum.TseInstrumentTradePriceChangeSignal);
        }

        return () => {
            if (unRegister) {
                unRegister(isin, cb)
            }
        }
    }, [register, isin, unRegister])

    const {
        getHistoryWeeklyOrDaily,
        historyState,
        loading
    } = usePortfolioWatchItemHistoryChart({
        history,
        isin
    })

    const state = getInstrumentState(InstrumentStateCode)

    return (
        <div
        onClick={setActiveIsin}
        ref={ref} 
        className={classNames("portfolio-table-item-container", { 'is-active': isActive })} style={{
            marginTop: 8,
            top: top,
            position: 'absolute',
            width: '100%',
            transition: '0.5s linear'
        }}>
            <div className="portfolio-table-item watch-table-item">
                <div className="symbol cursor-pointer" >
                    <span className={classNames("circle", {
                        'green': state === 2,
                        'orange': state === 3,
                        'red': state === 1
                    })}></span>
                    <span className="title">{title}</span>
                </div>

                <div className="last">
                    <NumberWidthPercent
                        positive={lastLive.positive}
                        negative={lastLive.negative}
                        number={lastLive.lastPrice}
                        percent={lastLive.lastPresent}
                    />
                </div>

                <div className="final">
                    <NumberWidthPercent
                        positive={lastLive.positive}
                        negative={lastLive.negative}
                        number={lastLive.finalPrice}
                        percent={lastLive.finalPercent}
                    />
                </div>
                <div className="chart d-flex">
                    <PortfolioBaselineChart
                        data={historyState[historyState.activeModel] ?? []}
                        isin={isin}
                        loading={loading}
                        percent={lastPercent}
                    />

                    <WatchItemDropdown
                        isin={isin}
                        title={instrumentTitle}
                        name={instrumentName}
                        getHistoryWeeklyOrDaily={getHistoryWeeklyOrDaily}
                        activeChart={historyState.activeModel}
                    />
                </div>
            </div>
        </div>
    )
})

export default WatchTableItem
