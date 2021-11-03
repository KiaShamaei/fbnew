import React, { ReactElement, ReactNode, useState } from 'react'
import { useCallback } from 'react'
import { LoginContext } from './contexts/LoginContext'
import { ILoginContextState } from './meta/types'

interface Props {
    children: ReactNode
}

function LoginContainer({
    children
}: Props): ReactElement {
    const [loginContainerState, setLoginContainerState] = useState<ILoginContextState>({
        activeForm: null,
        nationalCode: undefined,
        userName: undefined,
        password: undefined,

    })

    const open = useCallback(() => {
        setLoginContainerState(s => ({
            activeForm: 'LOGIN'
        }))
    }, [])

    const close = useCallback(() => {
        setLoginContainerState(s => ({
            activeForm: null
        }))
    }, [])

    const getValidationCode = useCallback(() => {
        setLoginContainerState(s => ({
            activeForm: 'FORGOTT_PASSWORD_GET_VALIDATION_CODE'
        }))
    }, [])


    const confirmCode = useCallback((nationalCode: string) => {

        setLoginContainerState({
            nationalCode: nationalCode,
            activeForm: 'FORGOT_PASSWORD_CONFIRM_CODE'
        })
    }, [])

    const otp = useCallback((userName: string, password: string) => {
        setLoginContainerState({
            userName: userName,
            password: password,
            activeForm: 'OTP'
        })
    }, [])


    const goBack = useCallback(() => {
        setLoginContainerState(s => {
            if (s.activeForm === 'FORGOTT_PASSWORD_GET_VALIDATION_CODE')
                return {
                    activeForm: 'LOGIN'
                }
            return {
                activeForm: 'FORGOTT_PASSWORD_GET_VALIDATION_CODE',

            }
        })
    }, [])

    const goBackLogin = useCallback(() => {
        setLoginContainerState(s => {
            return {
                activeForm: 'LOGIN'
            }
        })
    }, [])

    return (
        <LoginContext.Provider value={{
            close,
            activeForm: loginContainerState.activeForm,
            nationalCode: loginContainerState.nationalCode,
            userName: loginContainerState.userName,
            password: loginContainerState.password,
            open,
            getValidationCode,
            confirmCode,
            goBack,
            gotToLoginPage: goBackLogin,
            otp,
        }}>
            {children}
        </LoginContext.Provider>
    )
}

export default LoginContainer
