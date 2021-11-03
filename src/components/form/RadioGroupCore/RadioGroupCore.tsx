import React, { ReactElement, ReactNode } from 'react'

export const RadioGroupContext = React.createContext<{
    value?: string;
    onChange: (newVal: string) => void;
}>({
    onChange: () => { }
});

interface Props {
    children: ReactNode,
    onChange: (newVal: string) => void,
    value?: string;
}

function RadioGroupCore({
    onChange,
    value,
    children
}: Props): ReactElement {
    return (
        <RadioGroupContext.Provider
            value={{
                value: value,
                onChange
            }}>
            {children}
        </RadioGroupContext.Provider>
    )
}

export default RadioGroupCore
