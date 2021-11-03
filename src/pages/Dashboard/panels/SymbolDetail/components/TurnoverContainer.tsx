import React, { ReactElement } from 'react'
import Turnover from 'components/Turnover/Turnover'
import { FormattedMessage } from 'react-intl'
import '../assets/TurnoverContainer.scss'
import classNames from 'classnames'

interface Props {
    color: 'green' | 'red';
    className?: string;
    value?: number;
}

function TurnoverContainer({
    color,
    className,
    value
}: Props): ReactElement {
    return (
        <div style={{ transform: color === 'green' ? `translateX(10px)` : '' }} className={classNames("pt-0 symbol-turnover-legal", className)}>
            <Turnover value={value} color={color} />
            <div className="text-center symbol-turnover-text color-green d-flex justify-content-space-between">
                <div className="legal">
                    <FormattedMessage id="legal" defaultMessage="legal" />
                </div>
                <div className={classNames("main-title", color)}>
                    {color === 'green'
                        ?
                        <FormattedMessage id="buy" defaultMessage="buy" />
                        :
                        <FormattedMessage id="sell" defaultMessage="sell" />
                    }

                </div>
                <div className="real">
                    <FormattedMessage id="real" defaultMessage="real" />
                </div>
            </div>
        </div>
    )
}

export default TurnoverContainer
