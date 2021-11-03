import React, { Fragment, memo, ReactElement } from 'react'
import { IColumn } from '../types'
import TableRow from './TableRow'

interface Props {
    columns: IColumn[],
    data: any[],
    hasColumnSelection?: boolean
}

function TableBody({
    columns,
    data,
    hasColumnSelection = true
}: Props): ReactElement {
    return (
        <Fragment>
            {/**  */}
            {data.map(row => <TableRow index={0} hasColumnSelection={hasColumnSelection} key={row.id || row[0]} row={row} columns={columns} />)}
        </Fragment>
    )
}

export default memo(TableBody)
