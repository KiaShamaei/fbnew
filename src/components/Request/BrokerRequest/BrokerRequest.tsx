import React, { useCallback, useContext } from 'react';
import Button from 'components/Button/Button';
import Dialog from 'components/Dialog/Dialog';
import TextField from 'components/form/TextField/TextField';
import { Field, Form } from 'react-final-form';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import './assets/broker-request.scss'
import useDataGetter from "../../../hooks/useDataGetter";
import { endpoints } from "../../../appConstants";
import { BrokerRequestTable } from './BrokerRequestTable';
import { DialogMessageBoxContext } from 'components/ConfirmationModal/Context/MessageBoxContext/MessageBoxContext';
import LazyComboboxField from 'components/form/LazyComboboxField/LazyComboboxField';
import { BeatLoader } from 'react-spinners'
import { useSnackbar } from 'container/Snackbar/Snackbar';
import { errorHandler } from 'utils/errorHandler';
import RequestButtons from '../components/RequestButtons';
import { useSelector } from 'react-redux';
import { IReduxState } from 'redux/types';
import { LoginContext } from 'container/LoginContainer/contexts/LoginContext';
import classNames from 'classnames';

interface BrokerRequestProps {
    isOpen: boolean;
    x: number;
    y: number;
    close: () => void;
}

const messages = defineMessages({
    brokerRequest: {
        id: 'initial-broker-request',
        defaultMessage: 'initial-broker-request'
    },
    symbol: {
        id: 'symbol',
        defaultMessage: 'symbol'
    },
    description: {
        id: 'description',
        defaultMessage: 'description'
    },
    date: {
        id: 'date',
        defaultMessage: 'date'
    },

    expalins: {
        id: 'explains',
        defaultMessage: 'explains'
    },
    yourRequestSuccessfulyDone: {
        id: 'your-request-successfuly-done',
        defaultMessage: 'your request successfuly done'
    },
    changeSupervisorRequestSuccessfullyDone: {
        id: 'change-supervisor-request-successfully-done',
        defaultMessage: 'change-supervisor-request-successfully-done'
    },
    errorCccured: {
        id: 'error-occured',
        defaultMessage: 'error occured'
    },
    nameIsRequired: {
        id: 'name-is-required',
        defaultMessage: '{name} is required'
    }
})



export default function BrokerRequest(props: BrokerRequestProps) {
    const { isOpen, x, y, close } = props;
    const intl = useIntl();
    const { open } = useContext(LoginContext)
    const isLoggedin = useSelector((state: IReduxState) => state.user.isLoggedIn)
    
    const { 
        loading,
        fetch: brokerRequest
    } = useDataGetter({
        url: endpoints.request.changeSupervisor.post,
        fetchFirst: false,
        method: 'POST'
    })

    const {
        display
    } = useSnackbar()

    const dispalyDialog = useContext(DialogMessageBoxContext)

    const onFormSubmit = useCallback((values: any) => {
        brokerRequest(null, {
            isin: values.symbol.id,
            comments: values.description

        }).then(() => {
            dispalyDialog(
                intl.formatMessage(messages.yourRequestSuccessfulyDone),
                intl.formatMessage(messages.changeSupervisorRequestSuccessfullyDone),
                'SUCCESS')
            close()
        }).catch(({ msg }) => {
            const error = errorHandler({ msg })
            display({
                type: 'error',
                message: error ?? intl.formatMessage(messages.errorCccured)
            })
        })
    }, [brokerRequest, dispalyDialog, intl, close, display])


    const {
        data,
        fetch,
        loading: tableLoading
    } = useDataGetter({
        url : endpoints.request.changeSupervisor.get,
        method: "GET",
        parseData : true ,
        fetchFirst : false
    })

    return (
            <Dialog className={classNames('broker-request',{ 'not-in-account': !isLoggedin })} isOpen={isOpen} defaultX={isLoggedin ? x : x + 300} defaultY={ isLoggedin ? y : y + 220 } close={close} title={intl.formatMessage(messages.brokerRequest)}>
                {isLoggedin===true ? 
                <div className='broker-lines'>
                    <p style={{ marginTop: '10px' }}>
                        <FormattedMessage id="broker-request-line-2" defaultMessage="broker request line 2" />
                    </p>
                </div>
                    :null}
                {loading && <div className="d-flex justify-content-center">
                    <div>
                        <BeatLoader color="#00c288" size={20} />
                    </div>
                </div>}
                {isLoggedin === true? 
                <Form onSubmit={onFormSubmit}
                    render={({ handleSubmit }) => {
                        return (

                            <form onSubmit={handleSubmit} className='px-8'>
                                <div className="d-flex mt-5 justify-content-space-between">
                                    <Field
                                        className='w-30'
                                        label={intl.formatMessage(messages.symbol)}
                                        url={(searchKey: string) => `/instrument/search/${searchKey}`}
                                        parser={(info: any) => {
                                            const data = info.data || [];
                                            if (data && data.length > 0)
                                                return data.map((item: any[]) => ({
                                                    label: item ? item[1] : null,
                                                    id: item ? item[0] : null
                                                }))
                                            return []
                                        }}
                                        validate={(v) => {
                                            if(!v) {
                                                return intl.formatMessage(messages.nameIsRequired, {
                                                    name: intl.formatMessage(messages.symbol)
                                                })
                                            }
                                        }}
                                        icon={<i className="online-icon-search" />}
                                        component={LazyComboboxField}
                                        hasClear
                                        name="symbol"
                                    />
                                    <Field className='w-70 pr-2' component={TextField} name="comments" label={intl.formatMessage(messages.description)} />
                                </div>
                                <RequestButtons 
                                    className="d-flex my-8 justify-content-flex-end"
                                    requestName="broker-request"
                                    buttonClassName=""
                                    label={<FormattedMessage id="register-request" defaultMessage="register request"
                                    />}
                                />
                                <div className="title mb-2">
                                    <FormattedMessage
                                        id="submited-requests"
                                        defaultMessage="submited-requests"
                                    />
                                </div>

                                <BrokerRequestTable
                                    data={data}
                                    loading={tableLoading}
                                    fetch={fetch}
                                />
                            </form>
                        )
                    }}
                />
                :
                
                <div className="empty-portfolio text-center" >
                    <div className="empty-portfolio-texts">
                        <p className="mt-2">
                            <FormattedMessage id="you-not-loged-in-yet" defaultMessage="you not loged in yet" />
                        </p>
                        <p className="mt-2">
                            <FormattedMessage id="you-should-first-log-in-system" defaultMessage="to buy stock you should first log in system" />
                        </p>
                    </div>
                    <div className="text-center mt-4">
                        <Button color="blue" onClick={()=>{open();close()}}>
                            <FormattedMessage id="login-account" defaultMessage="login account" />
                        </Button>
                    </div>
                </div>
                
                
                    }
                
            </Dialog>
    )

}