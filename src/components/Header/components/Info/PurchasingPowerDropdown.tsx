import { Fragment, ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import NumberViewer from 'components/NumberViewer/NumberViewer'
import { IPurchasingPower } from 'types/IPurchasingPower';
import classNames from 'classnames'

interface Props extends IPurchasingPower {

}


function PurchasingPowerDropdown({
    blockedValue,
    purchaseUpperBound,
    buyingPower,
    creditRemain,
    financialRemain,
    portfolio,
    percent,
    profitLoss,
    credit
}: Props): ReactElement {
    return (
        <Fragment>
            <div key={'portfolio'} className="d-flex p-2">
                <span className="flex-grow-1">
                    {<FormattedMessage id="portfolio" defaultMessage="portfolio" />}

                </span>
                <div className="d-flex">
                    <NumberViewer value={(percent ?? 0)}>
                        <span className="ltr">
                            {(profitLoss || 0).toLocaleString()} {`(${(percent ?? 0)}%)`}
                        </span>
                    </NumberViewer>
                    <span className="mr-2">
                        {(portfolio || 0).toLocaleString()}
                    </span>

                </div>
            </div>
            <div className="d-flex p-2">
                <span className="flex-grow-1">
                    <FormattedMessage id="customer-balance" defaultMessage="customer balance" />
                </span>
                <span className={classNames('ltr', { 'is-remain-negative': (financialRemain ?? 0) < 0 })}>
                    {(Math.abs(financialRemain ?? 0) || 0).toLocaleString()}
                </span>
            </div>
            <div className="d-flex p-2">
                <span className="flex-grow-1">
                    <FormattedMessage id="net-assets" defaultMessage="net assets" />
                </span>
                <span>
                    {(purchaseUpperBound || 0).toLocaleString()}
                </span>
            </div>
            <div className="d-flex p-2">
                <span className="flex-grow-1">
                    <FormattedMessage id="blocked" defaultMessage="blocked" />
                </span>
                <span>
                    {(blockedValue || 0).toLocaleString()}
                </span>
            </div>
            <div className="d-flex p-2">
                <span className="flex-grow-1">
                    <FormattedMessage id="ceiling" defaultMessage="blocked" />
                </span>
                <span>
                    {(credit || 0).toLocaleString()}
                </span>
            </div>
            <div className="d-flex p-2">
                <span className="flex-grow-1">
                    <FormattedMessage id="Remaincredit" defaultMessage="blocked" />
                </span>
                <span>
                    {(creditRemain || 0).toLocaleString()}
                </span>
            </div>
        </Fragment>
    )
}

export default PurchasingPowerDropdown
