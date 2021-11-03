import classNames from 'classnames'
import React, { ReactElement, ReactNode } from 'react'
import { FieldRenderProps } from 'react-final-form'
import InputCore from '../InputCore/InputCore'
import './assets/TextField.scss'

interface Props extends FieldRenderProps<string> {
    label: string;
    icon?: ReactNode;
    tag?: 'input' | 'textarea';
    rows?: number;
    placeholder?: string;
    className?: string;
    inplaceLabel?: string;
    amount?: boolean;
    after?: ReactNode;
    before?: ReactNode;
    inputClassName?: string;
    autoComplete?: any;
}

function TextField({
    input,
    label,
    icon,
    rows = 4,
    tag = 'input',
    placeholder,
    inplaceLabel,
    className,
    amount = false,
    inputClassName,
    after,
    before,
    meta,
    autoComplete
}: Props): ReactElement {
    return (
        <div className={classNames("form-group", className)}>
            <label>
                {label}
            </label>
            <InputCore {...input}
                amount={amount}
                autoComplete={autoComplete}
                inplaceLabel={inplaceLabel}
                placeholder={placeholder}
                tag={tag}
                icon={icon}
                className={inputClassName}
                rows={rows}
                after={after}
                before={before}
            />
            {meta.touched && meta.error && <div className="error">
                {meta.error}
            </div>}
        </div>
    )
}

export default TextField
