import React, { ReactElement } from 'react'
import documents from '../assets/document.svg'
import { FormattedMessage } from 'react-intl'
import TableHeaderStatic from 'components/Table/components/TableHeaderStatic'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import OrderCollapsableTableItem from '../components/OrderCollapsableTableItem'
import Table from 'components/Table/Table'
import { IColumn } from 'components/Table/types'
import CumulativeLoginError from './CumulativeLoginError'

const columns: IColumn[] = [
    {
        field: 'orderSide',
        header: 'سفارش',
        sort: 'orderSide',
        render: (v) => {
            if (v === 2)
                return <span className={'today-deals-sell'}>
                    فروش
                </span>
            return <span className='today-deals-buy'>
                خرید
            </span>
        }
    },
    {
        field: 'radif',
        header: 'ردیف',
        sort: 'radif',
        width: 70

    },
    {
        field: 'instrumentName',
        header: 'نماد',
        sort: 'instrumentName',
    },
    {
        field: 'quantity',
        header: 'تعداد',
        sort: 'quantity',
        width: 65,
        render: v => {
            if (v)
                return v.toLocaleString()
            return null
        }
    },
    {
        field: 'price',
        header: 'قیمت',
        sort: 'price',
        render: (v: number) => {
            if (v)
                return v.toLocaleString()
            return null
        }
    },
    {
        field: 'tradesNumber',
        header: 'تعداد معامله',
        sort: 'tradesNumber',
        render: (v: number) => {
            if (v)
                return v.toLocaleString()
            return null
        }
    },
    {
        field: 'remainQuantity',
        header: 'باقیمانده',
        sort: 'remainQuantity',
        render: (v: number) => {
            if (v)
                return v.toLocaleString()
            return null
        }
    },
    {
        field: 'orderStatusName',
        width: 75,
        header: 'لغو شده',
        sort: 'orderStatusName',
        render: (v: number) => {
            if (v || v === 0)
                return v.toLocaleString()
            return null
        }
    },
    {
        field: 'entryTime',
        header: 'زمان',
        sort: 'time',
        width: 70
    },
    {
        field: 'price',
        header: 'قیمت لحظه ای',
        sort: 'price',
        render: (v: number) => {
            if (v)
                return v.toLocaleString()
            return null
        }
    }
]

interface Props {
    height: number;
    width: number;
    items: any;
    fetchData: (startIndex: number, endIndex: number, refresh?: boolean) => any;
    error: any;
    direction: any;
    onOrderChange: any;
    orderBy: any;
    loading: boolean;
}

function CumulativeOrdersTable({
    height,
    width,
    fetchData,
    items,
    error,
    direction,
    onOrderChange,
    orderBy,
    loading
}: Props): ReactElement | null {
    const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn)

    if (isLoggedIn === null)
        return null;
    if (isLoggedIn === false) {
        return <CumulativeLoginError
            height={height}
            columns={columns}
            width={width}
        />
    }
    if (error) {
        return <div className="text-center" style={{ height: Number(height) - 65 - 32, width }}>
            <TableHeaderStatic columns={columns} width={Number(width) - 10} height={30} />
            <div className="not-data-today-trade">
                <div className="img-container" >
                    <img src={documents} alt="dear user you have not make any deal today" />
                </div>
                <span className="text">
                    <FormattedMessage id="error-occured" defaultMessage="error occured" />
                </span>
            </div>
        </div>
    }

    return <Table
        hasColumnSelection={false}
        onOrderChange={onOrderChange}
        tableRowComponent={OrderCollapsableTableItem}
        direction={direction}
        hasNextPage={items.hasNextPage}
        allDefaultOpenCalculator={(data) => {
            return ((data?.rows?.length || 0) * 37) + 35
        }}
        orderBy={orderBy}
        itemRowClassName="d-block order-item-table"
        loadNextPage={fetchData}
        width={width - 9}
        height={height}
        columns={columns}
        data={items.items ?? []}
        isNextPageLoading={loading}
    />
}

export default CumulativeOrdersTable
