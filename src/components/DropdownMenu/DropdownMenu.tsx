import classNames from 'classnames'
import './assets/DropdownMenu.scss'
import React, { Fragment, memo, ReactElement, ReactNode, useCallback, useRef, useState } from 'react'
import useClickOutside from 'hooks/useClickOutside'
import { IAnchorProps } from './meta/types'

type renderType = (props: IAnchorProps) => ReactNode
type verticalPositionType = 'top' | 'bottom'

interface Props {
    className?: string,
    dropdownClassName?: string,
    dropdown: React.ReactNode | renderType,
    position?: 'left' | 'right' | 'center',
    remount?: boolean;
    renderAnchor: (props: IAnchorProps) => ReactElement;
}

interface DropdownMenuChildrenProps {
    remount?: boolean;
    dropdownClassName?: string;
    position?: 'left' | 'right' | 'center';
    isOpen?: boolean;
    verticalPosition: verticalPositionType
}

const DropdownMenuChildren: React.FC<DropdownMenuChildrenProps> = memo(({
    dropdownClassName,
    position,
    remount,
    isOpen = false,
    children,
    verticalPosition
}) => {
    if (remount)
        return <Fragment>
            {isOpen && <div className={classNames(dropdownClassName, verticalPosition, position, 'dropdown')}>
                {children}
            </div>}
        </Fragment>
    return <Fragment>
        <div className={classNames(dropdownClassName, verticalPosition, position, 'dropdown', { 'd-none': !isOpen })}>
            {children}
        </div>
    </Fragment>
})

function DropdownMenu({
    renderAnchor,
    dropdown,
    className,
    dropdownClassName,
    remount = true,
    position = 'center'
}: Props): ReactElement {
    const [isOpen, setIsOpen] = useState<boolean>(false)
    const [positionToOpen, setPositionToOpen] = useState<verticalPositionType>('bottom')
    const containerRef = useRef<HTMLDivElement>(null)
    const open = useCallback(() => {
        setIsOpen(true)
    }, [])
    const close = useCallback(() => {
        setIsOpen(false)
    }, [])
    const toggle = useCallback(() => {
        const bottom = window.innerHeight - (containerRef.current?.getBoundingClientRect().bottom || 0);
        if (bottom > 300) {
            setPositionToOpen('bottom')
        } else {
            setPositionToOpen('top')
        }
        setIsOpen(s => !s)
    }, [])
    useClickOutside(containerRef, () => {
        close()
    })

    return (
        <div ref={containerRef} className={classNames(className, 'dropdown-menu-container')}>
            {renderAnchor({
                close,
                open,
                toggle,
                isOpen
            })}
            <DropdownMenuChildren
                isOpen={isOpen}
                dropdownClassName={dropdownClassName}
                position={position}
                verticalPosition={positionToOpen}
                remount={remount}>
                {(() => {
                    if (typeof dropdown === 'function') {
                        return dropdown({
                            close,
                            open,
                            toggle,
                            isOpen
                        })
                    }
                    return dropdown
                })()}
            </DropdownMenuChildren>
        </div>
    )
}

export default memo(DropdownMenu)
