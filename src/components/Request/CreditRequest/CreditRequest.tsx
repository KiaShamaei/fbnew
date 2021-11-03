import Button from 'components/Button/Button';
import Dialog from 'components/Dialog/Dialog';
import TextField from 'components/form/TextField/TextField';
import RegularTable from 'components/RegularTable/RegularTable';
import { IColumn } from 'components/Table/types';
import Tooltip from 'components/Tooltip/Tooltip';
import moment from 'jalali-moment';
import { Field, Form } from 'react-final-form';
import { FormattedMessage, useIntl } from 'react-intl';
import './assets/credit-request.scss'
import useDataGetter from "../../../hooks/useDataGetter";
import { endpoints } from "../../../appConstants";
import { useContext, useEffect } from "react";
import { useSelector } from 'react-redux';
import { IReduxState } from 'redux/types';
import { LoginContext } from 'container/LoginContainer/contexts/LoginContext';
import classNames from 'classnames';
import NumberField from 'components/SymbolBuyAndSell/components/NumberField';
import { BeatLoader } from 'react-spinners';
import { useSnackbar } from 'container/Snackbar/Snackbar';

interface CreditRequesProps {
    isOpen: boolean;
    x: number;
    y: number;
    close: () => void;
}


const messages = {
    creditRequest: {
        id: 'credit-request',
        defaultMessage: 'credit-request'
    },
    date: {
        id: 'date',
        defaultMessage: 'date'
    },
    description: {
        id: 'description',
        defaultMessage: 'description'
    },
    amount: {
        id: 'amount',
        defaultMessage: 'amount'
    },
    confirmedAmount: {
        id: 'confirmed-amount',
        defaultMessage: 'confirmed-amount'
    },
    managerResponse: {
        id: 'manager-response',
        defaultMessage: 'manager-response'
    },
    status: {
        id: 'status',
        defaultMessage: 'status'
    },
    roles: {
        id: 'roles',
        defaultMessage: 'roles'
    },
    priceIsRequired : {
        id: 'price-is-required',
        defaultMessage : 'price-is-required'
      },
      error: {
        id: 'error-occured',
        defaultMessage: 'error-occured'
    },
    sucess: {
      id: 'sucess',
      defaultMessage: 'sucess'
  }
}


export default function CreditRequest(props: CreditRequesProps) {
    const isLoggedin = useSelector((state: IReduxState) => state.user.isLoggedIn)
    const { open } = useContext(LoginContext)
    const { isOpen, x, y, close } = props;
    const { data, fetch, loading } = useDataGetter({
        url: endpoints.request.creditRequest,
        method: "GET",
        fetchFirst: false,
        parseData: true
    })
    const { fetch: postData } = useDataGetter({
        url: endpoints.request.creditRequest,
        method: "POST",
        fetchFirst: false,
        parseData: true
    })
    useEffect(() => {
        fetch();
    }, [fetch])
    const intl = useIntl()
    const tableData = [{}]
    const { display } = useSnackbar();
    const columns: IColumn[] = [
        {
            field: 'date',
            header: intl.formatMessage(messages.date),
            sort: 'date',
            render: (v: number) => {
                return moment(v).format('jYYYY/jMM/jDD')
            }
        },
        {
            field: 'amount',
            header: intl.formatMessage(messages.amount),
            sort: 'number',

        },
        {
            field: 'confirmedAmount',
            header: intl.formatMessage(messages.confirmedAmount),
            sort: 'status',
        },
        {
            field: 'description',
            header: intl.formatMessage(messages.description),
            sort: 'description',
            headerClassName: 'discription-field',
            render: (v: string = '', row: any) => {
                return (
                    <Tooltip tooltipText={v} id={row.id + "description"}>
                        {
                            v.slice(0, 50) + (v.length > 50 ? '...' : '')
                        }
                    </Tooltip>
                )
            }
        },
        {
            field: 'managerResponse',
            header: intl.formatMessage(messages.managerResponse),
            sort: 'managerResponse',
            headerClassName: 'discription-field',
            render: (v: string = '', row: any) => {
                return (
                    <Tooltip tooltipText={v} id={row.id + "managerResponse"}>
                        {
                            v.slice(0, 50) + (v.length > 50 ? '...' : '')
                        }
                    </Tooltip>
                )
            }
        },
        {
            field: 'status',
            header: intl.formatMessage(messages.status),
            sort: 'status',
            render: (v: any) => {
                if (v === 'درخواست شده') {
                    return <div className='accept'>{v}</div>
                } else {
                    return <div className='reject'>{v}</div>
                }
            }
        },

    ]

    return (
        <>
            <Dialog className={classNames({ 'not-in-account': !isLoggedin })} isOpen={isOpen} defaultX={isLoggedin ? x : x + 300} defaultY={isLoggedin ? y : y + 220} close={close} title={intl.formatMessage(messages.creditRequest)}>
                {isLoggedin === true ?
                    <Form onSubmit={values => {

                        postData(null, {
                            price: values.brokerRequest,
                            description: values.brokerDetail
                        })
                            .then(() => {
                                display({
                                    message: intl.formatMessage(messages.sucess),
                                    type: "success",
                                });
                                fetch()
                            })
                            .catch(() => {
                                display({
                                    message: intl.formatMessage(messages.error),
                                    type: "error",
                                });
                            });
                    }}
                        render={({ handleSubmit }) => {
                            return (
                                <form onSubmit={handleSubmit} className='px-8'>
                                    <div className="d-flex mt-5 justify-content-space-between">
                                        <Field className='w-20' component={NumberField} name="brokerRequest" label={intl.formatMessage(messages.amount)} />
                                        <Field className='w-79' component={TextField} name="brokerDetail" label={intl.formatMessage(messages.description)} />
                                    </div>
                                    <div className="d-flex my-8 justify-content-flex-end align-items-center">
                                        <Button>
                                            <FormattedMessage id="register-request" defaultMessage="register request" />
                                        </Button>
                                        <p className='mr-2 link'>{intl.formatMessage(messages.roles)}</p>
                                    </div>
                                    <div className="title mb-2">
                                        <FormattedMessage
                                            id="submited-requests"
                                            defaultMessage="submited-requests"
                                        />
                                    </div>
                                    {loading && <div className="d-flex justify-content-center"><BeatLoader size={15} color="#00c288" /></div>}
                                    <RegularTable columns={columns} data={tableData} count={tableData?.length} className="mt-2 " numberOfItems={9}
                                        refreshData={() => { fetch() }} />
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
                            <Button color="blue" onClick={() => { open(); close() }}>
                                <FormattedMessage id="login-account" defaultMessage="login account" />
                            </Button>
                        </div>
                    </div>


                }
            </Dialog>
        </>
    )
}