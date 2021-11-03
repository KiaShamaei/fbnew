import React, { ReactElement, useCallback } from 'react'
import InputCore from 'components/form/InputCore/InputCore'
import { FieldRenderProps } from 'react-final-form'
import '../assets/NumberField.scss'
import classNames from 'classnames'
import NumberUpDown from './NumberUpDown'

interface Props extends FieldRenderProps<number> {
    label?: string;
    step: number;
    inplaceLabel?: any;
    children?: any;
    displayMinMax?: boolean;
}

function NumberField({
    input,
    meta,
    label,
    className,
    step = 1,
    min = 0,
    max,
    inplaceLabel,
    children,
    displayMinMax = false,
    disabled=false
}: Props): ReactElement {

    const decrement = useCallback(() => {
        const num = Number(input.value - step)
        if ((!min && min !== 0) || min < num) {
            input.onChange(num);
        }
    }, [input, min, step])

    const increment = useCallback(() => {
        const num = Number(input.value + step)
        input.onChange(num);
    }, [input, step])

    const handleKeyDown = useCallback((e) => {
        switch (e.key) {
            case 'ArrowUp':
                increment();
                break;
            case 'ArrowDown':
                decrement();
                break;
        }
    }, [decrement, increment]);

    const handleWheel = useCallback((e) => {
        if (e.deltaY > 0) {
            decrement()
        } else {
            increment()
        }
    }, [decrement, increment])

    const handleInputChange = useCallback((e) => {
        const value = e.currentTarget.value.replace(/,/g, '')
        if (!min || Number(value) > min)
            input.onChange(Number(value))
    }, [input, min])

    return (
        <div className={classNames("form-group", className)}>
            <label>
                {label}
            </label>
            <InputCore
                value={input.value.toString()}
                amount
                onBlur={input.onBlur}
                onFocus={input.onFocus}
                inplaceLabel={inplaceLabel}
                onChange={handleInputChange}
                increment={increment}
                decrement={decrement}
                onKeyDown={handleKeyDown}
                onWheel={handleWheel}
                disabled={disabled}
                after={<div className="d-flex">
                    <NumberUpDown
                        up={increment}
                        down={decrement} />
                    {displayMinMax && <div className="d-flex min-max-price">
                        {(max !== undefined || min !== undefined) && <div className="my-auto mx-2">
                            <span className="mx-price d-block cursor-pointer" onClick={() => input.onChange(max)}>
                                {typeof max === 'number' && max.toLocaleString()}
                            </span>
                            <span className="min-price d-block cursor-pointer" onClick={() => {
                                // const num = (min !== undefined && input.value - step > min) ? input.value - step : min
                                input.onChange(min)
                            }}>
                                {typeof min === 'number' && min.toLocaleString()}
                            </span>
                        </div>}
                    </div>}
                </div>}
            />
            {meta.error && (meta.touched || meta.dirty) && <div className="error">
                {meta.error}
            </div>}
            {children}
        </div>
    )
}

export default NumberField
