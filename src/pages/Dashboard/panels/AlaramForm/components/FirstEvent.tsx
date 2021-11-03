import classNames from 'classnames'
import RadioButtonCore from 'components/form/RadioButtonCore/RadioButtonCore'
import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import '../assets/FirstEvent.scss'

interface Props {
    className?: string;
}

function FirstEvent({
    className
}: Props): ReactElement {
    return (
        <div className={classNames("d-flex", className)}>
            <RadioButtonCore className="my-auto d-block" isSelected={true} />
            <span className="radio-title my-auto d-block mr-1">
                <FormattedMessage id="first-event" defaultMessage="first event" />
            </span>
        </div>
    )
}

export default FirstEvent
