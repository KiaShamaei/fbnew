import useTableStates from 'components/Table/hooks/useTableStates'
import Table from 'components/Table/Table'
import { IColumn } from 'components/Table/types'
import { IPanelItemProps } from 'pages/Dashboard/meta/types'
import { ReactElement, useState } from 'react'
import '../assets/TodaysDeals.scss'

function generateRandomData() {
    return [
        {
            id: 1,
            nemad: 'شصدفح',
            type: 'SELL',
            time: '11:07:15',
            number: 7,
            price: 189570,
            value: 343140
        },
        {
            id: 2,
            nemad: 'سپیدار',
            type: 'BUY',
            time: '11:07:15',
            number: 50,
            price: 189570,
            value: 343140
        },
        {
            id: 3,
            nemad: 'فطی',
            type: 'BUY',
            time: '11:07:15',
            number: 100,
            price: 189570,
            value: 343140
        },
        {
            id: 4,
            nemad: 'وخارزم',
            type: 'SELL',
            time: '11:07:15',
            number: 500,
            price: 189570,
            value: 343140
        },
        {
            id: 4,
            nemad: 'شصدفح',
            type: 'BUY',
            time: '11:07:15',
            number: 50,
            price: 189570,
            value: 343140
        }

    ]
}

const columns: IColumn[] = [
    {
        field: 'nemad',
        header: 'نماد',
        sort: 'nemad',
        cellClassName: 'text-right pr-2',
    },
    {
        field: 'type',
        header: 'نوع',
        sort: 'type',
        render: (v) => {
            if (v === 'SELL')
                return <span className={'today-deals-sell'}>
                    فروش
                </span>
            return <span className='today-deals-buy'>
                خرید
            </span>
        }
    },
    {
        field: 'time',
        header: 'زمان',
        sort: 'time',
    },
    {
        field: 'price',
        header: 'قیمت',
        sort: 'price',
        render: (v: number) => {
            if(v)
                return v.toLocaleString()
            return null
        }
    },
    {
        field: 'value',
        header: 'ارزش',
        sort: 'value',
        render: (v: number) => {
            if(v)
                return v.toLocaleString()
            return null
        }
    }
]

interface Props extends IPanelItemProps {
}

function TodaysDeals({
    height,
    width
}: Props): ReactElement {
    const [items, setItems] = useState(generateRandomData())
    const [isNextPageLoading] = useState(false)
    const {
        direction,
        onOrderChange,
        orderBy
    } = useTableStates({
        fetch: () => {
            setItems(state => state.concat(generateRandomData()))
        }
    })
    return (
        <Table
            hasColumnSelection={true}
            onOrderChange={onOrderChange}
            
            direction={direction}
            orderBy={orderBy}
            loadNextPage={(startIndex: number, endIndex: number) => {
                setTimeout(() => {
                    const data = generateRandomData()
                    setItems(items => items.concat(data))
                }, 1000)
                return null
            }}
            width={width - 9}
            height={height}
            columns={columns}
            data={items}
            isNextPageLoading={isNextPageLoading}
        />
    )
}

export default TodaysDeals
