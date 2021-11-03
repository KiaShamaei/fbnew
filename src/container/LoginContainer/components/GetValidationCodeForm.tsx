import React, { Fragment, ReactElement } from 'react'
// import Capcha from 'components/Capcha/Capcha'
import { Form, Field } from 'react-final-form'
import TextField from 'components/form/TextField/TextField'
import { defineMessages, useIntl, FormattedMessage } from 'react-intl'
import Button from 'components/Button/Button'
import { update } from 'utils/mutators'
import useDataGetter from 'hooks/useDataGetter'
import { IAccessData } from 'types/IAccessData'
import { useRef } from 'react'
import { IRefCapchaProps } from 'components/Capcha/meta/types'
import { BeatLoader } from 'react-spinners'
import CapchaField from 'components/Capcha/Capcha'

import { dispatch } from 'd3-dispatch'
import API from 'API'
import { saveData } from 'redux/utils/storage'
import { LOCALE_STORAGE_KEYS } from 'appConstants'
import { FETCH_USER } from 'redux/actionTypes'
import { useDispatch } from 'react-redux'

const messages = defineMessages({
    username: {
        id: 'username',
        defaultMessage: 'username'
    }, usernameOrNationalCode: {
        id: 'username-or-national-code',
        defaultMessage: 'username or national code'
    }, usernameError: {
        id: 'username-error',
        defaultMessage: 'username error'
    },
    meliCode: {
        id: 'meli-code',
        defaultMessage: 'meli code'
    },
    phoneNumber: {
        id: 'phone-number',
        defaultMessage: 'phone number'
    },
    nameIsRequired: {
        id: 'name-is-required',
        defaultMessage: '{name} is required'
    }
})

interface Props {
    getValidationCode: (nationalCode: string) => void;
    nationalCode?: string,
}

function GetValidationCodeForm({
    getValidationCode,
}: Props): ReactElement {
    const dispatch = useDispatch();
    const intl = useIntl()
    const capchaRef = useRef<IRefCapchaProps>(null)
    const { statusCode,
        loading,
        msg,
        error,
        fetch: postData
    } = useDataGetter<IAccessData>({
        url: `/authentication/forget-password`,
        method: 'POST',
        parseData: true,
        isTest: false,
        onSuccess: (accessData: IAccessData) => {
            API.defaults.headers[
                "Authorization"
            ] = `Bearer ${accessData.accessToken}`;
        },
        onFailur: (e) => {
            capchaRef.current?.fetch();
            console.log(e)
        },
        fetchFirst: false
    })

    console.log('MSG LOGGIN', msg)

    return (
        <Fragment>
            {error && (
                <span className="login-error">
                    <i className="online-icon-information" />
                    {Array.isArray(msg) ? msg[0] : msg}
                </span>
            )}
            <p className="forgott-password-description">
                <FormattedMessage
                    id="forgott-password-description"
                    defaultMessage="forgott password description"
                />
            </p>
            {loading && <BeatLoader size={15} margin={6} color="#08a88a" />}
            <Form
                mutators={{ ...update }}
                onSubmit={(values: any) => {
                    postData(null, {
                        captchaId: values.capcha.id,
                        captchaCode: values.capcha.value,
                        ...values,
                    }).then(() => {
                        getValidationCode(values.nationalCode)

                    }).catch(() => {
                        capchaRef.current?.fetch()
                    })
                }}
                render={({ handleSubmit, form: { mutators: { update } }, values,valid }) => {
                    return <form onSubmit={handleSubmit} autoComplete="off">

                        <Field component={TextField} validate={(v) => {
                            if (!v) {
                                return intl.formatMessage(messages.nameIsRequired, {
                                    name: intl.formatMessage(messages.meliCode)
                                })
                            }
                        }}
                            name="nationalCode" label={intl.formatMessage(messages.meliCode)} />
                        <Field component={TextField} className="mt-2" validate={(v) => {
                            if (!v) {
                                return intl.formatMessage(messages.nameIsRequired, {
                                    name: intl.formatMessage(messages.phoneNumber)
                                })
                            }
                        }} name="mobile" label={intl.formatMessage(messages.phoneNumber)} />
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
                        {/*<Capcha update={update} ref={capchaRef} key={'GetValidationCodeFormCapcha'} />*/}
                        <Button className="w-100" >
                            <FormattedMessage
                                id="get-a-validation-code"
                                defaultMessage="get a validation code"
                            />
                        </Button>
                    </form>
                }}
            />
        </Fragment>
    )
}

export default GetValidationCodeForm
