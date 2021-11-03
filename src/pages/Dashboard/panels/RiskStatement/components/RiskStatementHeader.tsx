import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import '../assets/RiskStatementHeader.scss'

function RiskStatementHeader(): ReactElement {
    return (
        <div className="risk-statement-header">
            <span className="risk-statement-title">
                <FormattedMessage id="risk-statement" defaultMessage="risk statement" />
            </span>
        </div>
    )
}

export default RiskStatementHeader
