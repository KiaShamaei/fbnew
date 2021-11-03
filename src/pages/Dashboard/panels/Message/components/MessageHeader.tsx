import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'

function MessageHeader(): ReactElement {
    return (
        <div className="message-header">
            <span className="title">
                <FormattedMessage id="news" defaultMessage="news" />
            </span>
            <i className="online-icon-filter"></i>
        </div>
    )
}

export default MessageHeader
