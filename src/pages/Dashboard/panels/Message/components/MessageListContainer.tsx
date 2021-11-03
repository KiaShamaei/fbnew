import API from 'API'
import LazyCombobox from 'components/form/LazyComboboxField/components/LazyCombobox';
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager';
import { SocketKeysEnum } from 'enums/SocketKeysEnum';
import { setActivePanelRightBottom } from 'pages/Dashboard/meta/actions';
import React, { Fragment, ReactElement, useCallback, useState } from 'react'
import { ReactNode } from 'react';
import { useRef } from 'react';
import { useEffect } from 'react';
import { defineMessages, useIntl } from 'react-intl';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from 'redux/types';
import MessageList from './MessageList'

const messages = defineMessages({
    enterTheIconYouWantToSearch: {
        id: 'enter-the-icon-you-want-to-search',
        defaultMessage: 'enter the icon you want to search'
    }
})

interface Props {
    url: string;
    height: number;
    width: number;
    unreadCount: any
}

function MessageListContainer({
    unreadCount,
    url,
    width,
    height,
}: Props): ReactElement {


    const params = useSelector((state: IReduxState) => state.dashboard.params)

    const [dataState, setDataState] = useState<{
        items: any[],
        hasEnd: boolean
    }>({
        items: [],
        hasEnd: false
    });

    const hasRendered = useRef<boolean>(false)

    //connect socket

    const { registerPublicTse, unRegisterGlobal } = useTseSocket()
    
    useEffect(() => {

        const cb = (data: any) => {
            if(params || (Object.keys(params ?? {}).length > 0))
                return 
            setDataState((prevState: any) => ({
                hasEnd: false,
                items: [data].concat(prevState.items ?? []),
                }))
        }
        if (registerPublicTse) {
            registerPublicTse(cb, SocketKeysEnum.OverseerMessage)
        }
        return () => {
            unRegisterGlobal && unRegisterGlobal(cb)
        }
    }, [params, registerPublicTse, unRegisterGlobal])



    useEffect(() => {
        if (!hasRendered.current) {
            hasRendered.current = true;
            return;
        }
        debugger;
        setDataState({
            hasEnd: false,
            items: []
        })
    }, [params])

    // end connect socket

    const loadNextPage = useCallback((startIndex: number, endIndex: number) => {
        const page = (Math.ceil(endIndex / 24))
        return API.get(url, {
            params: {
                page: page === 0 ? 1 : page,
                limit: 24,
                tags: params?.symbolMessage?.id
            }
        }).then((res) => {
            const data = res?.data?.data;
            setDataState(prev => ({
                hasEnd: data?.length < 24 || data === null ? true : false,
                items: data ? (prev?.items ?? []).concat(data) : ["", ""]
            }))
        }).catch(() => {

        })
    }, [params?.symbolMessage?.id, url])

    const dispatch = useDispatch()
    const intl = useIntl()
    const searchInputPlaceHolder = intl.formatMessage(messages.enterTheIconYouWantToSearch);

    return (
        <Fragment>

            <div className="message-search">
                <LazyCombobox
                    value={params?.symbolMessage}
                    placeholder={searchInputPlaceHolder}
                    url={(searchKey: string) => `/instrument/search/${searchKey}`}
                    onChange={(v) => {
                        dispatch(setActivePanelRightBottom('MESSAGE', { symbolMessage: v }))
                        console.log(v)
                    }}
                    hasClear
                    parser={(info: any) => {
                        const data = info.data || [];
                        if (data && data.length > 0)
                            return data.map((item: any[]) => ({
                                label: item ? item[1] : null,
                                id: item ? item[0] : null
                            }))
                        return []
                    }} icon={<i className="online-icon-search" />}
                />
            </div>
            <MessageList
                data={dataState.items}
                hasNextPage={!dataState.hasEnd}
                type={'overseer'}
                // title={title}
                height={height - 44}
                width={width}
                loadNextPage={loadNextPage}
            />

        </Fragment>
    )
}

export default MessageListContainer
