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
    goBack: () => void;
    gotToLoginPage: () => void;
    isActivePage?: boolean;
}

function ConfirmCodeForm({
    gotToLoginPage,
    goBack,
    isActivePage,
}: Props): ReactElement {
    const intl = useIntl()
    const capchaRef = useRef<IRefCapchaProps>(null)
    const timerRef = useRef<ITimerRef>(null)
    const resetRef = useRef<any>();
    const { nationalCode } = useContext(LoginContext)
    const {
        loading,
        msg,
        error,
        fetch: postData
    } = useDataGetter<IAccessData>({
        url: `/authentication/verify-forget`,
        method: 'POST',
        parseData: true,
        isTest: false,
        fetchFirst: false
    })
    const [isPasswordShown, setIsPasswordShown] = useState(false);
    const [hasTimerDone, sethasTimerDone] = useState(false)

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
                    id="forgott-password-confirm-code-description"
                    defaultMessage="forgott password confirm code description"
                />
            </p>
            {loading && <BeatLoader size={15} margin={6} color="#08a88a" />}
            <Form
                mutators={{ ...update }}
                onSubmit={(values) => {
                   
                    postData(null, {
                        captchaId: values.capcha.id,
                        captchaCode: values.capcha.value,
                        nationalCode,
                        ...values,
                    }).then(() => {
                        if(resetRef.current) {
                            resetRef.current()
                        }
                        gotToLoginPage();
                    }).catch(() => {
                        capchaRef.current?.fetch()
                    })
                }}
                render={({ handleSubmit, form: { mutators: { update }, reset } }) => {
                    resetRef.current = reset;
                    return <form onSubmit={handleSubmit} autoComplete="off">
                        {/*<Capcha update={update} key={'ConfirmCodeFormCapcha'} ref={capchaRef} />*/}
                        <Field
                            component={TextField}
                            name="code" 
                            autoComplete="off"
                            label={intl.formatMessage(messages.sendedPassword)}
                            
                        />
                        <Field
                            className="password mt-2"
                            autoComplete="new-password"
                            name="password"
                            type={isPasswordShown ? "text" : "password"}
                            component={TextField}
                            validate={v => {
                                if (!v) {
                                    return (
                                        <FormattedMessage
                                            id="please-enter-password"
                                            defaultMessage="Please Enter Password"
                                        />
                                    );
                                }
                            }}
                            icon={
                                <i
                                    className="online-icon-eye ml-2"
                                    onMouseDown={() => setIsPasswordShown(true)}
                                    onMouseUp={() => setIsPasswordShown(false)}
                                />
                            }
                            
                            label={intl.formatMessage(messages.newPassword)}
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
                            {hasTimerDone && <div className="forgot-password mr-2 cursor-pointer" onClick={() => { goBack(); resetTimer() }}>
                                <FormattedMessage id="get-validation-code-again" defaultMessage="get validation code again" />
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

export default ConfirmCodeForm
