import { memo, ReactElement, ReactNode } from 'react'
import './assets/NumberViewer.scss'
import classNames from 'classnames'

interface Props {
    children: ReactNode;
    className?: string;
    value: number;
    hasIcon?: boolean;
}

function NumberViewer({
    children,
    className,
    value,
    hasIcon = false
}: Props): ReactElement {
    const isNegative = value < 0
    const isPositive = value > 0
    const zero = value === 0
    return (
        <div className={classNames(className, 'number-viewer d-flex flex-direction-row-reverse',{ 'is-negative': isNegative ,'zero':zero,'isPositive':isPositive})}>
            {children}
            {hasIcon && <i className={classNames("online-icon-angel-down icon", { 'is-negative': isNegative, 'is-positive': !isNegative })} />}
        </div>
    )
}

export default memo(NumberViewer)
