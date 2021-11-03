import React, { ReactElement } from 'react'
import { FieldRenderProps } from 'react-final-form'
import { IComboboxItem } from '../Combobox/meta/types'
import { LazyComboboxProps } from './meta/types'
import LazyCombobox from './components/LazyCombobox'
import classNames from 'classnames'

interface Props extends FieldRenderProps<IComboboxItem>, LazyComboboxProps {

}

function LazyComboboxField({
    input,
    meta,
    onChange,
    value,
    label,
    className,
    hasClear = false,
    ...rest
}: Props): ReactElement {
    return (
        <div className={classNames("form-group", className)}>
            <label>
                {label}
            </label>
            <LazyCombobox
                onChange={input.onChange}
                value={input.value}
                {...rest}
                hasClear={hasClear}
            />
            {meta.touched && meta.error && <div className="error">
                {meta.error}
            </div>}
        </div>
    )
}

export default LazyComboboxField
