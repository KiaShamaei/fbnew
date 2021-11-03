import API from 'API'
import Combobox from '../../Combobox/Combobox'
import React, { Fragment, ReactElement, useMemo, useState } from 'react'
import { useCallback } from 'react'
import debounceFn from 'debounce-fn'
import { LazyComboboxProps } from '../meta/types'
import { IComboboxItem } from 'components/form/Combobox/meta/types'
import { useRef } from 'react'
import axios from 'axios'
import keyboardConverter from 'utils/keyboardConverter'

function LazyCombobox({
    url,
    parser,
    getParams,
    onChange,
    hasClear = false,
    value,
    icon,
    placeholder
}: LazyComboboxProps): ReactElement {

    const [dataState, setDataState] = useState<{
        data: IComboboxItem[],
        loading: boolean;
    }>({
        data: [],
        loading: false
    })

    const cancelToken = useRef(axios.CancelToken.source())

    const callApi = useMemo(() => debounceFn((searchKey: string) => {
        if (cancelToken.current) {
            cancelToken.current.cancel()
        }
        if (!searchKey) {
            setDataState(prev => ({
                ...prev,
                loading: false
            }))
            return;
        }

        setDataState(s => ({
            ...s,
            loading: true
        }))
        cancelToken.current = axios.CancelToken.source()
        const convertedSearchValue = keyboardConverter(searchKey)
        API.get(url(convertedSearchValue), {
            params: getParams ? getParams(searchKey) : null,
            cancelToken: cancelToken.current.token
        })
            .then((res) => {
                setDataState({
                    data: parser(res.data),
                    loading: false
                })
            }).catch(() => {

            })
    }, { wait: 500 }),
        [getParams, parser, url])

    const onInputChange = useCallback((v: string, hasClosed) => {
        callApi(v)
    }, [callApi])

    return (
        <Combobox
            items={dataState.data}
            hasInput
            icon={<Fragment>
                {hasClear && value && <i className="online-icon-close cursor-pointer ml-1" onClick={() => { onChange(undefined) }} />}
                {icon}
            </Fragment>}
            placeholder={placeholder}
            value={value}
            loading={dataState.loading}
            onChange={onChange}
            onInputChange={onInputChange}
            inputValue={value?.label}
        />
    )
}

export default LazyCombobox
