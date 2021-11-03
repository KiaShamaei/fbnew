import moment from 'jalali-moment'
import React, { CSSProperties, ReactElement } from 'react'
import { useMemo } from 'react'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'

interface Props {
    id: any;
    title: string;
    date: string;
    time: string;
    titr?: string;
    style: CSSProperties;
    toggleDetails: any
}

function MessageItem({
    style,
    title,
    date: dateInput,
    toggleDetails,
    titr,
    id
}: Props): ReactElement {

    const currentTime = useSelector((state: IReduxState) => state.timeCalender.currentTime)

    const date = useMemo(() => {
        return moment(dateInput).format('jYYYY/jMM/jDD');
    }, [dateInput])

    const isToDay = useMemo(() => {
        return moment(dateInput).isSame(currentTime, 'days')
    }, [currentTime, dateInput])

    const time = useMemo(() => {
        return moment(dateInput).format('HH:mm');
    }, [dateInput])

    return (
        <div className="message-item d-flex" style={style}>
            <div className="title">
                {title}
            </div>
            <div className="date-and-detail-btn">
                <span className="date-and-time d-flex">
                    {!isToDay && <span className="date">
                        {date}
                    </span>}
                    {<span className="time">
                        {time}
                    </span>}
                </span>
                <i className="online-icon-left-arrow-circle cursor-pointer" onClick={() => { toggleDetails({ time, title, date, titr, id }) }} ></i>
            </div>
        </div>
    )
}

export default MessageItem
