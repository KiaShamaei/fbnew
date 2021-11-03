import React, {
    ForwardedRef,
    forwardRef,
    memo,
    useCallback,
    useContext,
    useEffect,
    useMemo,
    useRef
} from 'react'
import classnames from 'classnames'
import { IColumn, IColumnDisplayModel, ISortTableProps } from '../types'
import TableColumnsWidthContext from '../TableContext'
import classNames from 'classnames'
import '../assets/TableHeader.scss'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { IAnchorProps } from 'components/DropdownMenu/meta/types'

export interface tableHeaderProps extends ISortTableProps {
    columns: IColumn[];
    singleColumns?: IColumn[];
    onColumnWidthsChange: (columns: number[]) => void;
    selectedColumns: IColumnDisplayModel;
    onOpenSelectionColumns: () => void;
    hasColumnSelection?: boolean;
    topColumns?: IColumn[];
    width: number;
    className?: string;
    dropdown?: any;
    renderAnchor?: any;
    hasResizer?: boolean;
    hasDropDown?: boolean;
}


function TableHeader({
    columns,
    onColumnWidthsChange,
    selectedColumns,
    singleColumns,
    topColumns,
    onOrderChange,
    hasResizer = false,
    direction,
    className,
    hasDropDown,
    orderBy,
    width,
    hasColumnSelection = true,
    onOpenSelectionColumns,
}: tableHeaderProps, ref?: ForwardedRef<HTMLDivElement>): JSX.Element {
    const { columnWidths } = useContext(TableColumnsWidthContext)
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
        <div className={classNames("table-header", className)} ref={ref} style={{ width }}>

            {columns.map((column, index) => <div
                className={classnames("table-header-cell", { 'd-none': selectedColumns[column.sort] === false }, column.cellClassName)}
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

            </div>)}

            {hasColumnSelection && <div className="table-header-cell" style={{ width: 36 }}>
                <span onClick={onOpenSelectionColumns}>
                    Click
                </span>
            </div>}
        </div>
    )
}

export default memo(forwardRef<HTMLDivElement, tableHeaderProps>(TableHeader))
