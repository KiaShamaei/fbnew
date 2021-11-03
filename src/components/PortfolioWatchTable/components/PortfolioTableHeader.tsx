import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import TitleSort from './TitleSort'
import '../assets/PortfolioTableHeader.scss'
import { useContext } from 'react'
import { PortfolioWatchContext } from '../context/PortfolioWatchContext'
import { useCallback } from 'react'

function PortfolioTableHeader(): ReactElement {
    const { changeOrderBy, direction, orderBy } = useContext(PortfolioWatchContext)
    const onTitleSortClick = useCallback((name: string) => (direction: 'ASC' | 'DESC') => {
        changeOrderBy(name, direction)
    }, [changeOrderBy])
    return (
        <div className="portfolio-table-header-container">
            <div className="portfolio-table-header " >
                <div className="header-column  mr-5">
                    <TitleSort onSortChange={onTitleSortClick('InstrumentName')} active={orderBy === 'InstrumentName'} direction={direction}>
                        <FormattedMessage id="symbol" defaultMessage="symbol" />
                    </TitleSort>
                </div>
                <div className="sperated-header-column d-flex mr-5 ">
                    <TitleSort onSortChange={onTitleSortClick('LastTradePrice')} active={orderBy === 'LastTradePrice'} direction={direction}>
                        <FormattedMessage id="instantaneous-value" defaultMessage="instantaneous value" />
                    </TitleSort>
                    <TitleSort onSortChange={onTitleSortClick('Quantity')} active={orderBy === 'Quantity'} direction={direction}>
                        <FormattedMessage id="number" defaultMessage="number" />
                    </TitleSort>
                </div>
                <div className="sperated-header-column  d-flex mr-5">
                    <TitleSort onSortChange={onTitleSortClick('LastTradePrice')} active={orderBy === 'LastTradePrice'} direction={direction}>
                        <FormattedMessage id="last" defaultMessage="last" />
                    </TitleSort>
                    <TitleSort  onSortChange={onTitleSortClick('ClosingPrice')} active={orderBy === 'ClosingPrice'} direction={direction}>
                        <FormattedMessage id="final" defaultMessage="final" />
                    </TitleSort>
                </div>
            </div>
        </div>
    )
}

export default PortfolioTableHeader
