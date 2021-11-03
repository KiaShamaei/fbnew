import Datepicker from 'components/Datepicker/Datepicker'
import RadioButton from 'components/form/RadioButton/RadioButton'
import RadioGroup from 'components/form/RadioGroup/RadioGroup'
import TextField from 'components/form/TextField/TextField'
import React, { ReactElement } from 'react'
import { Field } from 'react-final-form'
import '../assets/SymbolPrice.scss'
import NotificationType from './NotificationType'


const radioButtons = [
    { label: '30 دقیقه', value: 'thithyMinute' },
    { label: '1 ساعت', value: 'oneHour' },
    { label: 'تا انتهای روز', value: 'endOfTheDay' },
];

function SymbolPrice(): ReactElement {
    return (
        <div className="symbol-price">
            <Field name="duration">
                {({ input, meta }) => {
                    return <RadioGroup input={input} meta={meta}>
                        <div className="time-duration">
                            <label className="">
                                دوره زمانی
                            </label>
                            <div className="radio-buttons d-flex">
                                {radioButtons.map(radio => <div key={radio.value} className="time-duration-radio-button">
                                    <RadioButton {...radio} />
                                </div>)}
                            </div>
                        </div>
                    </RadioGroup>
                }}
            </Field>
            <Field name="datePicker" component={Datepicker} className="symbol-date" containerClassName={'mt-5'} placeholder="معتبر تا تاریخ" />
            <Field component={TextField} className="mt-5" placeholder="متن پیام" name="messageText" tag="textarea" />
            <NotificationType className="mt-5" />
        </div>
    )
}

export default SymbolPrice
