import classNames from 'classnames'
import React, { ReactElement } from 'react'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { IBidAsk } from 'types/IBidAsk'
import SymbolChangeTable from './components/SymbolChangeTable'
import { IBidAskTableRow } from './meta/types'
import { SymbolChangeTableChartContext } from './context/SymbolChangeTableChartContext'

interface Props {
    className?: string;
    bidAsk?: IBidAsk[];
    lowerPriceThreshold?: number;
    upperPriceThreshold?: number;
    isin?: string;
    onRowClick?: (side: number, bidAsk: IBidAskTableRow) => void;
    onVolumeClick?: (side: number, volume: number, price: number) => void;
    onPriceClick?: (side: number, price: number) => void;
}

function SymbolChangeTableChart({
    className,
    bidAsk = [],
    lowerPriceThreshold = 0,
    upperPriceThreshold = 0,
    isin,
    onRowClick,
    onVolumeClick: onVolumeClickInput,
    onPriceClick: onPriceClickInput
}: Props): ReactElement {

    const sortedBidAsk = useMemo(() => {
        if(bidAsk) {
            return bidAsk.slice().sort((a,b) => a.rowPlace - b.rowPlace)
        }
        return [];
    }, [bidAsk])

    const leftTable: IBidAskTableRow[] = sortedBidAsk.map((item: any = {}) => ({
        number: item?.bidNumber,
        price: item?.bidPrice,
        quantity: item?.bidQuantity,
        order: item?.rowPlace
    }))

    const rightTable: IBidAskTableRow[] = sortedBidAsk.map((item: any = {}) => ({
        number: item?.askNumber,
        price: item?.askPrice,
        quantity: item?.askQuantity,
        order: item?.rowPlace
    }))

    const onVolumeClick = useCallback((volume: number, orderSide: number, price: number) => {
        if(onVolumeClickInput)
            onVolumeClickInput(volume, orderSide, price)
    }, [onVolumeClickInput])

    const onPriceClick = useCallback((orderSide: number, price: number) => {
        if(onPriceClickInput) {
            onPriceClickInput(orderSide, price)
        }
    }, [onPriceClickInput])

    return (
        <SymbolChangeTableChartContext.Provider value={{
            onVolumeClick: onVolumeClick,
            onPriceClick
        }}>
            <div className={classNames("d-flex", className)}>
                <SymbolChangeTable
                    lowerPriceThreshold={lowerPriceThreshold}
                    upperPriceThreshold={upperPriceThreshold}
                    className="w-50"
                    isin={isin}
                    isLeft={false}
                    items={rightTable}
                />
                <div className="w-50">
                    <SymbolChangeTable
                        lowerPriceThreshold={lowerPriceThreshold}
                        upperPriceThreshold={upperPriceThreshold}
                        columnsOrder={'reverse'}
                        className="w-100"
                        isin={isin}
                        isLeft
                        items={leftTable}
                    />
                </div>
            </div>
        </SymbolChangeTableChartContext.Provider>
    )
}

export default SymbolChangeTableChart
