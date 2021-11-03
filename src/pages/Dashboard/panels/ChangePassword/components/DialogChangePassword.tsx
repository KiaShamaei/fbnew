import React, { Fragment } from 'react'
import Dialog from 'components/Dialog/Dialog'
import TextField from 'components/form/TextField/TextField'
import Button from 'components/Button/Button'
import './../assets/symbol-change-password.scss'
import { Field, Form } from 'react-final-form'
import { defineMessages, useIntl, FormattedMessage } from 'react-intl'

interface Props {
    close: (() => void),
}

const messages = defineMessages({
    newUsername: {
        id: 'new-username',
        defaultMessage: 'newusername'
    },
    currentPassword: {
        id: 'current-password',
        defaultMessage: 'current-password'
    },
    newPassword: {
        id: 'new-password',
        defaultMessage: 'new-password'
    },
    repeatNewPassword: {
        id: 'repeat-new-password',
        defaultMessage: 'repeat-new-password'
    },
    recordChanges: {
        id: 'record-changes',
        defaultMessage: 'record-cha nges'
    }
})

const DialogChangePassword = ({ close }: Props) => {

    const intl = useIntl()
    return (
        <Fragment>
            <Dialog className='symbol-change-password' isOpen={true} close={close} defaultX={window.innerWidth / 2 - (150)} defaultY={window.innerHeight / 2 - (150)} title={<FormattedMessage defaultMessage='change-password' id='change-password' />} >
                <Form onSubmit={(values) => {
                    
                }}
                    render={({ handleSubmit}) => {
                        return (
                            <form onSubmit={handleSubmit}>
                                <Field component={TextField} className='mt-2 text-left' name='newUserName' label={intl.formatMessage(messages.newUsername)} />
                                <Field type='password' component={TextField} className='mt-2' name='password' label={intl.formatMessage(messages.currentPassword)} />
                                <Field type='password' component={TextField} className='mt-2' name='newPassword' label={intl.formatMessage(messages.newPassword)} />
                                <Field type='password' component={TextField} className='mt-2' name='repeatNewPassword' label={intl.formatMessage(messages.repeatNewPassword)} />
                                <div className='d-flex w-100 my-5 justify-content-center'>
                                    <Button >
                                        {intl.formatMessage(messages.recordChanges)}
                                    </Button>
                                </div>
                            </form>
                        )
                    }}
                />
            </Dialog>
        </Fragment>
    )
}
export default DialogChangePassword