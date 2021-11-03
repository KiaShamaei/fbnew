import classNames from 'classnames'
import React, { ReactElement } from 'react'
import { IColumn } from '../types'

interface Props {
    columns: IColumn[];
    width: number;
    height?: number | string;
    className?: string;
    hasDropDown?: boolean;
}

function TableHeaderStatic({
    columns,
    width,
    className,
    height,
    hasDropDown,
}: Props): ReactElement {
    return (
        <div className={classNames("table-header", className)} style={{
            width,
            height: height
        }}>
            {columns.map((column, index) => <div
                className={classNames("table-header-cell", column.cellClassName)}
                style={{
                    width: Number(width) / columns.length,
                }}
                key={column.sort}>
                {column.header}
            </div>)}
            {hasDropDown ? <div>  </div> : null}
        </div>
    )
}

export default TableHeaderStatic
