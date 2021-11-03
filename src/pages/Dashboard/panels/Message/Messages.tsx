import { IPanelItemProps } from 'pages/Dashboard/meta/types'
import React, { Fragment, ReactElement, useContext, useEffect, useState } from 'react'
import './assets/Messages.scss'
import { TabItem, TabPanelControlled } from 'components/TabPanel/TabPanel';
import { defineMessages, FormattedMessage, useIntl } from 'react-intl';
import MessageFilterMenu from './components/MessageFilterMenu';
import MessageListContainer from './components/MessageListContainer';
import MessagesSysmtemList from './components/MessagesSysmtemList';
import { useDispatch, useSelector } from 'react-redux';
import { IReduxState } from 'redux/types';
import { useCallback } from 'react';
import loginPic from './assets/login.svg'
import { setActivePanelRightBottom } from 'pages/Dashboard/meta/actions';
import Button from 'components/Button/Button';
import { LoginContext } from 'container/LoginContainer/contexts/LoginContext';
import useDataGetter from 'hooks/useDataGetter';
import { endpoints } from 'appConstants';
import { createContext } from 'react';
import { useMemo } from 'react';
import { messageParser, messageParserSocket } from './meta/parser';

const messages = defineMessages({
    observerMessages: {
        id: 'observer-messages',
        defaultMessage: 'observer messages'
    },
    systemMessages: {
        id: 'system-messages',
        defaultMessage: 'System messages'
    }
})

interface Props extends IPanelItemProps {
}

export const MessagesContext = createContext<{ fetch: () => void }>({ fetch: () => { } })

function Messages({
    height,
    width
}: Props): ReactElement {
    const messageActiveTab = useSelector((state: IReduxState) => state.dashboard.params?.messageActiveTab)
    const isLoggedIn = useSelector<IReduxState>(state => state.user.isLoggedIn)
    const dispatch = useDispatch()
    const [filter1, setFilter1] = useState<string>('ALL_MESSAGES')
    const intl = useIntl()
    const { open } = useContext(LoginContext)
    const { data, fetch } = useDataGetter({
        url: '/message/unread',
        method: 'GET',
        fetchFirst: isLoggedIn ? true : false,
        parseData: true
    })





    const handleActiveTabChange = useCallback((v) => {
        dispatch(setActivePanelRightBottom('MESSAGE', { messageActiveTab: v }))
    }, [dispatch])
    const overSeerMessageCount = data && data[0]
    const systemMessageCount = data && data[1]

    const messagesContextValue = useMemo(() => ({
        fetch
    }), [fetch])

    return <MessagesContext.Provider value={messagesContextValue}>
        <div className="messages" style={{ backgroundColor: 'white' }}>
            <TabPanelControlled
                activeTab={messageActiveTab ?? 'observer'}
                onActiveTabChange={handleActiveTabChange}
                panelsMenu={[
                    <MessageFilterMenu filter={filter1} setFilter={setFilter1} />,
                ]}
            >

                {[<TabItem
                    id={'observer'}
                    title={<Fragment>
                        {isLoggedIn && overSeerMessageCount !== 0 ? <div className="dataLenght-co">{overSeerMessageCount}</div> : null}
                        {intl.formatMessage(messages.observerMessages)}
                    </Fragment>}
                >
                    <MessageListContainer
                        url={'/message/overseer'}
                        unreadCount={overSeerMessageCount}
                        height={height - 44}
                        width={width - 32}
                    />

                </TabItem>,
                <TabItem id={'system'}
                    title={<Fragment>
                        {intl.formatMessage(messages.systemMessages)}
                        {isLoggedIn && systemMessageCount !== 0 ? <div className="dataLenght">{systemMessageCount}</div> : null}
                    </Fragment>}>
                    {isLoggedIn ? <MessagesSysmtemList
                        url={'/message/system'}
                        title={intl.formatMessage(messages.systemMessages)}
                        height={height - 44}
                        width={width - 32}
                        unreadCount={systemMessageCount}
                    /> : <div className="not-data-today-trade">
                        <div className="img-container">
                            <img src={loginPic} alt="dear user you havnot make any deal today" />
                        </div>
                        <span className="text d-block text-center" style={{ top: '80%' }}>
                            <span className="text-center d-block">
                                <FormattedMessage id={'for-see-messages-you-have-to-login'} defaultMessage={'for-see-messages-you-have-to-login'} />
                            </span>
                            <Button color="blue" onClick={open}>
                                <FormattedMessage id="login-account" defaultMessage="login account" />
                            </Button>
                        </span>
                    </div>}
                    {/* <MessagesSysmtemList
                    url={'/message/system'}
                    title={intl.formatMessage(messages.systemMessages)}
                    height={height - 44}
                    width={width - 32}
                /> */}
                </TabItem>
                ]}
            </TabPanelControlled>
        </div>
    </MessagesContext.Provider>
}

export default Messages
