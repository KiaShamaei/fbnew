import React, { ReactElement } from 'react'
import classNames from 'classnames';
import './assets/RadioButtonCore.scss'

interface Props {
    isSelected?: boolean;
    className?: string;
}

function RadioButtonCore({
    isSelected,
    className
}: Props): ReactElement {
    return (
        <div className={classNames("radio-core", className, { selected: isSelected })}>
            <div className="circle"></div>
        </div>
    )
}

export default RadioButtonCore
