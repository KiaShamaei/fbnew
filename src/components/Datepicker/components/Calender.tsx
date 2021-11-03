import React, { ReactElement } from 'react'
import Day from './Day'
import { IDays, IDaysInMonth } from '../meta/types'
import '../assets/Calender.scss'
import classNames from 'classnames'

interface Props {
    className?: string;
    onDayClick: (day: IDays) => void;
    daysInMonth: IDaysInMonth;
    selectedDate?: string;
}

const days = [
    '\u0634',
    '\u06CC',
    '\u062F',
    '\u0633',
    '\u0686',
    '\u067E',
];

const friday = '\u062C'

function Calender({
    daysInMonth,
    className,
    selectedDate,
    onDayClick
}: Props): ReactElement {

    return (
        <div className={classNames("calender", className)}>
            <div className="day-names">
                {days.map((item, index) => <div key={index} className="day-name">{item}</div>)}
                <div className={"day-name is-friday"}>{friday}</div>
            </div>
            <div className="days">
                {daysInMonth.days.map(item => <Day
                    enDate={item.enDate}
                    selected={item.enDate === selectedDate}
                    key={item.faDate}
                    isFriday={item.isFriday}
                    day={item.day}
                    disable={item.disable}
                    faDate={item.faDate}
                    utc={item.utc}
                    isToDay={item.isToDay}
                    onClick={() => onDayClick(item)}
                />)}
            </div>
        </div>
    )
}

export default Calender
