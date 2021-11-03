import React, { ReactElement, useState } from 'react'
import Table from 'components/Table/Table'
import { IColumn } from 'components/Table/types';
import useTableStates from 'components/Table/hooks/useTableStates';

function generateRandomData() {
    return [
        {
            id: 1,
            nemad: 'فطی',
            type: 'SELL',
            desc: 'فروش 7 سهم کشاورزی و دامپروری ملارد شیر 49،020 ریال',
            date: '1399/07/06',
            number: 7,
            price: 343140
        },
        {
            id: 2,
            nemad: 'فطی',
            type: 'BUY',
            desc: 'فروش 7 سهم کشاورزی و دامپروری ملارد شیر 49،020 ریال',
            date: '1399/07/06',
            number: 7,
            price: 343140
        },
        {
            id: 3,
            nemad: 'فطی',
            type: 'BUY',
            desc: 'فروش 7 سهم کشاورزی و دامپروری ملارد شیر 49،020 ریال',
            date: '1399/07/06',
            number: 7,
            price: 343140
        },
        {
            id: 4,
            nemad: 'فطی',
            type: 'SELL',
            desc: 'فروش 7 سهم کشاورزی و دامپروری ملارد شیر 49،020 ریال',
            date: '1399/07/06',
            number: 7,
            price: 343140
        },
        {
            id: 4,
            nemad: 'فطی',
            type: 'BUY',
            desc: 'فروش 7 سهم کشاورزی و دامپروری ملارد شیر 49،020 ریال',
            date: '1399/07/06',
            number: 7,
            price: 343140
        },
        {
            id: 5,
            nemad: 'فطی',
            type: 'SELL',
            desc: 'فروش 7 سهم کشاورزی و دامپروری ملارد شیر 49،020 ریال',
            date: '1399/07/06',
            number: 7,
            price: 343140
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
        field: 'desc',
        header: 'شرح',
        sort: 'desc',
        width: 450
    },
    {
        field: 'date',
        header: 'تاریخ',
        sort: 'date',
        width: 120
    },
    {
        field: 'number',
        header: 'تعداد',
        sort: 'number',
        width: 55
    },
    {
        field: 'price',
        header: 'قیمت',
        sort: 'price',
        width: 65
    }
]

interface Props {
    height?: number;
    width: number;
    index?: number;
}

function TodayAccountTurnover({
    width,
    height,
    index
}: Props): ReactElement {
    const [items, setItems] = useState(generateRandomData())
    const [isNextPageLoading] = useState(false)
    const {
        direction,
        onOrderChange,
        orderBy
    } = useTableStates({
        fetch: () => {
            setItems(generateRandomData())
        }
    })
    return (
        <Table
            position={index}
            hasColumnSelection={false}
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
        />)
}

export default TodayAccountTurnover
