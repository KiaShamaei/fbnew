import React, { ReactElement, useMemo, Fragment } from 'react'
import { useCallback } from 'react'
import { FormattedMessage } from 'react-intl'
import '../assets/WatchTableItemDropdown.scss'
import useRemoveFromWatch from 'hooks/useRemoveFromWatch'
import { useDispatch, useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import { BarLoader } from 'react-spinners'
import useDialogState from 'components/Dialog/hooks/useDialogState'
import FixedDropdownMenu from 'components/FixedDropdownMenu/FixedDropdownMenu'
import { ChartDataTimeFrameType } from '../meta/types'
import PortfolioWatchItemHistoryDropdown from 'components/PortfolioWatchItemHistoryDropdown/PortfolioWatchItemHistoryDropdown'
import { Link } from 'react-router-dom'
import { setActivePanelRightBottom } from 'pages/Dashboard/meta/actions'
import { OPEN_SYMBOL_NOTE } from 'redux/actionTypes/symbolNoteTypes'
import { OPEN_ALARM } from 'redux/actionTypes/alarmTypes'
import { useEffect } from 'react'


interface Props {
    isin: string;
    name: string;
    title: string;
    getHistoryWeeklyOrDaily: (weekOrDay: ChartDataTimeFrameType) => void,
    activeChart: ChartDataTimeFrameType;
}

const url = (name: string) => `https://codal.ir/ReportList.aspx?search&Symbol=${name}&LetterType=-1&AuditorRef=-1&PageNumber=1&Audited&NotAudited&IsNotAudited=false&Childs&Mains&Publisher=false&CompanyState=-1&Category=-1&CompanyType=-1&Consolidatable&NotConsolidatable`;

function WatchItemDropdown({
    isin,
    name,
    title,
    getHistoryWeeklyOrDaily,
    activeChart
}: Props): ReactElement {
    const watchListId = useSelector((state: IReduxState) => state.watchMenu.activeWatchMenu?.id)
    const {
        loading: removeLoading,
        remove
    } = useRemoveFromWatch()

    const dispatch = useDispatch()

    const handleRemoveSymbol = useCallback(() => {
        if (watchListId)
            remove(watchListId, isin)
    }, [watchListId, remove, isin])


    const openAlaram = useCallback(() => {
        dispatch({ type: OPEN_ALARM, payload: { symbol: { id: isin, label: name } } })
    }, [dispatch, isin, name])

    const menuDropdown = useMemo(() => <Fragment>
        <PortfolioWatchItemHistoryDropdown
            activeChart={activeChart}
            getHistoryWeeklyOrDaily={getHistoryWeeklyOrDaily}
        />
        <div className="menu-item pt-2" onClick={openAlaram}>
            <FormattedMessage
                id="add-to-alaram"
                defaultMessage="add to alaram"
            />
        </div>
        <div className="menu-item" onClick={handleRemoveSymbol}>
            <FormattedMessage
                id="remove-from-watch"
                defaultMessage="remove from watch"
            />
            {(removeLoading) && <div className="d-flex justify-content-center">
                <BarLoader css="m-auto w-100" color="#00c288" width={100} height={5} />
            </div>}
        </div>
        <div className="menu-item">
            <Link to={`/reports/transactionHistory?isin=${isin}`}>
                <FormattedMessage
                    id="transaction-history"
                    defaultMessage="transaction history"
                />
            </Link>
        </div>
        <Link to={`/market/technical?symbol=${name}&isin=${isin}&title=${title}`}>
            <div className="menu-item">
                <FormattedMessage
                    id="technical"
                    defaultMessage="technical"
                />
            </div>
        </Link>

        <div className="menu-item" onClick={() => {
            dispatch(setActivePanelRightBottom('CODAL', { symbol: { id: isin, label: name } }))
        }}>
            <FormattedMessage
                id="kadal"
                defaultMessage="kadal"
            />
        </div>
        <div className="menu-item">
            <a href={url(name)} target="_blank" rel="noreferrer">
                <FormattedMessage
                    id="codal-link"
                    defaultMessage="codal-link"
                />
            </a>
        </div>
        <div className="menu-item" onClick={() => {
            dispatch(setActivePanelRightBottom('MESSAGE', { symbolMessage: { id: isin, label: name }, messageActiveTab: 'observer' }))
        }}>
            <FormattedMessage
                id="observer-message"
                defaultMessage="observer message"
            />
        </div>
        <div className="menu-item">
            <FormattedMessage
                id="tce-link"
                defaultMessage="tce link"
            />
        </div>
        <div className="menu-item" onClick={() => dispatch({ type: OPEN_SYMBOL_NOTE, payload: { symbol: { id: isin, label: name } } })}>
            <FormattedMessage
                id="note"
                defaultMessage="note"
            />
        </div>
    </Fragment>, [activeChart, dispatch, getHistoryWeeklyOrDaily, handleRemoveSymbol, isin, name, openAlaram, removeLoading, title])

    const [dialogState, toggle, close,] = useDialogState()

    const onIconClick = useCallback((e: React.MouseEvent) => {
        const left = e.currentTarget.getBoundingClientRect().left;
        const top = e.currentTarget.getBoundingClientRect().top;
        toggle(e, null, left, top)
    }, [toggle])

    useEffect(() => {
        return () => {
            close()
        }
    }, [close])

    return (
        <Fragment>
            <FixedDropdownMenu
                key={'watch_item_dropdown_' + isin}
                anchor={<i onClick={onIconClick} className="online-icon-more-detail cursor-pointer mr-2 my-auto d-block"></i>}
                close={close}
                className="watch-menu-dropdown"
                width={180}
                position="left"
                isOpen={true}
                anchorClassName="my-auto"
                x={dialogState.x}
                y={dialogState.y}
            >
                {menuDropdown}
            </FixedDropdownMenu>
        </Fragment>
    )
}

export default WatchItemDropdown
