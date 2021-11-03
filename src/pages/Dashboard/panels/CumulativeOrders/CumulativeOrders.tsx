import { IPanelItemProps } from 'pages/Dashboard/meta/types'
import { ReactElement, useCallback, useState } from 'react'

import useOrderDetail from './hooks/orderDetail'
import OrderCancelTable from './components/OrderToCancel'
import OrdersContext from './contexts/OrdersContext'
import OrderToEdit from './components/OrderToEdit'
import CumulativeOrdersTable from './components/CumulativeOrdersTable'
import { cumativeOrderListParser } from './meta/parser'
import useTableStates from 'components/Table/hooks/useTableStates'
import useDataGetter from 'hooks/useDataGetter'

interface Props extends IPanelItemProps {
}

function CumulativeOrders({
    height,
    width
}: Props): ReactElement | null {


    const [items, setItems] = useState<any>({
        items: [],
        hasNextPage: true
    })

    const {
        loading,
        error,
        fetch,
    } = useDataGetter({
        url: `/order`,
        fetchFirst: false,
        parseData: true
    })

    const {
        direction,
        onOrderChange,
        orderBy
    } = useTableStates({
        fetch: () => {
            // fetchData(0,0)
        }
    })

    const fetchData = useCallback((startIndex: number, endIndex: number, refresh?: boolean) => {
        const realEndIndex = items.items.slice(0, endIndex).reduce((total: number, item: any) => total + (item.rows.length ?? 0), 0)
        return fetch({
            page: Math.ceil(realEndIndex / 12) + 1,
            limit: 12
        }).then((data) => {
            const finalData: any[] = cumativeOrderListParser(data)
            // const finalDataLength = finalData.reduce((total, item) => (item.rows.length ?? 0) + total,0) 
            setItems((items: any) => ({
                items: refresh ? finalData : items.items.concat(finalData),
                hasNextPage: data.length > 12
            }))
        })
    }, [fetch, items.items])

    const [currentOrder, openCurrentOrder, closeCurrentOrder] = useOrderDetail()
    return (
        <OrdersContext.Provider value={{
            close: closeCurrentOrder,
            openCurrentOrder: openCurrentOrder,
            currentOrder
        }}>
            <CumulativeOrdersTable
                height={height}
                width={width}
                direction={direction}
                error={error}
                fetchData={fetchData}
                items={items}
                onOrderChange={onOrderChange}
                loading={loading}
                orderBy={orderBy}
            />
            {currentOrder?.mode === 'EDIT' && <OrderToEdit
                data={currentOrder.order.rows}
                orderSide={currentOrder.orderSide}
                title={currentOrder.title}
                order={currentOrder.order}
                loweCasePrice={currentOrder.order?.lowerPriceThreshold}
                upperCasePrice={currentOrder.order?.upperPriceThreshold}
                fetchData={fetchData}
                close={closeCurrentOrder}
            />}
            {currentOrder?.mode === 'CANCEL' && <OrderCancelTable
                data={currentOrder.order.rows}
                orderSide={currentOrder.orderSide}
                title={currentOrder.title}
                order={currentOrder.order}
                fetchData={fetchData}
                close={closeCurrentOrder}
            />}
        </OrdersContext.Provider>
    )
}

export default CumulativeOrders