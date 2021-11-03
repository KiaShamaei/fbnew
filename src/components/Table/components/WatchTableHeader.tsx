import classNames from 'classnames';
import { columns } from 'pages/Reports/AccountTurnOver/tableData';
import React, { ForwardedRef, memo, forwardRef, useCallback, useContext, useEffect, useRef } from 'react';
import TableColumnsWidthContext from '../TableContext';
import { IColumn, IColumnDisplayModel, ISortTableProps } from '../types';
import '../assets/TableHeader.scss'

interface WatchTableHeaderProps extends ISortTableProps {

    columns: IColumn[];
    onColumnWidthsChange: (columns: number[]) => void;
    selectedColumns: IColumnDisplayModel;
    onOpenSelectionColumns: () => void;
    hasColumnSelection?: boolean;
    width: number | string;
    topColumns?: IColumn[];
    className?: string;
    singleColumns?: IColumn[];
    hasResizer?: boolean;
}


function WatchTableHeader({
    onColumnWidthsChange,
    orderBy,
    direction,
    selectedColumns,
    singleColumns = [],
    topColumns = [],
    width,
    className,
    columns,
    hasResizer = false,
    onOrderChange
}: WatchTableHeaderProps, ref?: ForwardedRef<HTMLDivElement>): JSX.Element {




    const { columnWidths, topColumnsWidth, singleColumnsWidth } = useContext(TableColumnsWidthContext)
    const isMouseDown = useRef<boolean>(false)
    const startPageX = useRef<number | null>()
    const selectedIndex = useRef<number | null>()
    const initialWidth = useRef<number>(0)
    const resizeHandler = useCallback((event: MouseEvent) => {
        if (isMouseDown.current) {
            const index = selectedIndex.current
            if (startPageX.current && (index || index === 0)) {
                const columnWidthsCopy = [...columnWidths]
                const newSize: number = initialWidth.current + startPageX.current - event.pageX
                columnWidthsCopy[index] = newSize
                onColumnWidthsChange(columnWidthsCopy)
            }
        }
    }, [columnWidths, onColumnWidthsChange])

    useEffect(() => {
        const onMouseUp = () => {
            isMouseDown.current = false;
        }
        window.addEventListener('mouseup', onMouseUp)
        window.addEventListener('mousemove', resizeHandler)
        return () => {
            window.removeEventListener('mouseup', onMouseUp)
            window.removeEventListener('mousemove', resizeHandler)
        }
    }, [resizeHandler])

    const onMouseDown = useCallback((event: React.MouseEvent<HTMLSpanElement>, index: number) => {
        startPageX.current = event.pageX;
        isMouseDown.current = true;
        selectedIndex.current = index
        initialWidth.current = columnWidths[index] || 0
    }, [columnWidths])

    const onHeaderClick = useCallback((sort: string) => {
        if (orderBy === sort) {
            if (direction === 'ASC') {
                onOrderChange(sort, 'DESC')
            } else {
                onOrderChange(undefined, undefined)
            }
        } else {
            onOrderChange(sort, 'ASC')
        }
    }, [direction, onOrderChange, orderBy])
    return (
        <div className={classNames("watch-table-header", className)} ref={ref} style={{ width }}>
            <div className='h-100'>
                {singleColumns.map((singleColumn, index) => {
                    return (
                        <div className={classNames("table-header-cell", { 'd-none': selectedColumns[singleColumn.sort] === false }, singleColumn.cellClassName)}
                            style={{
                                width: singleColumnsWidth ? singleColumnsWidth[index] : 0,
                                // userSelect: isMouseDown.current ? 'none' : 'auto'
                            }}

                            onClick={() => onHeaderClick(singleColumn.sort)}
                            key={singleColumn.sort}>

                            {singleColumn.header}
                            {orderBy === singleColumn.sort && <i className={classNames("sort online-icon-down-arrow", {
                                'desc': direction === 'DESC',
                            })}>

                            </i>}
                            {hasResizer && <span
                                className="resizer"
                                onMouseDown={(event) => onMouseDown(event, index)}>
                            </span>}</div>
                    )
                })}
            </div>

            <div className='d-flex flex-direction-col h-100 w-100 justify-content-space-between '>
                <div className='d-flex align-items-center h-50 w-100'>
                    {topColumns.map((topColumn, index) => {
                        return (
                            <div className={classNames("table-header-cell", { 'd-none': selectedColumns[topColumn.sort] === false }, topColumn.cellClassName)}
                                style={{
                                    width: topColumnsWidth ? topColumnsWidth[index] : 0,
                                    color: 'black'
                                    // userSelect: isMouseDown.current ? 'none' : 'auto'
                                }}

                                onClick={() => onHeaderClick(topColumn.sort)}
                                key={topColumn.sort}>

                                {topColumn.header}
                                {orderBy === topColumn.sort && <i className={classNames("sort online-icon-down-arrow", {
                                    'desc': direction === 'DESC',
                                })}>

                                </i>}
                                {hasResizer && <span
                                    className="resizer"
                                    onMouseDown={(event) => onMouseDown(event, index)}>
                                </span>}</div>
                        )
                    })}
                </div>

                <div className='d-flex w-100 h-50 align-items-center border-top'>
                    {columns.map((column, index) => {
                        return (
                            <div
                                className={classNames("table-header-cell", { 'd-none': selectedColumns[column.sort] === false }, column.cellClassName)}
                                style={{
                                    width: columnWidths[index],
                                    // userSelect: isMouseDown.current ? 'none' : 'auto'
                                }}

                                onClick={() => onHeaderClick(column.sort)}
                                key={column.sort}>
                                {column.header}
                                {orderBy === column.sort && <i className={classNames("sort online-icon-down-arrow", {
                                    'desc': direction === 'DESC',
                                })}>

                                </i>}
                                {hasResizer && <span
                                    className="resizer"
                                    onMouseDown={(event) => onMouseDown(event, index)}>
                                </span>}

                            </div>

                        )
                    }
                    )
                    }

                </div>

            </div>



        </div>
    )
}

export default memo(forwardRef<HTMLDivElement, WatchTableHeaderProps>(WatchTableHeader))