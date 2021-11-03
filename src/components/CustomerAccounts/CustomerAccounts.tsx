import { IComboboxItem } from 'components/form/Combobox/IComboboxItem'
import ComboboxField from 'components/form/ComboboxField/ComboboxField'
import useDataGetter from 'hooks/useDataGetter'
import React, { ReactElement } from 'react'
import { useMemo } from 'react'
import { Field } from 'react-final-form'

interface Props {
    containerClassName?: string;
    label?: string;
}

function CustomerAccounts({
    containerClassName,
    label
}: Props): ReactElement {
    const {
        data,
    } = useDataGetter<any>({
        url: '/request/customer-bank-account',
        parseData: true
    })

    const finalData: IComboboxItem[] = useMemo(() => {
        if (data)
            return data.map((item: any) => ({
                id: item[0],
                label: `${item[1]} - ${item[2]} - ${item[3]}`
            }))
        return [];
    }, [data])

    return (
            <Field
                label={label}
                name="customerBankAccount"
                containerClassName={containerClassName}
                component={ComboboxField} 
                items={finalData}
            />
    )
}

export default CustomerAccounts
