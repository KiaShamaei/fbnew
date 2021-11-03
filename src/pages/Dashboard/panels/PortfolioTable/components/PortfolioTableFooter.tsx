import NumberViewer from 'components/NumberViewer/NumberViewer'
import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import '../assets/PortfolioTableFooter.scss'

function PortfolioTableFooter(): ReactElement | null {
    const {
        portfolio,
        profitLoss
    } = useSelector((state: IReduxState) => state?.purchasingPower?.purchasingPower ?? {})

    if(!portfolio && !profitLoss) {
        return null;
    }

    return (
        <div className="portfolio-table-footer">
            <div className="flex-grow-1">
                <div className="total-value">
                    <FormattedMessage
                        id="total-portfolio-value-base-of-last-price"
                        defaultMessage="total portfolio value base of last price"
                    />{': '}
                    {portfolio?.toLocaleString()}
                </div>
            </div>
            <div className="d-flex">
                <div>
                    <FormattedMessage
                        id="loss-base-on-last-price"
                        defaultMessage="loss base on last price"
                    /> 
                </div>
                <span className="ml-1">
                    {':'}
                </span>
                <NumberViewer value={profitLoss ?? 0}>
                    <span className="ltr">
                        {profitLoss?.toLocaleString()}
                    </span>
                </NumberViewer>
            </div>
        </div>
    )
}

export default PortfolioTableFooter
