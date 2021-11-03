import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { IAnchorProps } from 'components/DropdownMenu/meta/types'
import RadioButton from 'components/form/RadioButton/RadioButton'
import RadioGroupCore from 'components/form/RadioGroupCore/RadioGroupCore'
import React, { ReactElement, useMemo } from 'react'

interface Props {
    setFilter: (filter: string) => void;
    filter?: string;
}

function MessageFilterMenu({
    setFilter,
    filter,
}: Props): ReactElement {

    const dropdown = useMemo(() => {
        return <div className="message-filter-menu">
            <RadioGroupCore onChange={setFilter} value={filter}>
                <RadioButton label={'همه پیام ها'} value={'ALL_MESSAGES'} />
                <RadioButton label={'پیام های پرتفوی من'} value={'PORFOLIO'} />
                <RadioButton label={'پیام های دیده بان من'} value={'WATCH'} />
            </RadioGroupCore>
        </div>
    }, [filter, setFilter])
    const renderAnchor = ({
        toggle
    }: IAnchorProps) => {
        return <i className="online-icon-more-detail cursor-pointer detail-icon" onClick={toggle}></i>

        // <i className="online-icon-more-detail cursor-pointer" style={{ marginLeft: -5 }} onClick={toggle} />
    }
    return (
        <DropdownMenu
            className="massage-filter"
            dropdown={dropdown}
            renderAnchor={renderAnchor}

        />
    )
}

export default MessageFilterMenu
