import classNames from "classnames";
import React, { forwardRef, memo, ReactNode, useCallback } from "react";
import { useMemo } from "react";
import './assets/InputCore.scss';

interface Props extends React.HTMLProps<HTMLInputElement> {
    readonly?: boolean;
    inplaceLabel?: string;
    value?: string;
    icon?: ReactNode;
    tag?: 'textarea' | 'input';
    amount?: boolean;
    number?: boolean;
    after?: ReactNode;
    before?: ReactNode;
    increment?: any;
    decrement?: any
}

const InputCore = forwardRef<HTMLInputElement, Props>(function ({
    readonly = false,
    value,
    icon,
    onChange,
    inplaceLabel,
    onClick,
    placeholder,
    tag = 'input',
    amount = false,
    number = false,
    after,
    before,
    increment,
    decrement,
    ...rest
}: Props, ref) {
    const handleInputChange = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
        if (amount) {
            const val = e.target.value.replace(/,/g, '')
            const valNum = Number(val)
            e.target.value = valNum + '';
            if (!isNaN(valNum)) {
                onChange && onChange(e);
            }
            return;
        }
        if (number) {
            const val = e.target.value;
            const valNum = Number(val)
            if ((valNum && !isNaN(valNum)) || val === '') {
                onChange && onChange(e);
            }
            return;
        }
        if (readonly === false) {
            onChange && onChange(e);
        }
    }, [amount, number, readonly, onChange])
    const computedValue = useMemo(() => {
        if (amount) {
            const numVal = Number(value?.replace(/,/g, ''));
            if (!numVal)
                return ''
            if (!isNaN(numVal)) {
                return numVal.toLocaleString()
            }
            return ''
        }
        return value
    }, [amount, value])
    return <div className="input-core d-flex" onClick={onClick}>
        {inplaceLabel && <div className="inplace-label">
            {inplaceLabel}
        </div>}
        {React.createElement(tag, {
            ref,
            type: "text",
            value: computedValue,
            placeholder,
            onChange: handleInputChange,
            // onKeyDown:handleKeyDown,
            // onWheel:handleMouseRoller,
            ...rest
        })}
        <div className={classNames("icon", { 'd-none': !icon })}>
            {icon}
        </div>
        {after}
    </div>
})

export default memo(InputCore);