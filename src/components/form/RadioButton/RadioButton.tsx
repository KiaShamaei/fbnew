import classNames from 'classnames';
import React, { ReactElement, ReactNode, useCallback, useContext } from 'react'
import RadioButtonCore from '../RadioButtonCore/RadioButtonCore';
import { RadioGroupContext } from '../RadioGroupCore/RadioGroupCore';
import './assets/RadioButton.scss'

interface Props {
    label: ReactNode | string;
    value: any;
    className?: string;
}

function RadioButton({
    value: radioValue,
    label,
    className,
}: Props): ReactElement {
    const { onChange, value } = useContext(RadioGroupContext)

    const onRadioClick = useCallback(() => {
        onChange(radioValue);
    }, [radioValue, onChange])
    return (
        <div className={classNames("radio-container", className)} onClick={onRadioClick}>

            <span className="radio-title flex-grow-1">
                {label}
            </span>
            <RadioButtonCore
                isSelected={radioValue === value}
            />
        </div>
    )
}

export default RadioButton
