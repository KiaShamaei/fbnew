import { useCallback } from 'react'
import classnames from 'classnames'
import './assets/Checkbox.scss'
import { ICheckboxProps } from './meta/types'

function Checkbox({
    input,
    disabled,
    className,
    label
}: ICheckboxProps) {
    const onClick = useCallback(() => {
        if (disabled)
            return
            input.onChange(!input.value);
    }, [disabled, input])
    return (
        <div className="d-flex checkbox-container" onClick={onClick}>
            <div
                className={classnames(className, "checkbox my-auto", { 'checked': input.value })}>
                <i className="online-icon-tick"></i>
            </div>
            <span className="checkbox-title my-auto d-block">
                {label}
            </span>
        </div>
    )
}

export default Checkbox
