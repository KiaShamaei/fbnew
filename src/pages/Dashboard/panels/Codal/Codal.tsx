import { IPanelItemProps } from 'pages/Dashboard/meta/types'
import React, { ReactElement, useCallback, useEffect, useState } from 'react'
import CodalList from './components/CodalList';
import { defineMessages, useIntl } from 'react-intl';
import CodalFilterMenu from './components/CodalFilterMenu';
import { ICodalFilter } from './meta/type';
import './assets/Codal.scss'
import { useDispatch, useSelector } from 'react-redux';
import { CODAL, FETCH_CODAL_LIST } from './meta/actionTypes';
import { IReduxState } from 'redux/types';
import { useRef } from 'react';
import { getSetDataType } from 'redux/utils/sagaTypeGetter';
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager';


const messages = defineMessages({
    observerMessages: {
        id: 'observer-messages',
        defaultMessage: 'obsedefaultFiltersrver messages'
    },
    systemMessages: {
        id: 'system-messages',
        defaultMessage: 'System messages'
    },
    notifications: {
        id: 'notifications',
        defaultMessage: 'notifications'
    }
})

interface Props extends IPanelItemProps {
    defaultFilters: any;
}

function Codal({
    height,
    width
}: Props): ReactElement {

    const [filter, setFilter] = useState<ICodalFilter>({
        base: "ALL_MESSGES"
    })

    const params = useSelector((state: IReduxState) => state.dashboard.params)

    const isFirst = useRef<boolean>(true);
   
    
    const intl = useIntl()
    const dispatch = useDispatch()

    useEffect(() => {
        if (isFirst.current) {
            isFirst.current = false
            return;
        }
        dispatch({ type: FETCH_CODAL_LIST, params: { ...(params ?? {}), page: 1 }, reset: true })
        return () => {
            dispatch({ type: getSetDataType(CODAL), payload: { data:[], hasEnd: false } })
        }
    }, [params, dispatch])


    const { data, hasEnd } = useSelector((state: IReduxState) => state.codal)

    const loadNextPage = useCallback((startIndex: number, endIndex: number) => {
        if(endIndex >= data.length)
            dispatch({ type: FETCH_CODAL_LIST, params: { ...(params ?? {}), page: Math.ceil(endIndex / 24) + 1 } })
        return Promise.resolve();
    }, [data.length, dispatch, params])

    const handleCodalBaseFilterChange = useCallback((s) => {
        setFilter(prev => ({
            ...prev,
            base: s
        }))
    }, [])

    return <div className="codal">
        <CodalFilterMenu setFilter={handleCodalBaseFilterChange} filter={filter.base} />
        <CodalList
            data={data ?? []}
            hasNextPage={!hasEnd}
            title={intl.formatMessage(messages.notifications)}
            height={height - 44}
            width={width - 32}
            loadNextPage={loadNextPage}
            hasFilter={filter.base}
        />
    </div>
}

export default Codal
