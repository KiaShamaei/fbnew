import InputCore from 'components/form/InputCore/InputCore'
import React, { ChangeEvent, memo, ReactElement, useCallback } from 'react'
import { useIntl } from 'react-intl'
import '../assets/CurrentOrdersSearch.scss'

interface Props {
    setSearchValue: (serachValue: string) => void,
    searchValue:any
}

function CurrentOrdersSearch({
    setSearchValue,
    searchValue
}: Props): ReactElement {
    const intl = useIntl()
    const handleInputChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
        const value = e.target.value;
        setSearchValue(value);
    }, [setSearchValue])
    return (
        <div className="current-orders-search px-2">
            <InputCore value={searchValue} onChange={handleInputChange} placeholder={intl.formatMessage({ id: 'current-orders', defaultMessage: 'current orders' })} icon={<i className="online-icon-search" />} />            
        </div>
    )
}

export default memo(CurrentOrdersSearch)
