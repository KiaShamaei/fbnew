import classNames from 'classnames';
import TableColumnsWidthContext from 'components/Table/TableContext';
import { TableRowProps } from 'components/Table/types'
import React, { ReactElement, useContext, useMemo } from 'react'
import { useCallback } from 'react';
import { Fragment } from 'react'
import { IOrderCollapsable } from '../meta/types'
import '../assets/OrderCollapsableTableItem.scss'
import Button from 'components/Button/Button';
import OrdersContext from '../contexts/OrdersContext';
import { defineMessages, useIntl, FormattedMessage } from 'react-intl';
interface Props extends TableRowProps<IOrderCollapsable> {

}

const messages = defineMessages({
    editTheCumulativePurchaseOfTheNameSymbolAtPriceOfNumNumShares: {
        id: 'edit-the-cumulative-purchase-of-the-name-symbol-at-a-price-of-num-num-shares',
        defaultMessage: 'edit the cumulative purchase of the {name} symbol at {num} shares'
    },
    cancelCumulativeOrders: {
        id: 'cancel-cumulative-orders',
        defaultMessage: 'cancel cumulative orders'
    }
})

function OrderCollapsableTableItem({
    columns,
    row,
    hasColumnSelection,
    toggleRow,
    collapsedRows: openedRows = {},
    index
}: Props): ReactElement {
    const title = row.title;
    const rows = row.rows || [];

    const {
        columnWidths
    } = useContext(TableColumnsWidthContext)
    const {
        openCurrentOrder
    } = useContext(OrdersContext)

    const toggle = useCallback(() => {
        if (toggleRow)
            toggleRow(index, 35)
    }, [toggleRow, index])

    const intl = useIntl()

    const getRowClassName = useCallback((order?: number) => {
        return classNames("order-collapsable-table-item-row d-flex", {
            'red': order === 2,
            'green': order === 1,
        })
    }, [])


    const number = useMemo(() => row.rows.reduce((total, item) => {
        return total + item.quantity
    }, 0), [row]);

    return (
        <Fragment>
            <div className="order-collapsable-table-item-icons">
                <i className={classNames("icon", { 'plus': openedRows[index] })} onClick={toggle}></i>
                {title}
                <div className="flex-grow-1 text-left">
                    <Button color="blue" onClick={() => openCurrentOrder(row, 'EDIT',
                        intl.formatMessage(messages.editTheCumulativePurchaseOfTheNameSymbolAtPriceOfNumNumShares, {
                            name: title,
                            num: number,
                        }), row.orderSide,
                        row.lowerPriceThreshold,
                        row.upperPriceThreshold)}>
                        <FormattedMessage id="edit" defaultMessage="edit" />
                    </Button>
                    {' '}
                    <Button onClick={() => openCurrentOrder(row, 'CANCEL',
                        intl.formatMessage(messages.cancelCumulativeOrders), row.orderSide,
                        row.lowerPriceThreshold,
                        row.upperPriceThreshold)} className="" color="red">
                        <FormattedMessage id="cancel" defaultMessage="cancel" />
                    </Button>
                </div>
            </div>
            <div className={classNames("order-collapsable-table-rows w-100", { 'd-none': openedRows[index] })}>
                {rows.map(row => <div key={row.id} className={getRowClassName(row.orderSide)}>
                    {columns.map((column, index) => <div style={{ width: column.width || columnWidths[index], textAlign: 'center' }} key={column.field}>
                        {column.render ? column.render((row as any)[column.field], row) : (row as any)[column.field]}
                    </div>)}
                </div>)}
            </div>
            {/*hasColumnSelection && <div style={{ width: 36 }} className={'cell'}></div>*/}
        </Fragment>
    )
}

export default OrderCollapsableTableItem
