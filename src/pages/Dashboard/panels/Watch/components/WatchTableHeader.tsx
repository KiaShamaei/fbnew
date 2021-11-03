import TitleSort from 'components/PortfolioWatchTable/components/TitleSort'
import React, { ReactElement } from 'react'
import { FormattedMessage } from 'react-intl'
import '../assets/WatchTableHeader.scss'

interface Props {
    onSortChange: (orderBy: string, direction: 'ASC' | 'DESC') => void;
    orderBy?: string;
    direction?: 'ASC' | 'DESC';
}

function WatchTableHeader({
    onSortChange,
    direction,
    orderBy
}: Props): ReactElement {
    return (
        <div className="portfolio-table-header-container">
            <div className="portfolio-table-header watch-table-header">
                <div className="header-column symbol">
                    <div className="mr-2">
                        <TitleSort onSortChange={(direction) => onSortChange('title', direction)} active={orderBy === 'title'} direction={direction}>
                            <FormattedMessage id="symbol" defaultMessage="symbol" />
                        </TitleSort>
                    </div>
                </div>
                <div className="header-column last">
                    <div className="">
                        <TitleSort onSortChange={(direction) => onSortChange('lastPercent', direction)} active={orderBy === 'lastPercent'} direction={direction}>
                            <FormattedMessage id="last" defaultMessage="last" />
                        </TitleSort>
                    </div>
                </div>
                <div className="header-column final">
                    <div className="">
                        <TitleSort onSortChange={(direction) => onSortChange('finalPercent', direction)} active={orderBy === 'finalPercent'} direction={direction}>
                            <FormattedMessage id="final" defaultMessage="final" />
                        </TitleSort>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default WatchTableHeader
