import classNames from 'classnames'
import Tooltip from 'components/Tooltip/Tooltip';
import React, { memo, ReactElement } from 'react'
import { FormattedMessage } from 'react-intl';
import './assets/SymbolChangeChart.scss'

interface Props {
    yesterdayPrice?: number;
    lowerPriceThreshold?: number;
    upperPriceThreshold?: number;
    lastPrice?: number;
    closingPrice?: number;
    upperTradePrice?: number;
    lowestTradePrice?: number;
    className?: string;
}

function SymbolChangeChart({
    yesterdayPrice = 0,
    lastPrice = 0,
    lowerPriceThreshold = 0, // has not push
    upperPriceThreshold = 0, // has not push
    upperTradePrice = 0,
    lowestTradePrice = 0,
    closingPrice = 0,
    className,
}: Props): ReactElement {
    // const color = upperPriceThreshold > lowerPriceThreshold ? 'green' : 'red'
    const threeshouldMin = Math.min(upperPriceThreshold, lowerPriceThreshold);
    const threeshouldMax = Math.max(upperPriceThreshold, lowerPriceThreshold);
    const threeshouldDispute = threeshouldMax - threeshouldMin

    const leftCirclePercent = ((lowestTradePrice - threeshouldMin) * 100) / threeshouldDispute
    const rightCirclePercent = ((upperTradePrice - threeshouldMin) * 100) / threeshouldDispute
    const topAnchor = ((lastPrice - threeshouldMin) * 100) / threeshouldDispute
    const bottomAnchor = ((closingPrice - threeshouldMin) * 100) / threeshouldDispute
    // const colorWidthPercent = Math.abs(rightCirclePercent - leftCirclePercent + 3)

    const redOneWidth = rightCirclePercent > 50 && leftCirclePercent > 50 ? 0 : (rightCirclePercent > 50 ? 50 : rightCirclePercent) - leftCirclePercent;
    const greenOneWidth = rightCirclePercent <= 50 ? 0 : leftCirclePercent > 50 ? rightCirclePercent - leftCirclePercent : (rightCirclePercent - 50);

    // const tooltipId = useMemo(() => uuid(), [])

    const isInRange = leftCirclePercent >= 0 && leftCirclePercent <= 100
        && rightCirclePercent >= 0 && rightCirclePercent <= 100


    return (
        <div className={classNames("symbol-change-chart", className)}>
            {isInRange && <div className="red symbol-change-chart-line red-line" style={{ left: `${leftCirclePercent}%`, width: `${redOneWidth}%` }}>

            </div>}
            {isInRange && <div className="green symbol-change-chart-line green-line" style={{ left: `${leftCirclePercent + redOneWidth}%`, width: `${greenOneWidth}%` }}>

            </div>}
            {/* <div className={classNames(color, 'symbol-change-chart-line')} style={{
                width: `${colorWidthPercent}%`,
                left: `${leftCirclePercent}%`
            }}></div> */}
            <div style={{
                left: `${leftCirclePercent + 1}%`,
                position: 'absolute',
                transition: '0.3s ease',
                top: 4
            }}>
                <Tooltip id={`leftCircle${Math.random()}`} tooltipText={<span className="top-anchor-tooltip-text">
                    <FormattedMessage
                        id="lowest-price-today"
                        defaultMessage="lowest-price-today"
                    />
                    <span className="d-block">
                        {lowestTradePrice?.toLocaleString()}
                    </span>
                </span>}>
                    <div className="left-circle"></div>
                </Tooltip>
            </div>
            <div style={{
                left: `${rightCirclePercent + 1}%`,
                transition: '0.3s ease',
                position: 'absolute',
                top: 4
            }}>
                <Tooltip id={`rightCircle${Math.random()}`} tooltipText={<span className="top-anchor-tooltip-text">
                    <FormattedMessage
                        id="highest-price-today"
                        defaultMessage="highest-price-today"
                    />
                    <span className="d-block">
                        {upperTradePrice?.toLocaleString()}
                    </span>
                </span>}>
                    <div className="right-circle"></div>
                </Tooltip>
            </div>

            <div className="left-number">
                <Tooltip id={`lower${Math.random()}`} tooltipText='کمترین'>
                    {threeshouldMin.toLocaleString()}
                </Tooltip>
            </div>
            <div className="right-number">
                <Tooltip id={`upper${Math.random()}`} tooltipText='بیشترین'>
                    {threeshouldMax.toLocaleString()}
                </Tooltip>
            </div>
            <div className="center-number">
                <Tooltip id={`yesterday${Math.random()}`} tooltipText='دیروز'>
                    {yesterdayPrice.toLocaleString()}
                </Tooltip>
            </div>

            <div className="bottom-anchor" style={{ left: `${topAnchor}%` }}>
                <Tooltip id={`top-anchor${Math.random()}`} tooltipText={<span className="top-anchor-tooltip-text">

                    <FormattedMessage
                        id="last-price"
                        defaultMessage="last price"
                    />
                    <span className="d-block">
                        {lastPrice?.toLocaleString()}
                    </span>
                </span>}>
                    <i className="online-icon-angel-down"></i>
                </Tooltip>
            </div>
            {<div className="top-anchor" style={{ left: `${bottomAnchor}%` }}>
                <Tooltip id='bottom-anchor' tooltipText={<span className="top-anchor-tooltip-text">
                    <FormattedMessage
                        id="final-price"
                        defaultMessage="final price"
                    />
                    <span>
                        {closingPrice?.toLocaleString()}
                    </span>
                </span>}>
                    <i className="online-icon-angel-up"></i>
                </Tooltip>
            </div>}
        </div>
    )
}

export default memo(SymbolChangeChart)
