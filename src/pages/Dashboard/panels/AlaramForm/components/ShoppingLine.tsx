import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'

import FirstEvent from './FirstEvent'
import MessageText from './MessageText'
import NotificationType from './NotificationType'

function ShoppingLine(): ReactElement {
    return (
        <div>
            <label className="group-title mt-5">
                <FormattedMessage id="valid-until" defaultMessage="valid until" />
            </label>
            <FirstEvent className="mt-2" />
            <MessageText className="mt-5" />
            <NotificationType className="mt-5" />
        </div>
    )
}

export default ShoppingLine
