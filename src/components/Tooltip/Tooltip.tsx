import classNames from 'classnames';
import React, { ReactElement, ReactNode, Fragment } from 'react'
import ReactTooltip from 'react-tooltip';
import "./assets/Tooltip.scss"
interface Props {
    id: string;
    children?: ReactNode;
    tooltipText?: any;
    className?: string;
    position?: 'top' | 'right' | 'bottom' | 'left';
    style?: any;
    onClick?: (e: any) => void;
}

function Tooltip({
    id,
    tooltipText,
    children,
    className,
    position,
    style,
    onClick
}: Props): ReactElement {
    return (
        <Fragment>
            <span onClick={onClick} className={classNames(className, 'direction-ltr')} data-tip data-for={id} style={style}>{children}</span>
            <ReactTooltip id={id} type='dark' effect={'solid'} place={position ?? 'top'}>
                <span style={{ color: 'white' }}>{tooltipText}</span>
            </ReactTooltip>
        </Fragment>
    )
}

export default Tooltip
