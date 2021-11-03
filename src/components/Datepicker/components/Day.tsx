import classNames from 'classnames'
import React, { ReactElement } from 'react'
import { IDays } from '../meta/types'

interface Props extends IDays {
    onClick: () => void;
    selected?: boolean;
}

function Day({
    day,
    onClick,
    disable,
    isToDay,
    isFriday,
    selected = false
}: Props): ReactElement {
    return (
        <div onClick={onClick} className={classNames("day-container", { 'is-friday': isFriday,disable, selected, 'is-today': isToDay })}>
            <div className="day">
                {day}
            </div>
        </div>
    )
}

export default Day
