import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { IAnchorProps } from 'components/DropdownMenu/meta/types'
import RadioButton from 'components/form/RadioButton/RadioButton'
import RadioGroupCore from 'components/form/RadioGroupCore/RadioGroupCore'
import React, { ReactElement } from 'react'
import { useCallback } from 'react'
import { useMemo } from 'react'
import { FormattedMessage } from 'react-intl'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'
import '../assets/NewsHeader.scss'

interface Props {
    filter: string;
    setFilter: (v: string) => void;
}

function NewsHeader({
    filter,
    setFilter
}: Props): ReactElement {
    const isLoggedin = useSelector((state: IReduxState) => state.user.isLoggedIn)
    const dropdown = useMemo(() => {
        return <RadioGroupCore value={filter} onChange={setFilter}>
            <RadioButton value={'ALL_NEWS'} label={<FormattedMessage id="all-news" defaultMessage="all news" />} />
            {isLoggedin ===true?
                <>
                    <RadioButton value={'PORTFOLIO_NEWS'} label={<FormattedMessage id="my-portfolio-news" defaultMessage="my portfolio news" />} />
                    <RadioButton value={'WATCH_NEWS'} label={<FormattedMessage id="my-watch-news" defaultMessage="my watch news" />} />
                </>
            :null}

        </RadioGroupCore>
    }, [filter, isLoggedin, setFilter])
    const renderAnchor = useCallback(({ toggle }: IAnchorProps) => {
        return <i className="online-icon-filter cursor-pointer filter-btn" onClick={toggle}></i>
    }, [])
    return (
        <div className="news-header">
            <span className="title">
                <FormattedMessage id="news" defaultMessage="news" />
            </span>
            <DropdownMenu
                dropdown={dropdown}
                dropdownClassName={isLoggedin?'h-90px':'h-30px'}
                renderAnchor={renderAnchor}
            />
        </div>
    )
}

export default NewsHeader
