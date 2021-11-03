import API from 'API'
import { useTseSocket } from 'container/SocketManagerContainer/TseSocketManager';
import { SocketKeysEnum } from 'enums/SocketKeysEnum';
import React, { Fragment, ReactElement, useCallback, useEffect, useState } from 'react'
import { messageParser,messageParserSocket } from '../meta/parser';
import MessageList from './MessageList'

interface Props {
    url: string;
    height: number;
    width: number;
    title: string;
    unreadCount: any
}

function MessagesSysmtemList({
    url,
    width,
    height,
    title,
    unreadCount
}: Props): ReactElement {


    const [dataState, setDataState] = useState<{
        items: any[],
        hasEnd: boolean
    }>({
        items: [],
        hasEnd: false
    });

    
//     //connect socket
//     const {registerPublicTse} = useTseSocket()

//   useEffect(() => {
//     const cb = (data: any) => {
        
//       const MessageData = messageParserSocket(data)
//       const MessageDataFinal =messageParser(MessageData)
        
//       setDataState((prevState: any) => ({
//         ...prevState,
//         data: [MessageDataFinal].concat(dataState.items ?? []),
//       }))
//     }
//     if (registerPublicTse)
//       registerPublicTse(cb, SocketKeysEnum.OverseerMessage)

//   }, [dataState.items, registerPublicTse])

//   //end socket



    const loadNextPage = useCallback((startIndex: number, endIndex: number) => {
        const page = (Math.ceil(endIndex / 24))
        return API.get(url, {
            params: {
                page,
                limit: 24,
            }
        }).then((res) => {
            const data = res?.data?.data;
            if (data)
                setDataState(prev => ({
                    hasEnd: data.length < 24 ? true : false,
                    items: prev.items.concat(data)
                }))
        }).catch(() => {

        })
    }, [url])


    return (
        <Fragment>
            <MessageList
                data={dataState.items}
                hasNextPage={!dataState.hasEnd}
                title={title}
                height={height - 44}
                type={'system'}
                width={width}
                loadNextPage={loadNextPage}
            />
        </Fragment>
    )
}

export default MessagesSysmtemList
