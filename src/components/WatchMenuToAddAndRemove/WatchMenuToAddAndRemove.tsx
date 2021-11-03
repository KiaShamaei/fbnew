import classNames from 'classnames'
import { useSnackbar } from 'container/Snackbar/Snackbar'
import useDataGetter from 'hooks/useDataGetter'
import { FETCH_WATCH_LIST } from 'pages/Dashboard/panels/Watch/meta/actionTypes'
import { IWatchListAction, IWatchMenuItem } from 'pages/Dashboard/panels/Watch/meta/types'
import React, { useCallback, Fragment } from 'react'
import { useMemo } from 'react'
import { useState } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useDispatch, useSelector } from 'react-redux'
import store from 'redux/store'
import { IReduxState } from 'redux/types'
import { BarLoader } from 'react-spinners'
import './assets/WatchMenuToAddAndRemove.scss'
import useRemoveFromWatch from 'hooks/useRemoveFromWatch'

const messages = defineMessages({
    successfulyInsertToWatch: {
        id: 'successfuly-insert-to-watch',
        defaultMessage: 'successfuly insert to watch'
    },
    errorOccured: {
        id: 'error-occured',
        defaultMessage: 'error occured'
    },
    removedFromWatchSuccessfuly: {
        id: 'removed-from-watch-successfuly',
        defaultMessage: 'removed from watch successfuly'
    }
})


interface Props {
    isin: string;
    hasRemove?: boolean;
}

const WatchMenuToAddAndRemove = ({
    isin,
    hasRemove = false
}: Props) => {
    const intl = useIntl()
    const data: IWatchMenuItem[] | undefined = useMemo(() => store.getState().watchMenu.data, [])
    const watchData = useSelector((state: IReduxState) => state.watch.data)
    const {
        display: displaySnackbar,
    } = useSnackbar()
    const isIsinExistInWatchMenu = useCallback((watchListId: number, isin: string) => {
        if (!watchData)
            return false;
        return (watchData[watchListId] ?? []).some(watchItem => watchItem.isin === isin)
    }, [watchData])

    const [menuList, setMenuList] = useState(() => {
        return (data || []).map(item => ({
            ...item,
            existIn: isIsinExistInWatchMenu(item.id, isin)
        }))
    })

    const {
        fetch: postToWatch,
        loading: postToWatchLoading
    } = useDataGetter({
        url: '/watchlist/user/{watchListId}/{isin}',
        fetchFirst: false,
        method: 'POST'
    })

    const dispatch = useDispatch()
    const addToWatch = useCallback((watchListId: number) => {
        postToWatch(null, {}, `/watchlist/user/${watchListId}/${isin}`)
            .then(() => {
                setMenuList(preMenuList => {
                    const preMenuListCopy = [...preMenuList]
                    const watchItem = preMenuListCopy.find(item => item.id === watchListId)
                    if (watchItem) {
                        watchItem.existIn = true
                    }
                    return preMenuListCopy;
                })
                displaySnackbar({
                    message: intl.formatMessage(messages.successfulyInsertToWatch),
                    type: 'success',
                })
                dispatch<IWatchListAction>({
                    type: FETCH_WATCH_LIST,
                    payload: {
                        id: watchListId,
                        title: ''
                    }
                })
            })
            .catch((error) => {
                displaySnackbar({
                    message: intl.formatMessage(messages.errorOccured),
                    type: 'error',
                })
            })
    }, [dispatch, displaySnackbar, intl, isin, postToWatch])

    const {
        remove,
        loading: removeLoading
    } = useRemoveFromWatch()

    return (
        <Fragment>
            {(menuList || []).map(item => {
                return <div key={item.id} onClick={() => {
                    if (Boolean(item.existIn) === false) {
                        addToWatch(item.id)
                    }
                }} className={classNames("d-table watch-menu-to-add-and-remove-item cursor-pointer", {
                    'not-exist': isIsinExistInWatchMenu,
                    })}>
                    {item.existIn ? <i 
                    onClick={() => {
                        if(hasRemove)
                        remove(item.id, isin)
                    }}
                    className={classNames("checked my-auto online-icon-tick-bold",{
                        'online-icon-tick-bold': hasRemove === true,
                        'online-icon-close': hasRemove === false
                    })} /> : <i className="add online-icon-add ltr text-left my-auto" />}
                    <span className="flex-grow-1 mr-2 title">
                        {item.title}
                    </span>
                </div>
            })}
            {(postToWatchLoading || removeLoading) && <div className="d-flex justify-content-center">
                <BarLoader css="m-auto w-100" color="#00c288" width={100} height={5} />
            </div>}
        </Fragment>
    )
} 

export default WatchMenuToAddAndRemove
