import classNames from 'classnames'
import React, { ReactElement, useCallback } from 'react'
import { FieldRenderProps } from 'react-final-form'
import InputCore from 'components/form/InputCore/InputCore'
import NumberUpDown from './NumberUpDown'
import '../assets/PriceField.scss'

interface Props extends FieldRenderProps<number> {
    label?: string;
    step: number;
    className?: string;
    min?: number;
    max?: number;
    hasChain?: boolean;
    minNumber?: number;
    maxNumber?: number;
    onChainClick?: () => void;
    isChainActive?: boolean;
    chainColor?: 'green' | 'red';
    inplaceLabel?: any;
}

function PriceField({
    input,
    meta,
    label,
    step,
    min,
    max,
    minNumber,
    maxNumber,
    hasChain = true,
    className,
    isChainActive = false,
    onChainClick,
    chainColor,
    inplaceLabel
}: Props): ReactElement {
    const decrement = useCallback(() => {
        const num = Number(input.value - step)
        if ((!minNumber && minNumber !== 0) || minNumber < num) {
            input.onChange(num);
        } else {
            input.onChange(minNumber);
        }
    }, [input, minNumber, step])

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

    return (
        <div className={classNames("form-group", className)}>
            <label>
                {label}
            </label>
            <InputCore
                value={input.value.toLocaleString()}
                amount
                onBlur={input.onBlur}
                inplaceLabel={inplaceLabel}
                onFocus={input.onFocus}
                onKeyDown={handleKeyDown}
                onWheel={handleWheel}
                onChange={(e) => {
                    const value = Number(e.currentTarget.value.replace(/,/g, ''))
                    input.onChange(value)
                }}
                // arrowUp={() => input.onChange(Number(input.value) + step)}
                // arrowDown={() => {
                //     const num = (min !== undefined && input.value - step > min) ? input.value - step : min
                //     input.onChange(num)
                // }}
                // mouseRollerUp={() => {
                //     input.onChange(Number(input.value) + step)
                // }}
                // mouseRollerDown={() => {
                //     const num = (min !== undefined && input.value - step > min) ? input.value - step : min
                //     input.onChange(num)
                // }}
                after={
                    <div className="d-flex">
                        <NumberUpDown
                            up={increment}
                            down={decrement}
                        />
                        <div className="d-flex min-max-price">
                            <div className="my-auto mx-2">
                                <span className="mx-price d-block cursor-pointer" onClick={() => input.onChange(max)}>
                                    {typeof max === 'number' && max.toLocaleString()}
                                </span>
                                <span className="min-price d-block cursor-pointer" onClick={() => {
                                    input.onChange(min)
                                }}>
                                    {typeof min === 'number' && min.toLocaleString()}
                                </span>
                            </div>
                            {hasChain && <i onClick={() => onChainClick && onChainClick()}
                                className={classNames("online-icon-chain my-auto mx-1 cursor-pointer", chainColor, {
                                    'is-chain-active': isChainActive,
                                })}></i>}
                        </div>
                    </div>} />
                    {meta.error && (meta.dirty || meta.touched) && <div className="error">
                {meta.error}
            </div>}
        </div>
    )
}

export default PriceField
