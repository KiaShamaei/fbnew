import Dialog from 'components/Dialog/Dialog'
import TextField from 'components/form/TextField/TextField'
import React, { ReactElement } from 'react'
import { Field, Form } from 'react-final-form'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import { scorePassword } from 'utils/string'
import ScorePassword from 'components/ScorePassword/ScorePassword'
import './assets/ChangePassword.scss'
import Button from 'components/Button/Button'
import useDataGetter from 'hooks/useDataGetter'
import { BeatLoader } from 'react-spinners'
import { useRef } from 'react'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import InputCore from 'components/form/InputCore/InputCore'

const messages = defineMessages({
    currentPassword: {
        id: 'current-password',
        defaultMessage: 'current password'
    },
    repeatPassword: {
        id: 'repeat-password',
        defaultMessage: 'repeat-password'
    },
    newPassword: {
        id: 'new-password',
        defaultMessage: 'new password'
    },
    repeatPasswordDoesNotMatchNewPassword: {
        id: 'repeat-password-does-not-match-new-password',
        defaultMessage: 'repeat password does not match new password'
    }
})

interface Props {
    close: () => void;
}

function ChangePassword({
    close
}: Props): ReactElement {
    const intl = useIntl()
    const userName = useSelector((state: IReduxState) => state.user?.userInfo?.userName)
    const {
        loading,
        fetch: postData,
        msg,
        statusCode
    } = useDataGetter({
        url: '/authentication/change-password',
        method: 'POST',
        parseData: true,
        isTest: false,
        onSuccess: () => {
            resetRef.current && resetRef.current();
        },
        fetchFirst: false
    })
    
    const resetRef = useRef<any>()

    return (
        <Dialog
            title={<FormattedMessage
                id="change-password"
                defaultMessage="change password"
            />}
            isOpen={true}
            className="change-password-dailog"
            close={close}
            defaultX={(window.innerWidth / 2) - 150}
            defaultY={(window.innerHeight / 2) - (430 / 2)}>
            <Form
                onSubmit={({
                    oldPass,
                    newPass,
                    repeatPassword
                }) => {
                    if (newPass !== repeatPassword) {
                        return { error: intl.formatMessage(messages.repeatPasswordDoesNotMatchNewPassword) }
                    }
                    postData(null, { oldPass, newPass });
                    return {};
                }}
                render={({
                    handleSubmit,
                    values,
                    error,
                    submitErrors,
                    form: {
                        reset
                    }
                }) => {
                    resetRef.current = reset;
                    return <form onSubmit={handleSubmit} className="change-password-form text-center">
                        {loading && <BeatLoader size={12} margin={6} color="#08a88a" />}
                        {submitErrors?.error && <div className="error-message">
                            <i className="online-icon-information"></i>
                            {submitErrors?.error}
                        </div>}
                        {msg && <div className="error-message">
                            <i className="online-icon-information"></i>
                            {msg[0]}
                        </div>}
                        {statusCode === 200 && !msg && <div className="success-message">
                            <i className="online-icon-tick" />
                            <FormattedMessage
                                id="password-updated-successfuly"
                                defaultMessage="password updated successfuly"
                            />
                        </div>
                        }

                        <div className="form-group mb-2">
                            <label>
                                <FormattedMessage 
                                    id="username"
                                    defaultMessage="username"
                                />
                            </label>
                            <InputCore disabled value={userName} readOnly />
                        </div>

                        <Field
                            component={TextField}
                            type="password"
                            name="oldPass"
                            label={intl.formatMessage(messages.currentPassword)}
                        />

                        <ScorePassword width={scorePassword(values.newPass)} className="user-widget-score-password" />

                        <Field
                            component={TextField}
                            type="password"
                            className="mt-2"
                            label={intl.formatMessage(messages.newPassword)}
                            name="newPass"
                        />

                        <Field
                            component={TextField}
                            type="password"
                            className="mt-2"
                            label={intl.formatMessage(messages.repeatPassword)}
                            name="repeatPassword"
                        />
                        <Button className="mt-4 register-changes">
                            <FormattedMessage
                                id="register-changes"
                                defaultMessage="register changes"
                            />
                        </Button>
                    </form>
                }}
            />
        </Dialog>
    )
}

export default ChangePassword
