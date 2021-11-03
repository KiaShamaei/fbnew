import { TableRowProps } from 'components/Table/types'
import React, { ReactElement, Fragment } from 'react'
import { IOrder } from 'types/IOrder'

interface Props extends TableRowProps<IOrder> {

}

function OrderTableItem({
    columns,
    row,
    hasColumnSelection
}: Props): ReactElement {
    return (
        <Fragment>
            {columns.map(column => <div key={column.field}>
                {(row as any)[column.field]}
            </div>)}
        </Fragment>
    )
}

export default OrderTableItem
