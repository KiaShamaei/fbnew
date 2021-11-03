import { IComboboxItem } from 'components/form/Combobox/IComboboxItem'
import ComboboxField from 'components/form/ComboboxField/ComboboxField'
import useDataGetter from 'hooks/useDataGetter'
import React, { ReactElement } from 'react'
import { useMemo } from 'react'
import { Field } from 'react-final-form'
import { defineMessages, useIntl } from 'react-intl'

const messages = defineMessages({
    pleaseSelectASymbol: {
        id: 'please-select-a-symbol',
        defaultMessage: 'please select a symbol'
    },
    symbol: {
        id: 'symbol',
        defaultMessage: 'symbol'
    },
    nameIsRequired: {
        id: 'name-is-required',
        defaultMessage: '{name} is required'
    }
})

function SymbolCombobox(): ReactElement {

    const intl = useIntl()

    const {
        data,
    } = useDataGetter<any[]>({
        url: '/instrument/ipo',
        parseData: true
    })

    const items = useMemo<IComboboxItem[]>(() => {

        if (data)
            return data.map(item => ({
                id: item[0],
                label: item[1],
                maxPrice: item[3],
                minPrice: item[4],
                maxQuantity : item[5],
                minQuantity : item[6]
            }))
        return []
    }, [data])

    return (
        <Field
            component={ComboboxField}
            items={items}
            defaultValue={items[0]}
            name="symbol"
            className="mt-1"
            label={intl.formatMessage(messages.pleaseSelectASymbol)}
            validate={(v) => {
                if(!v) {
                    return intl.formatMessage(messages.nameIsRequired, {
                        name: intl.formatMessage(messages.symbol)
                    })
                }
            }}
        />
    )
}

export default SymbolCombobox
