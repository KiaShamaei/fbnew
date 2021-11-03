import ComboboxField from 'components/form/ComboboxField/ComboboxField'
import TextField from 'components/form/TextField/TextField'
import React, { ReactElement } from 'react'
import { Field } from 'react-final-form'
import MessageText from './MessageText'
import NotificationType from './NotificationType'
import ValidUntil from './ValidUntil'

function PriceChange(): ReactElement {
    return (
        <div>
            <div className="d-flex mt-4">
                <div className="w-50 ml-1">
                    <Field name="price" component={ComboboxField} items={[]} label="انتخاب قیمت" />
                </div>
                <div className="w-50 mr-1">
                    <Field name="status" component={ComboboxField} items={[]} label="انتخاب وضعیت" />
                </div>
            </div>
            <div className="d-flex mt-4">
                <div className="w-50 ml-1">
                    <Field name="value" component={TextField} label="مقدار" />
                </div>
                <div className="w-50 mr-1">
                    <Field name="criterion" component={ComboboxField} items={[]} label="انتخاب معیار" />
                </div>
            </div>
            <ValidUntil className='mt-5' />
            <MessageText className="mt-3" />
            <NotificationType className='mt-5' />
        </div>
    )
}

export default PriceChange
