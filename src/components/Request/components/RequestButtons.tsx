import React, { ReactElement, ReactNode } from 'react'
import Button from 'components/Button/Button'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import classNames from 'classnames'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import Tooltip from 'components/Tooltip/Tooltip'
import './assets/RequestButtons.scss'

const messages = defineMessages({
    toRegisterRequestYouShouldFirstLogin: {
        id: 'to-register-request-you-should-first-login',
        defaultMessage: 'to register request you should first login'
    }
})

interface Props {
    buttonClassName: string;
    className: string;
    requestName: string;
    label?: ReactNode | string;
 
}

function RequestButtons({
   
    buttonClassName,
    className,
    requestName,
    label =  <FormattedMessage id="register-request" defaultMessage="register request" />
}: Props): ReactElement {

    const intl = useIntl()

    const isLoggedIn = useSelector((state: IReduxState) => state.user.isLoggedIn)
    if (!isLoggedIn) {
        return (
            <div className={classNames(className)}>
                <Tooltip id={requestName} tooltipText={intl.formatMessage(messages.toRegisterRequestYouShouldFirstLogin)}>
                    <Button type="button" className={classNames('disabled request-button',buttonClassName)} >
                        {label}
                    </Button>
                </Tooltip>
            </div>
        )
    }
    return (
        <div className={classNames(className)}>
            <Button className={classNames(buttonClassName)}>
                {label}
            </Button>
        </div>
    )
}

export default RequestButtons
