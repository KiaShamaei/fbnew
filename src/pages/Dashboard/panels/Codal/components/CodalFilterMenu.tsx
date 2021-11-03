import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { IAnchorProps } from 'components/DropdownMenu/meta/types'
import RadioButton from 'components/form/RadioButton/RadioButton'
import RadioGroupCore from 'components/form/RadioGroupCore/RadioGroupCore'
import { SEARCH_CODAL_FOR_SYMBOL } from 'container/ObserverProivder/meta/constants'
import { useObserver } from 'container/ObserverProivder/ObserverProivder'
import React, { ReactElement, useMemo, useState } from 'react'
import { useEffect } from 'react'
import { defineMessages, useIntl } from 'react-intl'
import { useSelector } from 'react-redux'
import { IReduxState } from 'redux/types'

interface Props {
    setFilter: (filter: string) => void;
    filter?: string;

}
const messages = defineMessages({
    codal: {
        id: 'codal',
        defaultMessage: 'codal'
    }
})
function CodalFilterMenu({
    setFilter,
    filter,
}: Props): ReactElement {
    const intl = useIntl();
    const isLoggedin = useSelector((state: IReduxState) => state.user.isLoggedIn);
    const dropdown = useMemo(() => {
        return <div className="codal-filter-menu">
            <RadioGroupCore onChange={setFilter} value={filter}>
                <RadioButton label={'همه اطلاعیه ها'} value={'ALL_MESSGES'} />
                {isLoggedin === true ?
                <>
                 <RadioButton label={'اطلاعیه پرتفوی من'} value={'PORFOLIO'} />
                 <RadioButton label={'اطلاعیه های دیده بان من'} value={'WATCH'} /> 
                 </>
                 : null}
                        
            </RadioGroupCore>
        </div>
    }, [filter, isLoggedin, setFilter])

    const renderAnchor = ({
        toggle
    }: IAnchorProps) => {
        return <div className="codalHead">
            <span className="title">
                <span>{intl.formatMessage(messages.codal)}
                    <div className="title-border"></div>
                </span>
            </span>
            <i className="online-icon-more-detail cursor-pointer detail-icon" onClick={toggle}></i>
        </div>
    }
    return (
        <DropdownMenu
            className="codal-filter"
            dropdown={dropdown}
            renderAnchor={renderAnchor}

        />
    )
}

export default CodalFilterMenu
