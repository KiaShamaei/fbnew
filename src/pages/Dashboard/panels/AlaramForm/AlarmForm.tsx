import Button from 'components/Button/Button'
import Dialog from 'components/Dialog/Dialog'
import ComboboxField from 'components/form/ComboboxField/ComboboxField'
import LazyComboboxField from 'components/form/LazyComboboxField/LazyComboboxField'
import React, { ReactElement, useMemo } from 'react'
import { useCallback } from 'react'
import { Field, Form } from 'react-final-form'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import { CLOSE_ALARM } from 'redux/actionTypes/alarmTypes'
import { IReduxState } from 'redux/types'
import './assets/AlaramForm.scss'
import AlarmDetailForm from './components/AlarmDetailForm'

const messages = defineMessages({
    announcements: {
        id: 'announcements',
        defaultMessage: 'announcements'
    },
    symbolPrice: {
        id: 'symbol-price',
        defaultMessage: 'symbol price'
    },
    priceChange: {
        id: 'price-change',
        defaultMessage: 'price change'
    },
    marketWatcherMessage: {
        id: 'market-watcher-message',
        defaultMessage: 'market watcher message'
    },
    shoppingLine: {
        id: 'shopping-line',
        defaultMessage: 'shopping line'
    },
    buyingLine: {
        id: 'buying-line',
        defaultMessage: 'buying-line'
    },
    turnover: {
        id: 'turnover',
        defaultMessage: 'turnover'
    }
})

function AlarmForm(): ReactElement {
    const intl = useIntl();
    const alarmTypes = useMemo(() => [
        { id: 1, label: intl.formatMessage(messages.symbolPrice) },
        { id: 2, label: intl.formatMessage(messages.priceChange) },
        { id: 3, label: intl.formatMessage(messages.announcements) },
        { id: 4, label: intl.formatMessage(messages.marketWatcherMessage) },
        { id: 5, label: intl.formatMessage(messages.shoppingLine) },
        { id: 6, label: intl.formatMessage(messages.buyingLine) },
        { id: 7, label: intl.formatMessage(messages.turnover) }
    ], [intl])
    const dispatch = useDispatch()
    const close = useCallback(() => {
        dispatch({ type: CLOSE_ALARM })
    }, [dispatch])
    const { isOpen, symbol } = useSelector((state: IReduxState) => state.alarm)
    return (
        <Dialog className="alarm-dialog" overflow='visible' title="افزودن آلارم جدید" defaultY={350} defaultX={350} isOpen={isOpen} close={close} >
            <Form
                initialValues={{
                    symbol: symbol
                }}
                onSubmit={() => {

                }}
                render={({ handleSubmit, values }) => {
                    return <form onSubmit={handleSubmit}>
                        <Field name="symbol" component={LazyComboboxField} hasClear label="نماد" url={(searchKey: string) => `/instrument/search/${searchKey}`}
                            parser={(info: any) => {
                                const data = info.data || [];
                                if (data && data.length > 0)
                                    return data.map((item: any[]) => ({
                                        label: item ? item[1] : null,
                                        id: item ? item[0] : null
                                    }))
                                return []
                            }} icon={<i className="online-icon-search" />} />
                        <Field name="alarmType" component={ComboboxField} className="mt-4" placeholder="انتخاب نوع آلارم" items={alarmTypes} />
                        <AlarmDetailForm alarmType={values?.alarmType?.id} />
                        <div className="d-flex justify-content-center mt-4">
                            <Button className="save-button">
                                <FormattedMessage id="save" defaultMessage="save" />
                            </Button>
                        </div>
                    </form>
                }}
            />
        </Dialog>
    )
}

export default AlarmForm
