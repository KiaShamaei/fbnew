import classNames from 'classnames'
import './assets/DropdownMenu.scss'
import React, { memo, ReactElement, useRef } from 'react'
import useClickOutside from 'hooks/useClickOutside'

interface Props {
    className?: string,
    dropdownClassName?: string,
    children: React.ReactNode,
    position?: 'left' | 'right' | 'center',
    isOpen: boolean;
    close: () => void;
}

function ControlledDropdownMenu({
    children,
    className,
    dropdownClassName,
    isOpen,
    close,
    position = 'center'
}: Props): ReactElement {
    const containerRef = useRef<HTMLDivElement>(null)
    useClickOutside(containerRef, () => {
        close()
    })
    return (
        <div ref={containerRef} className={classNames(className,  'dropdown-menu-container')}>
            {isOpen && <div className={classNames(dropdownClassName, position, 'dropdown')}>
                {children}
            </div>}
        </div>
    )
}

export default memo(ControlledDropdownMenu)
