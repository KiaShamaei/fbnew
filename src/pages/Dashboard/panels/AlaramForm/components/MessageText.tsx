import TextField from 'components/form/TextField/TextField'
import React, { ReactElement } from 'react'
import { Field } from 'react-final-form'
import { useIntl } from 'react-intl'

interface Props {
    className?: string;
}

function MessageText({
    className
}: Props): ReactElement {
    const intl = useIntl();
    return (
        <div className={className}>
            <Field component={TextField} tag="textarea" name="messageText" placeholder={intl.formatMessage({
                id: 'message-text',
                defaultMessage: 'message text'
            })} />
        </div>
    )
}

export default MessageText
