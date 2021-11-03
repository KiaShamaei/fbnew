import { IPanelItemProps } from 'pages/Dashboard/meta/types'
import { ReactElement } from 'react'
import '../assets/TodaysDeals.scss'
import CumulativeOrdersTable from 'pages/Dashboard/panels/CumulativeOrders/CumulativeOrders'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import useDataGetter from 'hooks/useDataGetter'
import { BarLoader } from 'react-spinners'
import { useSnackbar } from 'container/Snackbar/Snackbar'
import { useConfirm } from 'container/ConfirmDialog/ConfirmDialog'
import useDialogState from 'components/Dialog/hooks/useDialogState'

const messages = defineMessages({
    areYouSureAboutCancelAllOrders: {
        id: 'are-you-sure-about-cancel-all-orders',
        defaultMessage: 'are you sure about cancel all orders'
    },
    alert: {
        id: 'alert',
        defaultMessage: 'alert'
    },
    yourOrdersDeletedSuccessfuly: {
        id: 'your-orders-deleted-successfuly',
        defaultMessage: 'yourorders deleted successfuly'
    },
    errorOccured: {
        id: 'error-occured',
        defaultMessage: 'error occured'
    }
})

interface Props extends IPanelItemProps {
}

function Orders({
    height,
    width
}: Props): ReactElement {
    return (
        <CumulativeOrdersTable
            height={height}
            width={width}
            index={4}
        />
    )
}

export function CancellAll() {

    const {
        display
    } = useSnackbar()
    const {
        open
    } = useConfirm()


    const intl = useIntl()

    const {
        fetch,
        loading
    } = useDataGetter({
        url: '/order/cancel-all',
        fetchFirst: false,
        method: 'DELETE'
    })
    return <div>
    <div className="d-flex mt-2 cursor-pointer"  onClick={() => {
            open({
                message: intl.formatMessage(messages.areYouSureAboutCancelAllOrders),
                title: intl.formatMessage(messages.alert),
            }, () => {
                fetch().then(() => {
                    display({
                        message: intl.formatMessage(messages.yourOrdersDeletedSuccessfuly),
                        type: 'success'
                    })
                }).catch(() => {
                    display({
                        message: intl.formatMessage(messages.errorOccured),
                        type: 'error'
                    })
                })
            })
        }}>
        <i className="online-icon-delete"></i>
        <FormattedMessage id="general-cancellation" defaultMessage="general cancellation" />
    </div>
        {loading && <BarLoader css="m-auto w-100" color="#00c288" width={100} height={5} />}
    </div>
}


export default Orders
