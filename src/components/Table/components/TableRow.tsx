import { Fragment, memo, ReactElement, useContext } from 'react'
import TableColumnsWidthContext from '../TableContext'
import { TableRowProps } from '../types'
import TableCell from './TableCell'


function TableRow({
    row,
    columns,
    topColumns = [],
    singleColumns = [],
    hasColumnSelection = true,
    toggleRow,
    onClick
}: TableRowProps): ReactElement {
    const { columnWidths, singleColumnsWidth, selectedColumns } = useContext(TableColumnsWidthContext)
    return (
        <Fragment>

            {singleColumns.map((singleColumn, index) => <TableCell
                width={singleColumnsWidth ? singleColumnsWidth[index] : columnWidths[index]}
                display={selectedColumns[singleColumn.sort]}
                key={index}
                cellClassName={singleColumn.cellClassName}
                render={singleColumn.render}
                row={row}
                data={(row || {})[singleColumn.field]}
            />)}
            {columns.map((column, index) => <TableCell
                width={columnWidths[index]}
                display={selectedColumns[column.sort]}
                key={index}
                onClick={column.onClick}
                cellClassName={column.cellClassName}
                render={column.render}
                row={row}
                data={(row || {})[column.field]}
            />)}
            {hasColumnSelection && <div style={{ width: 36 }} className={'cell'}>
            </div>}
        </Fragment>
    )
}

export default memo(TableRow)
