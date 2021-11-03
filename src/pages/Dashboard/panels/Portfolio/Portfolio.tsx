import PortfolioWatchTable from 'components/PortfolioWatchTable/PortfolioWatchTable'
import { IPanelItemProps } from 'pages/Dashboard/meta/types'
import React, { ReactElement, useCallback } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { IFetchState, IReduxState } from 'redux/types'
import { FETCH_PORTFOLIO_LIST, PORTFOLIO } from './meta/actionTypes'
import Cache from 'container/Cache/Cache'
import emptyPortfolioImage from './assets/empty-portfolio.svg'
import './assets/Portfolio.scss'
import { FormattedMessage } from 'react-intl'
import Button from 'components/Button/Button'
import { useContext } from 'react'
import { LoginContext } from 'container/LoginContainer/contexts/LoginContext'
import PortfolioTableHeader from 'components/PortfolioWatchTable/components/PortfolioTableHeader'
import Loading from 'components/Loading/Loading'
import { getSetDataType } from 'redux/utils/sagaTypeGetter'

interface Props extends IPanelItemProps {

}

function Portfolio({
    height,
    width
}: Props): ReactElement | null {
    const dispatch = useDispatch()
    const { data, isLoading: portfolioLoading, hasEnd, page }: IFetchState = useSelector((state: IReduxState) => state.portfolio)
    const { isLoggedIn } = useSelector((state: IReduxState) => state.user)
    
    const { open } = useContext(LoginContext)

    const fetch: (start: number, end: number, orderBy?: string, direction?: 'ASC' | 'DESC') => any = useCallback((start, end, orderBy, direction) => {
        dispatch({
            type: FETCH_PORTFOLIO_LIST,
            params: {
                page: Math.floor(end / 12) + 1,
                limit: 12,
                orderby: (orderBy && direction) ? `{"property":"${orderBy}","direction":"${direction.toLowerCase()}"}`: undefined
            }
        })
        return Promise.resolve();
    }, [dispatch])

    const clearPortfolio = useCallback(() => {
        dispatch({
            type: getSetDataType(PORTFOLIO),
            payload: {
                data: [],
                hasEnd: false,
                page: 1
            }            
        })
    }, [dispatch])
    
    if(isLoggedIn === false)
        return <div className="empty-portfolio text-center" style={{ height, width }}>
            <PortfolioTableHeader />
            <img src={emptyPortfolioImage} style={{ height: '55%' }} className="empty-portfolio-image mt-4" alt="empty Portfolio" />
            <div className="empty-portfolio-texts">
                <p className="mt-2">
                    <FormattedMessage id="you-not-loged-in-yet" defaultMessage="you not loged in yet" />
                </p>
                <p className="mt-2">
                    <FormattedMessage id="to-buy-stock-you-should-first-log-in-system" defaultMessage="to buy stock you should first log in system" />
                </p>
            </div>
            <div className="text-center mt-4">
                <Button color="blue" onClick={open}>
                    <FormattedMessage id="login-account" defaultMessage="login account" />
                </Button>
            </div>
        </div>

    return (
        <div style={{ height, width, position: 'relative' }}>
            {(
                (portfolioLoading && page === 1) || 
                isLoggedIn === null || 
                isLoggedIn === undefined) && <Loading style={{ transform: 'TranslateX(4px)' }} height={height} width={width - 16} className="z-3" />}
            {isLoggedIn && <Cache>
                <PortfolioWatchTable
                    socketName={'PORTFOLIO'}
                    isNextPageLoading={portfolioLoading || false}
                    hasNextPage={!hasEnd}
                    fetch={fetch}
                    height={height}
                    onSortChange={clearPortfolio}
                    width={width}
                    data={data || []}
                />
            </Cache>}
        </div>
    )
}

export default Portfolio
