import classNames from 'classnames'
import React, { ReactElement } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import '../assets/StockReturns.scss'

const messages = defineMessages({
    oneMonth: {
        id: 'one-month',
        defaultMessage: 'one month'
    },
    oneYear: {
        id: 'one-year',
        defaultMessage: 'one year'
    },
    threeYear: {
        id: 'three-year',
        defaultMessage: 'three year'
    },
    threeMonths: {
        id: 'three-months',
        defaultMessage: 'three months'
    }
})

export interface IStokeReturnChartProps {
    value: number;
    scope: string;
}


const Chart: (props: IStokeReturnChartProps) => ReactElement = ({
    scope,
    value
}: IStokeReturnChartProps) => {
    const color = value > 60 ? 'color-white' : 'color-black';
    return <div className="stoke-return-chart d-flex mt-4">

        <div className="profit-container px-2">
            <div className="profit " style={{ width: value > 0 ? `${value}%` : 0 }} />
            {value > 0 && <span className={classNames("value", color)}>{value.toFixed(2)}%</span>}
        </div>
        <div className="scope">
            {scope}
        </div>
        <div className="damage-container px-2">
            <div className="damage " style={{ width: value < 0 ? `${-value}%` : 0 }} />
            {value < 0 && <span className={classNames("value", color)}>{value.toFixed(2)}%</span>}
        </div>

    </div>
}

interface StockReturnsProps {
    lastMonthTurnover?: number,
    lastThreeMonthesTurnover?: number
} 

function StockReturns({
    lastMonthTurnover = 0,
    lastThreeMonthesTurnover = 0
}: StockReturnsProps): ReactElement {
    const intl = useIntl()
    return (
        <div className="stock-returns">
            <Chart value={lastMonthTurnover} scope={intl.formatMessage(messages.oneMonth)} />
            {/*<Chart value={-52} scope={intl.formatMessage(messages.oneYear)} />*/}
            <Chart value={lastThreeMonthesTurnover} scope={intl.formatMessage(messages.threeMonths)} />
        </div>
    )
}

export default StockReturns
