import classNames from 'classnames'
import Datepicker from 'components/Datepicker/Datepicker'
import React, { ReactElement } from 'react'
import { Field } from 'react-final-form'
import { FormattedMessage } from 'react-intl'
import '../assets/ValidUntil.scss'
import FirstEvent from './FirstEvent'

interface Props {
    className?: string;
}

function ValidUntil({
    className
}: Props): ReactElement {
    return (
        <div className={classNames("valid-until", className)}>
            <label className="group-title">
                <FormattedMessage id="valid-until" defaultMessage="valid until" />
            </label>
            <div className="d-flex">
                <div className="w-50 my-auto">
                    <FirstEvent />
                </div>
                <div className="w-50 my-auto">
                    <Field component={Datepicker} placeholder="تاریخ" name="date" />
                </div>
            </div>
        </div>
    )
}

export default ValidUntil
