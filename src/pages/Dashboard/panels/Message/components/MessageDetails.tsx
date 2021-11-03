import React, { ReactElement } from 'react'
import { IMessage } from '../meta/type'
import '../assets/Messages.scss'
import { useEffect } from 'react';
import useDataGetter from 'hooks/useDataGetter';
import Loading from 'components/Loading/Loading';
import { useContext } from 'react';
import { MessagesContext } from '../Messages';

interface Props {
    data: IMessage | null | undefined;
    type: 'overseer' | 'system'
}
function MessageDetails({ data, type }: Props): ReactElement | null {

    const {
        loading,
        fetch
    } = useDataGetter({
        method: 'POST',
        fetchFirst: false
    })

    const { fetch: fetchMessagesCount } = useContext(MessagesContext)

    useEffect(() => {
        fetch(null, null, `/message/${type}/${encodeURIComponent(data?.id)}`)
        .then(() => {
            fetchMessagesCount()
        })
    }, [data?.id, fetch, type, fetchMessagesCount])

    if (data === null || data === undefined) {
        return null;
    }

    return (
        <div className="message-details">
            {loading && <Loading />}
            <div className="d-flex pt-2 justify-content-space-between message-header">
                <div className={'title'}>
                    ‫‪{data.title}‬
                </div>

                <span className="d-flex date-and-time">
                    <span className="date">
                        ‫‪{data.date}

                    </span>
                    <span className="time">
                        {data.time}
                    </span>
                </span>
            </div>
            <div>
                <p>{data.titr}</p>
            </div>

        </div>
    )
}

export default MessageDetails
