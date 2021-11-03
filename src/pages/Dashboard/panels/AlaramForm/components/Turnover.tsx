import ComboboxField from 'components/form/ComboboxField/ComboboxField'
import TextField from 'components/form/TextField/TextField'
import React, { ReactElement } from 'react'
import { Field } from 'react-final-form'
import NotificationType from './NotificationType'
import ValidUntil from './ValidUntil'

function Turnover(): ReactElement {
    return (
        <div className="turnover">
            <div className="d-flex mt-4">
                <div className="w-50 pl-2">
                    <Field component={ComboboxField} name="status" label="انتخاب وضعیت" items={[]} />
                </div>
                <div className="w-50 pr-2">
                    <Field component={TextField} name="value" label="مقدار" />
                </div>
            </div>
            <ValidUntil className="mt-2" />
            <Field component={TextField} className="mt-4" placeholder="متن پیام" name="messageText" tag="textarea" />
            <NotificationType className="mt-4" />
        </div>
    )
}

export default Turnover
