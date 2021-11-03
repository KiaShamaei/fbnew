import classNames from 'classnames'
import React, { ReactElement, ReactNode } from 'react'
import { FieldRenderProps } from 'react-final-form'
import Combobox from '../Combobox/Combobox'
import { IComboboxItem, ICombobxProps } from '../Combobox/meta/types'

interface Props extends FieldRenderProps<IComboboxItem>, ICombobxProps {
    label: string;
    placeholder?: string;
    icon?: ReactNode;
    marketCheckbox?:boolean;
    containerClassName?: string;
}

function ComboboxField({
    input,
    meta,
    placeholder,
    label,
    icon,
    marketCheckbox,
    containerClassName,
    ...rest
}: Props): ReactElement {
    return (
        <div className={classNames("form-group", containerClassName)}>
            <label>
                {label}
            </label>
            <Combobox {...rest} onChange={input.onChange} value={input.value} placeholder={placeholder} marketCheckbox={marketCheckbox}/>
            {meta.error && meta.touched && <div className="error">
                {meta.error}
            </div>}
        </div>
    )
}

export default ComboboxField
