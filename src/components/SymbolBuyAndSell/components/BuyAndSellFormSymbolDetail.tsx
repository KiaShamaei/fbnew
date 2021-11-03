import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import { ReactNode } from 'react';
import '../assets/BuyAndSellFormSymbolDetail.scss'
import NumberViewer from 'components/NumberViewer/NumberViewer'
import NumberFormatter from 'components/Formatters/NumberFormatter';

interface IColumn {
    field: string;
    label: ReactNode | string;
    render: (v: any, row: any) => ReactNode | string
}

const columns: IColumn[] = [
    {
        field: 'closingPrice',
        label: <FormattedMessage id="final-price" defaultMessage="final-price" />,
        render: (v: number = 0, row: any) => <NumberViewer value={row.closingPricePercent}>
            <span>{v.toLocaleString()}</span>
            <span className="ml-2 ltr">{`(${row.closingPricePercent}%)`}</span>
        </NumberViewer>
    },
    {
        field: 'totalNumberOfSharesTraded',
        label: <FormattedMessage id="volume" defaultMessage="volume" />,
        render: (v: number) => <NumberFormatter>
            {v}
        </NumberFormatter>
    },
    {
        field: 'lowerPriceThreshold',
        label: <FormattedMessage id="price-threshold" defaultMessage="price threshold" />,
        render: (v = 0, row) => `${(v).toLocaleString()}/${(row?.upperPriceThreshold ?? 0).toLocaleString()}`
    },
    {
        field: 'minimumOrderQuantity',
        label: <FormattedMessage id="threshold-count" defaultMessage="threshold count" />,
        render: (minimumOrderQuantity = 0, row) => `${minimumOrderQuantity.toLocaleString()}/${(row?.maximumOrderQuantity ?? 0).toLocaleString()}`
    }
];

interface BuyAndSellFormSymbolDetailItemProps {
    label: ReactNode,
    render: (v: any, row: any) => ReactNode,
    value: any,
    row: any
}

const BuyAndSellFormSymbolDetailItem = ({
    label,
    render,
    value,
    row
}: BuyAndSellFormSymbolDetailItemProps) => {
    return <div className="d-flex w-50 flex-wrap buy-and-sell-form-symbol-detail-item">
        <label>
            {label}
        </label>
        {render(value, row)}
    </div>
}

interface Props {
    closingPrice: number,
    totalNumberOfSharesTraded: number,
    lowerPriceThreshold: number,
    upperPriceThreshold: number,
    maximumOrderQuantity: number
    closingPricePercent: number;
}

function BuyAndSellFormSymbolDetail(data: Props): ReactElement {
    return (
        <div className="d-flex flex-wrap buy-and-sell-form-symbol-detail">
            {columns.map(column => <BuyAndSellFormSymbolDetailItem
                label={column.label}
                render={column.render}
                row={data}
                value={(data as any)[column.field]}
            />)}
        </div>
    )
}

export default BuyAndSellFormSymbolDetail
