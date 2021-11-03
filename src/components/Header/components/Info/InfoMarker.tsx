import classNames from 'classnames'
import DropdownMenu from 'components/DropdownMenu/DropdownMenu'
import { IAnchorProps } from 'components/DropdownMenu/meta/types'
import React, { ReactElement, useCallback } from 'react'

interface Props {
    children: React.ReactNode,
    dropdownClassName?: string
}

function InfoMarker({
    children,
    dropdownClassName
}: Props): ReactElement {
    const menuAnchor = useCallback(({ toggle }: IAnchorProps) => <i onClick={toggle} className="online-icon-information" />, [])
    return (
        <DropdownMenu
            className={"header-info-marker"}
            dropdownClassName={classNames("info-marker-dropdown", dropdownClassName)}
            renderAnchor={menuAnchor}
            dropdown={<div>
                {children}
            </div>}
        />
    )
}

export default InfoMarker
