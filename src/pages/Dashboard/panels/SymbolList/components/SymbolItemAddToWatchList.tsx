import React, { ReactElement } from 'react'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import WatchMenuToAddAndRemove from 'components/WatchMenuToAddAndRemove/WatchMenuToAddAndRemove'
import { useCallback } from 'react'
import { IAnchorProps } from 'components/DropdownMenu/meta/types'
import { FormattedMessage } from 'react-intl'
import classNames from 'classnames'
import '../assets/SymbolItemAddToWatchList.scss'

interface Props {
    isin: string;
    color: string;
}

function SymbolItemAddToWatchList({
    isin,
    color
}: Props): ReactElement {
    const renderAnchor = useCallback(({
        toggle
    }: IAnchorProps) => {
        return <div onClick={toggle} className={classNames("add-to-watch-container d-flex mt-2 cursor-pointer", color)}>
        <div className="add-to-watch">
            <FormattedMessage id="add-to-watch" defaultMessage="add to watch" />
        </div>
        <i className="online-icon-eye d-block ml-2 mr-1 icon-eye "></i>
    </div>
    }, [color])
    return (
        <DropdownMenu 
            position="left"
            className="symbol-item-add-to-watch-list"
            renderAnchor={renderAnchor}
            dropdown={<WatchMenuToAddAndRemove isin={isin} />}
        />
    )
}

export default SymbolItemAddToWatchList
