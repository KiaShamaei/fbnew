import React, { ReactElement } from 'react'
import LoginForm from './LoginForm'
import GetValidationCodeForm from './GetValidationCodeForm'
import ConfirmCodeForm from './ConfirmCodeForm'
import '../assets/LoginSidebar.scss'
import { useContext } from 'react'
import { LoginContext } from '../contexts/LoginContext'
import useClickOutside from 'hooks/useClickOutside'
import { useRef } from 'react'
import classNames from 'classnames'
import LoginSidebarHeader from './LoginSidebarHeader'
import { ActiveLoginFormType } from '../meta/types'
import OtpLogin from './otpLogin'


const getActiveIndex = (input: ActiveLoginFormType) => {
    switch (input) {
        case 'OTP':
            return 3;
        case 'LOGIN':
            return 2;
        case 'FORGOTT_PASSWORD_GET_VALIDATION_CODE':
            return 1;
        case 'FORGOT_PASSWORD_CONFIRM_CODE':
            return 0;

        default:
            // default is login form
            return 2;
    }
}



function LoginSidebar(): ReactElement | null {

    const {
        close,
        getValidationCode,
        confirmCode,
        goBack,
        gotToLoginPage,
        activeForm,
        nationalCode,
        otp,
    } = useContext(LoginContext)
    const ref = useRef<HTMLDivElement>(null)
    useClickOutside(ref, () => {
        close()
    })

    if (activeForm === null)
        return null;
    return (
        <div className="login-sidebar login-form">
            <div className="login-sidebar-form" ref={ref}>
                <LoginSidebarHeader
                    activeForm={activeForm}
                    close={close}
                    goBack={goBack}
                    goBackLogin={gotToLoginPage}
                />
                <div className="d-flex mb-4">
                    <img src={'/header-logo-dark.png'} className="logo mx-auto" alt="logo" />
                </div>
                <div className={classNames('forgot-password-forms', activeForm.toLowerCase().replace(/_/g, '-'))}>
                    <div style={{ transform: `TranslateX(${(100 / 4) * getActiveIndex(activeForm)}%)` }} className="forms-container d-flex">

                    
                        <div className={classNames("form", { 'opacity-0': activeForm !== 'FORGOT_PASSWORD_CONFIRM_CODE' })}>
                            <ConfirmCodeForm isActivePage={activeForm === 'FORGOT_PASSWORD_CONFIRM_CODE'} gotToLoginPage={gotToLoginPage} goBack={goBack} />
                        </div>
                        <div className={classNames("form", { 'opacity-0': activeForm !== 'FORGOTT_PASSWORD_GET_VALIDATION_CODE' })} >
                            <GetValidationCodeForm getValidationCode={confirmCode} nationalCode={nationalCode} />
                        </div>
                        <div className={classNames("form", { 'opacity-0 ': activeForm !== 'LOGIN' })}>
                            <LoginForm close={close} forgotPassword={getValidationCode} otp={(userName,password)=>otp(userName ?? '',password ?? "")} />
                        </div>
                        <div className={classNames("form", { 'opacity-0 ': activeForm !== 'OTP' })}>
                            <OtpLogin isActivePage={activeForm === 'OTP'}  />
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default LoginSidebar

