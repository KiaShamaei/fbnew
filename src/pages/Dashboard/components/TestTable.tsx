import React, { ReactElement, useEffect, useRef, useState } from 'react'
import HorizontalInlineBarChart from 'components/HorizontalInlineBarChart/HorizontalInlineBarChart';
import Table from 'components/Table/Table'
import { DirectionType, IColumn } from 'components/Table/types';


function getRndInteger(min: number, max: number) {
    return Math.floor(Math.random() * (max - min)) + min;
}

function generateRandomData() {
    const data = [...Array(35)].map((item, index) => {
        const green = getRndInteger(0, 10)
        const red = getRndInteger(1, 10 - green)
        return {
            id: Date.now() + '_' + Math.random(),
            name: Math.round(Math.random() * 985000 + 15000),
            label: Math.round(Math.random() * 985000 + 15000),
            label2: Math.round(Math.random() * 985000 + 15000),
            label3: Math.round(Math.random() * 985000 + 15000),
            arze: { green: green / 10, red: red / 10 }
        }
    })
    return data
}

const columns: IColumn[] = [
    {
        field: 'name',
        header: 'نماد',
        sort: 'name',
        cellClassName: 'text-right pr-2',
    },
    {
        field: 'label',
        header: 'تعداد',
        sort: 'label45',
    },
    {
        field: 'label',
        header: 'خالص میانگین',
        sort: 'label',
    },
    {
        field: 'label2',
        header: 'سر به سر',
        sort: 'label5',
    },
    {
        field: 'arze',
        header: 'تقاضا عرضه',
        sort: 'arze',
        width: 150,
        cellClassName: 'px-8',
        render: (arze: any) => <div style={{ marginTop: 16 }}>
            <HorizontalInlineBarChart green={arze.green} red={arze.red} />
        </div>
    },
    {
        field: 'label3',
        header: 'سود/زیان خالص',
        sort: 'label3',
    },
    {
        field: 'label',
        header: 'سود مجموع',
        sort: 'label4'
    }
]

interface Props {
    height?: number;
    width: number;
    index?: number;
}

function TestTable({
    height = 600,
    width,
    index
}: Props): ReactElement {
    const [items, setItems] = useState(generateRandomData())
    const [isNextPageLoading] = useState(false)
    const [orderBy, setOrderBy] = useState<string>()
    const [direction, setDirection] = useState<DirectionType>()
    const ref = useRef<any>(null)
    useEffect(() => {
        if(ref && ref.current) {
            // ref.current.resetScroll()
        }
    }, [index])
    return (
        <Table
            ref={ref}
            position={index}
            hasColumnSelection={false}
            onOrderChange={(sort, direction) => {
                setOrderBy(sort)
                setDirection(direction)
                setItems(generateRandomData())
            }}
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

export default TestTable
