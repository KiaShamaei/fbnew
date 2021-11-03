import React, { ReactElement } from 'react'
import { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import { ActiveLoginFormType } from '../meta/types'

interface Props {
    activeForm: ActiveLoginFormType,
    close: () => void;
    goBack: () => void;
    goBackLogin: () => void;

}

function LoginSidebarHeader({
    activeForm,
    close,
    goBack,
    goBackLogin
}: Props): ReactElement {
    const getTitle = useCallback(() => {
        if (activeForm === 'FORGOTT_PASSWORD_GET_VALIDATION_CODE' || activeForm === 'FORGOT_PASSWORD_CONFIRM_CODE') {
            return <FormattedMessage
                id="forget-password"
                defaultMessage="forget password"
            />
        } else {
            return <FormattedMessage
                id="login"
                defaultMessage="login"
            />
        }
    }, [activeForm])

    return (
        <div className="d-flex title-close">
            <div className="title flex-grow-1">
                {getTitle()}
            </div>

            {activeForm === 'OTP' ? null : activeForm !== 'LOGIN' && <i className="online-icon-left-arrow-circle back cursor-pointer" onClick={goBack}></i>}
            {activeForm === 'LOGIN' && <i className="online-icon-close close cursor-pointer" onClick={close}></i>}
            {activeForm === 'OTP' && <i className="online-icon-left-arrow-circle back cursor-pointer" onClick={goBackLogin}></i>}

        </div>
    )
}

export default LoginSidebarHeader
