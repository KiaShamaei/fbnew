import React, { ReactElement, Fragment, useRef } from 'react'
import { Form, Field } from 'react-final-form'
import TextField from 'components/form/TextField/TextField'
import { useIntl, FormattedMessage, defineMessages } from 'react-intl'
import Button from 'components/Button/Button'
import { update } from 'utils/mutators'
import { IAccessData } from 'types/IAccessData'
import { IRefCapchaProps } from 'components/Capcha/meta/types'
import useDataGetter from 'hooks/useDataGetter'
import Timer from './Timer'
import { useCallback } from 'react'
import { useState } from 'react'
import { ITimerRef } from '../meta/types'
import { BeatLoader } from 'react-spinners'
import CapchaField from 'components/Capcha/Capcha'
import { useContext } from 'react'
import { LoginContext } from '../contexts/LoginContext'

const messages = defineMessages({
    username: {
        id: 'username',
        defaultMessage: 'username'
    },
    sendedPassword: {
        id: 'sended-password',
        defaultMessage: 'sended password'
    },
    newPassword: {
        id: 'new-password',
        defaultMessage: 'new password'
    }
})

interface Props {
    
    isActivePage?: boolean;
}

function OtpLogin({
    
    isActivePage,
}: Props): ReactElement {
    const intl = useIntl()
    const capchaRef = useRef<IRefCapchaProps>(null)
    const timerRef = useRef<ITimerRef>(null)
    
    const {
        loading,
        msg,
        error,
        fetch: postData
    } = useDataGetter<IAccessData>({
        url: 'api/authentication/otp',
        method: 'POST',
        parseData: true,
        isTest: false,
        fetchFirst: false
    })
  
    const [hasTimerDone, sethasTimerDone] = useState(false)
    const { userName } = useContext(LoginContext)
    const { password } = useContext(LoginContext)

    const onTimeHasDone = useCallback(() => {
        sethasTimerDone(true)
    }, [])
    const resetTimer = useCallback(() => {
        sethasTimerDone(false)
    }, [])

    return (
        <Fragment>
            <p className="forgott-password-description">
                <FormattedMessage
                    id="otp"
                    defaultMessage="otp"
                />
            </p>
            {loading && <BeatLoader size={15} margin={6} color="#08a88a" />}
            <Form
                mutators={{ ...update }}
                onSubmit={(values) => {
                    postData(null, {
                        captchaId: values.capcha.id,
                        captchaCode: values.capcha.value,
                        userName:userName,
                        password:password,
                        otp:values.code,
                        ...values,
                    }).then(() => {
                        
                    }).catch(() => {
                        capchaRef.current?.fetch()
                    })
                }}
                render={({ handleSubmit, form: { mutators: { update } } }) => {
                    return <form onSubmit={handleSubmit}>
                        {/*<Capcha update={update} key={'ConfirmCodeFormCapcha'} ref={capchaRef} />*/}
                        <Field
                            component={TextField}
                            name="code" 
                            autoComplete="off"
                            label={intl.formatMessage(messages.sendedPassword)}
                        />
                       
                        <Field
                            component={CapchaField}
                            name="capcha"
                            ref={capchaRef}
                            validate={v => {
                                if (!v) {
                                    return (
                                        <FormattedMessage
                                            id="please-enter-security-code"
                                            defaultMessage="Please Enter Security Code"
                                        />
                                    );
                                }
                            }}
                        />
                        <span className="wait-until-send-sms d-flex">
                            <FormattedMessage
                                id="wait-until-send-sms"
                                defaultMessage="wait until send sms"
                            />
                            {!hasTimerDone && isActivePage && <Timer ref={timerRef} onTimeHasDone={onTimeHasDone} duration={120} />}
                            {hasTimerDone && <div className="forgot-password mr-2 cursor-pointer" onClick={() => {resetTimer() }}>
                                <FormattedMessage id="get-validation-code-again" defaultMessage="get validation code again"/>
                            </div>}
                        </span>
                        {error && msg && <div className="error">
                            {msg}
                        </div>}
                        <Button className="w-100">
                            <FormattedMessage
                                id="login"
                                defaultMessage="login"
                            />
                        </Button>
                    </form>
                }}
            />
        </Fragment>
    )
}

export default OtpLogin
