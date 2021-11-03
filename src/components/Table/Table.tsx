import React, { ComponentClass, ElementType, forwardRef, memo, UIEventHandler, useCallback, useEffect, useImperativeHandle, useMemo, useRef, useState } from 'react'
import { VariableSizeList as List } from 'react-window'
import './assets/Table.scss'
import TableHeader, { tableHeaderProps } from './components/TableHeader'
import TableRow from './components/TableRow'
import { IColumn, IColumnDisplayModel, IFooter, ISortTableProps, OrderByChangeType, TableRowProps } from './types'
import { Scrollbars } from "../Scrollbars";
import TableColumnsWidthContext from './TableContext'
import InfiniteLoader from 'react-window-infinite-loader'
import mergeRefs from 'react-merge-refs'
import TableHeaderColumnSelection from './components/TableHeaderColumnSelection'
import { FunctionComponent } from 'react'
import classNames from 'classnames'
import { FormattedMessage } from 'react-intl'
import Loading from 'components/Loading/Loading'
import { BeatLoader } from 'react-spinners'
import TableFooter from './components/TableFooter'

interface Props extends ISortTableProps {
    columns: IColumn[];
    data: any[];
    footerData?: any[];
    width: number | string;
    height?: number | string;
    isAdvanceTable?: boolean;
    hasFooter?: boolean;
    className?: string;
    dropdown?: any
    renderAnchor?: any;
    singleColumns?: IColumn[];
    hasDropDown?: boolean;
    tableHeader?: ElementType<tableHeaderProps>;
    isNextPageLoading: boolean;
    loadNextPage: (startIndex: number, endIndex: number) => Promise<any> | null;
    hasNextPage?: boolean;
    hasHorizontalScroll?: boolean;
    topColumns?: IColumn[];
    rowHeight?: number;
    footerColumns?: IFooter[];
    position?: number;
    hasColumnSelection?: boolean;
    onRowClick?: (row: any) => void;
    tableRowComponent?: FunctionComponent<TableRowProps> | ComponentClass<any, TableRowProps>,
    itemRowClassName?: string;
    allDefaultOpenCalculator?: (data: any) => number;
    hasResizer?: boolean;
    onScroll?: (x: number, y: number) => void;
}

const Table = forwardRef(({
    columns,
    data,
    height = 450,
    width: widthInput,
    isNextPageLoading,
    tableHeader: TableHeaderComponent = TableHeader,
    hasResizer,
    loadNextPage,
    topColumns = [],
    onOrderChange: onOrderChangeOutput,
    orderBy,
    className,
    direction,
    footerColumns = [],
    hasHorizontalScroll = false,
    dropdown,
    renderAnchor,
    rowHeight = 34,
    hasDropDown,
    singleColumns = [],
    hasNextPage = true,
    hasColumnSelection = false,
    tableRowComponent: TableRowComponent = TableRow,
    itemRowClassName,
    onRowClick,
    onScroll
}: Props, ref) => {
    const initialTopColumnsWidths = useMemo<number[]>(() => {
        if (hasHorizontalScroll && topColumns) {
            return topColumns.map((item) => {
                if (item.width) {
                    return item.width
                }
                return 150
            })
        }
        // columns that have width
        const havWidth = topColumns.filter(item => item.width)
        // columns that hov not width
        const havNotWidth = topColumns.filter(item => !item.width)
        const totalWidthTaken: number = havWidth.reduce((total, column) => total + (column.width ?? 0), 0)
        const remainingWidth = Number(widthInput) - totalWidthTaken
        return topColumns.map(item => {
            if (item.width) {
                return item.width
            } else {
                return remainingWidth / havNotWidth.length
            }
        })
    }, [hasHorizontalScroll, topColumns, widthInput])
    const initialSingleColumnsWidths = useMemo<number[]>(() => {
        if (hasHorizontalScroll && singleColumns) {
            return singleColumns.map((item) => {
                if (item.width) {
                    return item.width
                }
                return 150
            })
        }
        // columns that have width
        const havWidth = singleColumns.filter(item => item.width)
        // columns that hov not width
        const havNotWidth = singleColumns.filter(item => !item.width)
        const totalWidthTaken: number = havWidth.reduce((total, column) => total + (column.width ?? 0), 0)
        const remainingWidth = Number(widthInput) - totalWidthTaken
        return singleColumns.map(item => {
            if (item.width) {
                return item.width
            } else {
                return remainingWidth / havNotWidth.length
            }
        })
    }, [hasHorizontalScroll, singleColumns, widthInput])
    const initlaColumnsWidths = useMemo<number[]>(() => {
        if (hasHorizontalScroll) {
            return columns.map((item) => {
                if (item.width) {
                    return item.width
                }
                return 150
            })
        }
        // columns that have width
        const havWidth = columns.filter(item => item.width)
        // columns that hov not width
        const havNotWidth = columns.filter(item => !item.width)
        const totalWidthTaken: number = havWidth.reduce((total, column) => total + (column.width ?? 0), 0)
        const remainingWidth = Number(widthInput) - totalWidthTaken
        return columns.map(item => {
            if (item.width) {
                return item.width
            } else {
                return remainingWidth / havNotWidth.length
            }
        })
    }, [columns, hasHorizontalScroll, widthInput])

    useEffect(() => {
        if (data && loadingIndexArray.current) {
            loadingIndexArray.current.forEach((index) => {
                if (data.length > index) {
                    listRef.current.resetAfterIndex(index);
                    loadingIndexArray.current.shift();
                }
            });

        }

    }, [data])

    useEffect(() => {
        setColumnWidths(initlaColumnsWidths)
    }, [initlaColumnsWidths])
    const [topColumnsWidth, setTopColumnsWidth] = useState<number[]>(initialTopColumnsWidths)
    const [singleColumnsWidth, setSingleColumnsWidth] = useState<number[]>(initialSingleColumnsWidths)
    const [columnWidths, setColumnWidths] = useState<number[]>(initlaColumnsWidths)
    const [isColumnSelectionOpen, setIsColumnSelectionOpen] = useState<boolean>(false)
    const listRef = useRef<any>()
    const scrollbarRef = useRef<any>()

    const headerRef = useRef<HTMLDivElement>(null)
    const headerContainerRef = useRef<HTMLDivElement>(null)
    const tableRef = useRef<HTMLDivElement>(null)
    const currentScroll = useRef<number>()
    const [selectedColumns, setDispalyedColumns] = useState<IColumnDisplayModel>(columns.reduce((total, item) => ({ ...total, [item.sort]: true }), {}))
    const loadingIndexArray = useRef<number[]>([])
    const [collapsedRows, setCollapsedRows] = useState<{ [key: string]: boolean }>({})

    const toggleRow = useCallback((index: number, size: number) => {

        setCollapsedRows(prev => ({
            ...prev,
            [index]: !prev[index]
        }))
        if (listRef.current) {
            setTimeout(() => {
                listRef.current.resetAfterIndex(index);
            }, 10)
        }
    }, [])

    useEffect(() => {
        const columnsWidthSum = initlaColumnsWidths.reduce((total, item) => total + item, 0)
        // setWidth(columnsWidthSum)
        if (headerRef.current) {
            headerRef.current.style.width = columnsWidthSum + 'px'
        }
    }, [initlaColumnsWidths])

    const close = useCallback(() => {
        setIsColumnSelectionOpen(false)
    }, [])

    const handleScroll = useCallback<UIEventHandler<HTMLDivElement>>((event: any) => {
        const { scrollTop, scrollLeft } = event.target;
        onScroll && onScroll(scrollTop, scrollLeft);
        currentScroll.current = scrollTop
        listRef.current.scrollTo(scrollTop)
        listRef.current.scrollLeft = (scrollLeft);
        if (headerContainerRef.current) {
            headerContainerRef.current.scrollLeft = scrollLeft
        }
    }, [onScroll])

    const onOrderChange = useCallback<OrderByChangeType>((orderBy, direction) => {
        scrollbarRef.current.scrollToTop()
        listRef.current.scrollTo(0)
        onOrderChangeOutput && onOrderChangeOutput(orderBy, direction)
    }, [onOrderChangeOutput])

    const renderView = useCallback(({ style }: any) => {
        return <div className="scroll-view" style={{ ...style, margin: 0, marginLeft: style ? style.marginRight : 0, marginRight: 0, height }}>

        </div>
    }, [height])

    const renderThumbVertical = useCallback(({ style }: any) => {
        return <div className={"scroll-thumb vertical"} style={{ ...style }}></div>
    }, [])

    const renderThumbHorizontal = useCallback(({ style }: any) => {
        return <div className={"scroll-thumb horizontal"} style={{ ...style }}></div>
    }, [])

    const onColumnsWidthChange = useCallback((columnsWidths: number[]) => {
        setColumnWidths(columnsWidths)
        const columnsWidthSum = columnsWidths.reduce((total, item) => total + item, 0)
        if (hasHorizontalScroll === false)
            return
        if (columnsWidthSum < widthInput)
            return
        const columnsSize: { [key: string]: number } = columns.reduce((total, item, index) => ({ ...total, [item.sort]: columnWidths[index] }), {})
        const displayColumnsKeys = Object.entries(selectedColumns).filter(([, v]) => v)
        const newWidth = displayColumnsKeys.reduce((total, [k,]) => total + columnsSize[k], 0)
        // setWidth(newWidth)
        if (headerRef.current) {
            headerRef.current.style.width = newWidth + 'px'
        }
    }, [hasHorizontalScroll, widthInput, columns, selectedColumns, columnWidths])

    const onColumnDisplayChange = useCallback((displayColumns: IColumnDisplayModel) => {
        const columnsSize: { [key: string]: number } = columns.reduce((total, item, index) => ({ ...total, [item.sort]: columnWidths[index] }), {})
        const displayColumnsKeys = Object.entries(displayColumns).filter(([, v]) => v)
        const newWidth = displayColumnsKeys.reduce((total, [k,]) => total + columnsSize[k], 0)
        setDispalyedColumns(displayColumns)
        if (headerRef.current) {
            headerRef.current.style.width = newWidth + 'px'
        }
        // setWidth(newWidth)
        if (newWidth <= widthInput) {
            //const columnsWidthSum = columnWidths.reduce((total, item) => total + item, 0)
        }
    }, [columnWidths, columns, widthInput])

    const itemCount = useMemo(() => {
        loadingIndexArray.current.push(data.length);
        return hasNextPage ? (data.length + 1) : data.length
    }, [data.length, hasNextPage]);

    const isItemLoaded = useCallback((index: number) => !hasNextPage || index < data.length, [data, hasNextPage]);

    const getItemSize: (index: number) => number = useCallback((index: number) => {
        if (collapsedRows[index]) {
            return rowHeight;
        }
        return ((data[index]?.rows?.length || 0) * 34) + rowHeight;
    }, [collapsedRows, data, rowHeight])
    const sizes = getItemSize;
    const renderTableRow = useCallback(({ data, index, style }) => {
        if (!isItemLoaded(index))
            return <div style={{ ...style, backgroundColor: 'white', textAlign: 'center', marginTop: '10px' }}>
                <BeatLoader color='#00c288' />
            </div>
        return <div className={classNames("table-row", itemRowClassName, index)} style={style} onClick={() => onRowClick && onRowClick(data[index])}>
            <TableRowComponent
                collapsedRows={collapsedRows}
                index={index}
                toggleRow={toggleRow}
                hasColumnSelection={hasColumnSelection}
                key={data[index].id || data[index][0] || index}
                columns={columns}
                topColumns={topColumns}
                singleColumns={singleColumns}
                row={data[index]}
            />
        </div>
    }, [isItemLoaded, itemRowClassName, TableRowComponent, collapsedRows, toggleRow, hasColumnSelection, columns, topColumns, singleColumns, onRowClick])

    useEffect(() => {
        if (headerContainerRef.current) {
            headerContainerRef.current.onmousedown = (e) => {
                if (e.button === 1)
                    return false
            }
        }
    }, [])

    const width = columnWidths.reduce((total, item) => item + total, 0)

    useImperativeHandle(ref, () => ({
        scrollTo: (a: any) => {
            scrollbarRef.current.scrollTop(a)
        }

    }))

    /*
    useImperativeHandle(ref, () => ({
        resetScroll: () => {
            // const top = currentScroll.current || 0;
            // fixedSizeListRef.current.scrollTo(0)
            setTimeout(() => {
            //    fixedSizeListRef.current.scrollTo(top)
            }, 10)
        }
    }), [])
    */
    return (
        <TableColumnsWidthContext.Provider value={{
            columnWidths,
            topColumnsWidth,
            singleColumnsWidth,
            selectedColumns
        }}>
            <div className="table" style={{ width: widthInput }} ref={tableRef}>
                <TableHeaderColumnSelection
                    isOpen={isColumnSelectionOpen}
                    close={close}
                    onColumnDisplayChange={onColumnDisplayChange}
                    selectedColumns={selectedColumns}
                    columns={columns} />
                <div ref={headerContainerRef} className="table-header-container">
                    <TableHeaderComponent
                        className={className}
                        width={Number(hasHorizontalScroll ? width : widthInput)}
                        columns={columns}
                        hasResizer={hasResizer}
                        onOrderChange={onOrderChange}
                        direction={direction}
                        topColumns={topColumns}
                        dropdown={dropdown}
                        renderAnchor={renderAnchor}
                        singleColumns={singleColumns}
                        hasDropDown={hasDropDown}
                        hasColumnSelection={hasColumnSelection}
                        orderBy={orderBy}
                        onOpenSelectionColumns={() => setIsColumnSelectionOpen(true)}
                        selectedColumns={selectedColumns}
                        onColumnWidthsChange={onColumnsWidthChange} />
                </div>
                <Scrollbars
                    className="TableScrollbar"
                    autoHide={false}
                    style={{ height, width: widthInput }}
                    onScroll={handleScroll}
                    renderThumbVertical={renderThumbVertical}
                    renderThumbHorizontal={renderThumbHorizontal}
                    renderView={renderView}
                    ref={scrollbarRef}
                >
                    <div className="table-body">
                        <InfiniteLoader
                            isItemLoaded={isItemLoaded}
                            itemCount={itemCount}
                            loadMoreItems={(start, end) => {
                                if (isNextPageLoading)
                                    return null
                                return loadNextPage(start, end)
                            }}
                        >
                            {({ onItemsRendered, ref }) => (
                                <>
                                    <List
                                        ref={mergeRefs([listRef, ref])}
                                        onItemsRendered={onItemsRendered}
                                        height={height}
                                        itemCount={itemCount}
                                        style={{ overflow: 'hidden' }}
                                        initialScrollOffset={0}
                                        itemData={data}
                                        itemSize={getItemSize}
                                        className="list"
                                        width={hasHorizontalScroll ? width : widthInput}>
                                        {renderTableRow}
                                    </List>
                                </>
                            )}
                        </InfiniteLoader>
                    </div>

                </Scrollbars>
            </div>
        </TableColumnsWidthContext.Provider>
    )
})

export default memo(Table)
