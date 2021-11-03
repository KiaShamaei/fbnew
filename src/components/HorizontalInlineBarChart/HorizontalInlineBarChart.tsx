import { ReactElement, useMemo } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import ReactTooltip from 'react-tooltip'
import './assets/HorizontalInlineBarChart.scss'

const messages = defineMessages({
    ask: {
        id: 'ask',
        defaultMessage: 'ask'
    },
    bid: {
        id: 'bid',
        defaultMessage: 'bid'
    }
})

const getUniqueId = () => new Date().getTime() + Math.random() + '' + Math.random() + '' + Math.random()

interface Props {
    green: number;
    red: number;
    onClick?: () => void;
}

function HorizontalInlineBarChart({
    green,
    red,
    onClick
}: Props): ReactElement {
    // const intl = useIntl()
    // const id = useMemo(() => getUniqueId(), [])
    return (
        <div className="horizontal-inline-bar-chart" onClick={onClick}>
            <div style={{ width: green + '%' }} className="green"></div>
            <div style={{ width: red + '%' }} className="red"></div>
            <div style={{ width: 100 - Math.abs(green + red) + '%' }} className="gray"></div>
        </div>
    )
}

export default HorizontalInlineBarChart
