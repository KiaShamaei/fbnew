import React, { ReactElement, useCallback, useRef, useState } from 'react'
import { IWatchMenuItem } from '../meta/types'
import '../assets/WatchMenu.scss'
import useToggle from 'hooks/useToggle'
import classNames from 'classnames'
import useClickOutside from 'hooks/useClickOutside'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import { FETCH_WATCH_MENU_LIST, SET_ACTIVE_WATCH } from '../meta/actionTypes'
import useDataGetter from 'hooks/useDataGetter'
import { BarLoader } from 'react-spinners'
import { useSnackbar } from 'container/Snackbar/Snackbar'
import { defineMessages, useIntl } from 'react-intl'

const messages = defineMessages({
    errorOccured: {
        id: 'error-occured',
        defaultMessage: 'error occured'
    }
})

function WatchMenu(): ReactElement {
    const [input, setInput] = useState<string>('')
    const { activeWatchMenu, isLoading } = useSelector((state: IReduxState) => state.watchMenu)
    const { display: displaySnackbar } = useSnackbar()
    const dispatch = useDispatch()
    const intl = useIntl()
    const { data } = useSelector((state: IReduxState) => state.watchMenu)

    const isLoggedin = useSelector((state: IReduxState) => state.user.isLoggedIn)
    const {
        fetch: addToWatchMenu,
        loading: addToWatchLoading
    } = useDataGetter({
        url: '/watchlist/user',
        method: 'POST',
        fetchFirst: false
    })

    const {
        fetch: removeWatchMenuItem,
        loading: removeWatchMenuLoading
    } = useDataGetter({
        url: 'watchlist/user/{watchListId }',
        method: 'DELETE',
        fetchFirst: false
    })

    const onAddClick = useCallback(() => {
        addToWatchMenu(null, {
            name: input,
            note: input,
            type: 0
        }).then((res) => {
            dispatch({ type: FETCH_WATCH_MENU_LIST })
            const item: IWatchMenuItem = {
                id: res?.data,
                title: input,
                removable: true
            };
            dispatch({ type: SET_ACTIVE_WATCH, payload: item })
            setInput('')
        }).catch(err => {
            displaySnackbar({
                message: intl.formatMessage(messages.errorOccured),
                type: 'error'
            })
        })
    }, [addToWatchMenu, dispatch, displaySnackbar, input, intl])


    const { isOpen, toggle, setIsOpen } = useToggle()

    const ref = useRef<HTMLDivElement>(null)

    useClickOutside(ref, () => {
        setIsOpen(false)
    })

    const onItemSelect = useCallback((item: IWatchMenuItem) => {
        dispatch({ type: SET_ACTIVE_WATCH, payload: item })
        // dispatch<IWatchListAction>({ type: FETCH_WATCH_LIST, payload: item })
    }, [dispatch])



    const removeWatchMenu = useCallback((id: number) => {
        removeWatchMenuItem(null, null, `/watchlist/user/${id}`)
            .then(() => {
                dispatch({
                    type: FETCH_WATCH_MENU_LIST,
                    selectMenu: id === activeWatchMenu?.id
                })
            }).catch((err) => {
                displaySnackbar({
                    message: intl.formatMessage(messages.errorOccured),
                    type: 'error'
                })
            })
    }, [dispatch, displaySnackbar, intl, removeWatchMenuItem, activeWatchMenu])

    return (
        <div className="watch-menu" ref={ref}>
            <div className={classNames("watch-menu-contaienr", { 'is-close': !isOpen })}>
                <div className="watch-menu-selected cursor-pointer d-flex" onClick={toggle}>
                    <span className="title flex-grow-1 cursor-pointer">
                        {activeWatchMenu?.title ?? 'ایجاد دیده بان جدید'}
                    </span>
                    <i className="online-icon-down-arrow my-auto ml-1"></i>
                </div>
                <div className={"watch-items-menu-dropdown"}>
                    {isLoggedin &&
                        <form onSubmit={(e) => {
                            e.preventDefault()
                            onAddClick()
                        }} className="watch-menu-new d-flex">
                            <input
                                value={input}
                                onChange={e => setInput(e.target.value)}
                                type="text"
                                placeholder="نام دیده بان جدید"
                                className="flex-grow-1 new-watch"
                            />

                            <i className="online-icon-add" onClick={onAddClick}></i>

                        </form>
                    }
                    {(addToWatchLoading || removeWatchMenuLoading || isLoading) && <span className="d-block watch-menu-loading">
                        <BarLoader css="m-auto w-100 d-block" color="#00c288" width={178} height={5} />
                    </span>}

                    <ul className={"watch-menu-list"}>
                        {data && data.map((item, index) => <li
                            className={classNames("watch-menu-item d-flex", { 'is-selected': item.id === activeWatchMenu?.id })}
                            key={item.id}>
                            <span className="title flex-grow-1" onClickCapture={() => onItemSelect(item)}>
                                {item.title}
                            </span>
                            {item.removable && <i
                                onClickCapture={() => {
                                    if(!removeWatchMenuLoading)
                                        removeWatchMenu(item.id)
                                }}
                                className="online-icon-delete"></i>}
                        </li>)}
                    </ul>
                </div>
            </div>
        </div>
    )
}

export default WatchMenu
