import React, { ReactElement, ReactNode, useCallback } from 'react'
import { FieldRenderProps } from 'react-final-form';
import RadioGroupCore from '../RadioGroupCore/RadioGroupCore';

interface Props extends FieldRenderProps<any> {
    children: ReactNode
}

function RadioGroup({
    input,
    children
}: Props): ReactElement {
    const onChange = useCallback((newVal: any) => {
        input.onChange(newVal);
    }, [input])
    return (
        <RadioGroupCore onChange={onChange} value={input.value}>
            {children}
        </RadioGroupCore>
    )
}

export default RadioGroup
