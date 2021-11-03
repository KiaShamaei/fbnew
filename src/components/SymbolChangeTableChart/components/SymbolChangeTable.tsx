import React, { Fragment, ReactElement, useMemo } from 'react'
import { IBidAskTableRow } from '../meta/types'
import '../assets/SymbolChangeTable.scss'
import classNames from 'classnames'
import { useIntl, defineMessages } from 'react-intl'
import { memo } from 'react'
import { useCallback } from 'react'
import { useContext } from 'react'
import { SymbolChangeTableChartContext } from '../context/SymbolChangeTableChartContext'

const messages = defineMessages({
    volume: {
        id: 'volume',
        defaultMessage: 'volume'
    },
    price: {
        id: 'price',
        defaultMessage: 'price'
    },
    number: {
        id: 'number',
        defaultMessage: 'number'
    }
})

interface IDataRowProps {
    row?: IBidAskTableRow;
    columnsOrder?: 'normal' | 'reverse',
    totlaVolume: number;
    orderSide: number;
    upperPriceThreshold: any;
    lowerPriceThreshold: any;
}

const DataRow = memo(({
    row,
    columnsOrder,
    totlaVolume,
    orderSide,
    lowerPriceThreshold,
    upperPriceThreshold
}: IDataRowProps) => {
    const { onVolumeClick, onPriceClick } = useContext(SymbolChangeTableChartContext)
    const price: number | any = row?.price
    const cells = useMemo(() => {
        const status = price <= upperPriceThreshold && price >= lowerPriceThreshold
        const cellsTable = [
            <div key={'cell_number'} className={classNames("cell number", { 'asymmetric': !status })}>
                {(row?.number ?? 0).toLocaleString()}
            </div>,
            <div onClick={() => {
                if (status) {
                    return onVolumeClick(orderSide, totlaVolume, row?.price ?? 0)
                }
            }} key={'cell_volume'} className={classNames('cell volume', { 'cursor-pointer': status, 'asymmetric': !status })}>
                {(row?.quantity ?? 0).toLocaleString()}
            </div>,
            <div onClick={() => {
                if (status) {
                    return onPriceClick(orderSide, row?.price ?? 0)
                }
            }} key={'cell_price'} className={classNames('cell price', { 'cursor-pointer': status, 'asymmetric': !status })}>
                {(row?.price ?? 0).toLocaleString()}
            </div>
        ]
        if (columnsOrder === 'reverse')
            return cellsTable.reverse()
        return cellsTable
    }, [columnsOrder, lowerPriceThreshold, onPriceClick, onVolumeClick, orderSide, price, row?.number, row?.price, row?.quantity, totlaVolume, upperPriceThreshold])
    return <Fragment>
        {cells}
    </Fragment>
})

interface Props {
    items: IBidAskTableRow[];
    className?: string;
    columnsOrder?: 'normal' | 'reverse',
    upperPriceThreshold: number,
    lowerPriceThreshold: number,
    isin?: string,
    isLeft: boolean;
    onRowClick?: (row: any) => void;
}

interface SymbolChangTableRowProps {
    lowerPriceThreshold: number;
    upperPriceThreshold: number;
    row: any;
    columnsOrder: 'normal' | 'reverse',
    maxVolume: number;
    isin?: string;
    onRowClick?: (row: any) => void;
    totalVolumeUntil: number;
}

const SymbolChangTableRow = memo(({
    lowerPriceThreshold,
    upperPriceThreshold,
    row,
    columnsOrder,
    maxVolume,
    isin,
    onRowClick,
    totalVolumeUntil
}: SymbolChangTableRowProps) => {
    const upRange = Math.max(lowerPriceThreshold, upperPriceThreshold)
    const downRange = Math.min(lowerPriceThreshold, upperPriceThreshold)
    const isOutofRange = useMemo(() => {
        if (row?.price && row?.price !== 0)
            return !(downRange < (row.price ?? 0) && (row.price ?? 0) < upRange);
        return false;
    }, [downRange, row?.price, upRange])

    const price: number | any = row?.price

    const onClick = useCallback(() => {
        if (onRowClick)
            onRowClick(row);
    }, [onRowClick, row])
    return <div onClick={onClick} className={classNames("row", { 'is-out-of-range': isOutofRange })}>
        <DataRow
            row={row}
            totlaVolume={totalVolumeUntil ?? 0}
            orderSide={columnsOrder === 'normal' ? 1 : 2}
            columnsOrder={columnsOrder}
            lowerPriceThreshold={lowerPriceThreshold}
            upperPriceThreshold={upperPriceThreshold}
        />
        {!(price > upperPriceThreshold || price < lowerPriceThreshold) &&
            <span
                style={{
                    width: `${row ? ((row?.quantity ?? 0) * 100) / maxVolume : 0}%`,
                    opacity: '25%'
                }}
                className={classNames("precent", {
                    'is-reverse': columnsOrder === 'reverse'
                })}></span>}
    </div>
})
function SymbolChangeTable({
    items,
    className,
    columnsOrder = 'normal',
    lowerPriceThreshold,
    upperPriceThreshold,
    isin,
}: Props): ReactElement {
    const itemsWithFiveRowsMin = useMemo<IBidAskTableRow[]>(() => {
        if (items.length >= 5) {
            return items;
        }
        return [
            ...items,
            ...Array(5 - items.length).map((item, index) => ({ id: index, ...item }))]
    }, [items])

    const maxVolume = items.reduce((total, item) => {
        const quantity = item?.quantity || 0
        return total < quantity ? quantity : total
    }, 0)

    const intl = useIntl()
    const columns = useMemo(() => {
        const cols = [
            { label: intl.formatMessage(messages.number), className: 'number' },
            { label: intl.formatMessage(messages.volume), className: 'volume' },
            { label: intl.formatMessage(messages.price), className: 'price' },
        ]
        if (columnsOrder === 'reverse') {
            return cols.reverse()
        }
        return cols
    }, [columnsOrder, intl])

    const camputeVolume = useCallback((rowIndex: number) => {
        const itemsUntilRowIndex = itemsWithFiveRowsMin.slice(0, rowIndex + 1);
        return itemsUntilRowIndex.reduce((total: any, item) => {
            if (item && item.price && (item.price >= lowerPriceThreshold && item.price <= upperPriceThreshold)) {
                return total += (item?.quantity ?? 0)
            } else {
                return total
            }
        }, 0)
    }, [itemsWithFiveRowsMin, lowerPriceThreshold, upperPriceThreshold])

    return <div className={classNames("symbol-change-table", className)}>
        <div className="head">
            <div className="header-row">
                {columns.map((col, index) => <div className={col.className} key={index}>{col.label}</div>)}
            </div>
        </div>
        <div className="body">
            <SymbolChangTableRow
                key={'symbol_detail_symbol_change_0'}
                columnsOrder={columnsOrder}
                isin={isin}
                maxVolume={maxVolume}
                lowerPriceThreshold={lowerPriceThreshold}
                upperPriceThreshold={upperPriceThreshold}
                row={itemsWithFiveRowsMin[0]}
                totalVolumeUntil={camputeVolume(0)}
            />
            <SymbolChangTableRow
                key={'symbol_detail_symbol_change_1'}
                columnsOrder={columnsOrder}
                isin={isin}
                maxVolume={maxVolume}
                lowerPriceThreshold={lowerPriceThreshold}
                upperPriceThreshold={upperPriceThreshold}
                row={itemsWithFiveRowsMin[1]}
                totalVolumeUntil={camputeVolume(1)}
            />
            <SymbolChangTableRow
                key={'symbol_detail_symbol_change_2'}
                columnsOrder={columnsOrder}
                isin={isin}
                maxVolume={maxVolume}
                lowerPriceThreshold={lowerPriceThreshold}
                upperPriceThreshold={upperPriceThreshold}
                row={itemsWithFiveRowsMin[2]}
                totalVolumeUntil={camputeVolume(2)}
            />
            <SymbolChangTableRow
                key={'symbol_detail_symbol_change_3'}
                columnsOrder={columnsOrder}
                isin={isin}
                maxVolume={maxVolume}
                lowerPriceThreshold={lowerPriceThreshold}
                upperPriceThreshold={upperPriceThreshold}
                row={itemsWithFiveRowsMin[3]}
                totalVolumeUntil={camputeVolume(3)}
            />
            <SymbolChangTableRow
                key={'symbol_detail_symbol_change_4'}
                columnsOrder={columnsOrder}
                isin={isin}
                maxVolume={maxVolume}
                lowerPriceThreshold={lowerPriceThreshold}
                upperPriceThreshold={upperPriceThreshold}
                row={itemsWithFiveRowsMin[4]}
                totalVolumeUntil={camputeVolume(4)}
            />
        </div>
    </div>
}

export default SymbolChangeTable
