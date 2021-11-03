import classNames from 'classnames'
import Checkbox from 'components/form/Checkbox/Checkbox'
import React, { ReactElement } from 'react'
import { Field } from 'react-final-form'
import { FormattedMessage } from 'react-intl'
import '../assets/NotificationType.scss'

interface Props {
    className?: string;
}

function NotificationType({
    className
}: Props): ReactElement {
    return (
        <div className={classNames("notification-type", className)}>
            <label className="group-title">
                <FormattedMessage id="notification-type" defaultMessage="alert-type" />
            </label>
            <div className="d-flex checkboxes">
                <Field component={Checkbox} name="email" label="ایمیل" />
                <Field component={Checkbox} name="shortmessage" label="پیام کوتاه" />
                <Field component={Checkbox} name="siteAlert" label="هشدار سایت" />
            </div>
        </div>
    )
}

export default NotificationType
