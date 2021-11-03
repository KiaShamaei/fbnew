import Datepicker from 'components/Datepicker/Datepicker'
import React, { ReactElement } from 'react'
import { Field } from 'react-final-form'
import MessageText from './MessageText'
import NotificationType from './NotificationType'

function Announcements(): ReactElement {
    return (
        <div>
            <Field name="date" containerClassName="mt-5" component={Datepicker} placeholder="معتبر تا تاریخ" />
            <MessageText className="mt-5" />
            <NotificationType className="mt-5" />
        </div>
    )
}

export default Announcements
