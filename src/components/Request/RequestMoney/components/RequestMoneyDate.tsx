import React, { Fragment, ReactElement, useCallback, useState } from 'react'
import { defineMessages, FormattedMessage, useIntl } from 'react-intl'
import { Field } from 'react-final-form'
import RadioGroup from 'components/form/RadioGroup/RadioGroup';
import useDataGetter from 'hooks/useDataGetter';
import { BarLoader, BeatLoader } from 'react-spinners'
import { useMemo } from 'react';
import { IWithdrawalDepositDates } from '../meta/type';
import RadioButton from 'components/form/RadioButton/RadioButton';
import moment from "jalali-moment";
import '../assets/RequestMoneyDate.scss'
import classNames from 'classnames';

const messages = defineMessages({
    withdrawalDateFormat: {
        id: 'withdrawal-date-format',
        defaultMessage: 'withdrawal date format'
    }
})

interface Props {
    getdataRadio: any
}
function RequestMoneyDate({ getdataRadio }: Props): ReactElement {


    // const onVolumeClick = useCallback((orderSide: number, volume: number) => {
    //     if (orderSide === 1) {
    //         radioButton.current?.update('quantity', volume)
    //     }

    // }, [])

    const intl = useIntl()

    const {
        data,
        loading,
    } = useDataGetter<any[]>({
        url: '/request/withdrawal-t1t2t3',
        parseData: true
    })



    const withdrawalDepositDates: IWithdrawalDepositDates[] = useMemo(() => {
        if (data)
            return data.map<IWithdrawalDepositDates>(item => ({
                date: moment(item[0]),
                remain: item[1]
            }))
        return []
    }, [data])

    return (


        <div className="drposit-date">
            {loading && <div className="d-flex justify-content-center requestMoneyLoader"> <BarLoader color={'#00c288'} /> </div>}
            <div className="form-group radio">
                <label>
                    <FormattedMessage id="deposit-date" defaultMessage="deposit date" />
                </label>
                {withdrawalDepositDates && withdrawalDepositDates.length > 0 && <Field

                    defaultValue={withdrawalDepositDates[0]}
                    name="withdrawalDeposit">
                    {({
                        input,
                        meta
                    }) => {
                        return (
                            <RadioGroup
                                input={{
                                    ...input,
                                    onChange: (v) => {
                                        input.onChange(v)
                                        console.log("12545",v)
                                        if (v.remain > 0)
                                            getdataRadio(v.remain) 
                                    }
                                }} meta={meta} >
                                {withdrawalDepositDates.map(withdrawalDepositDate => <RadioButton
                                    className="d-flex h-50"
                                    key={withdrawalDepositDate.date.format('jYY/JMM/JDD')}
                                    value={withdrawalDepositDate}
                                    label={<div className='d-flex '>
                                        {withdrawalDepositDate.date.format('jYY/jMM/jDD')}
                                        <div className='d-flex mr-2'>
                                            (
                                            <div className='mx-1'><FormattedMessage id='max' defaultMessage='max' /></div>
                                            <div className={classNames({ 'is-remain-negative': (withdrawalDepositDate.remain ?? 0) < 0 })} >{Math.abs(withdrawalDepositDate.remain).toLocaleString()}</div>
                                            <div className='mx-1'><FormattedMessage id='rial' defaultMessage='rial' /></div>
                                            )
                                        </div>

                                    </div>
                                    }
                                />)}
                            </RadioGroup>
                        )
                    }}
                </Field>}
            </div>

        </div>

    )
}

export default RequestMoneyDate
