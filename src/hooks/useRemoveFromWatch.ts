import { useSnackbar } from 'container/Snackbar/Snackbar'
import { FETCH_WATCH_LIST } from 'pages/Dashboard/panels/Watch/meta/actionTypes'
import { IWatchListAction } from 'pages/Dashboard/panels/Watch/meta/types'
import { useCallback } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useDispatch } from 'react-redux'
import useDataGetter from './useDataGetter'

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

function useRemoveFromWatch() {
    const {
        display: displaySnackbar,
    } = useSnackbar()
    const intl = useIntl()

    const dispatch = useDispatch()
    const {
        fetch: removeFromWatch,
        loading: removeFromWatchLoading
    } = useDataGetter({
        url: '​/watchlist​/user​/{watchListId}​/{isin}',
        fetchFirst: false,
        method: 'DELETE'
    })

    
    const handleRemove = useCallback((watchListId: number, isin: string) => {
        removeFromWatch(null, {}, `/watchlist/user/${watchListId}/${isin}`)
            .then(() => {
                displaySnackbar({
                    message: intl.formatMessage(messages.removedFromWatchSuccessfuly),
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
    }, [dispatch, displaySnackbar, intl, removeFromWatch])

    return {
        loading: removeFromWatchLoading,
        remove: handleRemove
    }
}

export default useRemoveFromWatch
