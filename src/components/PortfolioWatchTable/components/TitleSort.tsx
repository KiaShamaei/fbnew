import classNames from 'classnames'
import React, { ReactElement, ReactNode } from 'react'
import { useCallback } from 'react';
import '../assets/TitleSort.scss'

interface Props {
    children: ReactNode;
    className?:string;
    titleClassName?:string;
    active?: boolean;
    direction?: 'ASC' | 'DESC';
    onSortChange?: (direction: 'ASC' | 'DESC') => void;
}

function TitleSort({
    children,
    className,
    titleClassName,
    active,
    direction,
    onSortChange
}: Props): ReactElement {
    
    const angelDownActive: boolean = (active && direction === 'DESC') ?? false;
    const angelUpActive: boolean = (active && direction === 'ASC') ?? false;

    const onSortIconClick = useCallback((direction: 'ASC' | 'DESC') => () => {
        if(onSortChange)
            onSortChange(direction)
    }, [onSortChange])

    return (
        <div className={classNames("d-flex title-sort",titleClassName)}>
            <span className={classNames(className)}>
                {children}
            </span>
            <span className="sort">
                <i onClick={onSortIconClick('ASC')} className={classNames("online-icon-angel-down angel-up mb-1 cursor-pointer", { 'is-active': angelUpActive })}></i>
                <i onClick={onSortIconClick('DESC')}  className={classNames("online-icon-angel-down angel-down cursor-pointer", { 'is-active': angelDownActive })}></i>
            </span>
        </div>
    )
}

export default TitleSort
