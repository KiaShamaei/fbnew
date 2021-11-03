import classNames from 'classnames'
import { ReactElement, ReactNode, useMemo } from 'react'

interface Props {
    data?: any;
    row: any;
    render?: (item: any, row: any) => ReactNode;
    width?: number;
    cellClassName?: string;
    display?: boolean;
    onClick?: () => void
}

function TableCell({
    data,
    render,
    row,
    display,
    width,
    onClick,
    cellClassName
}: Props): ReactElement {
    const valueToDispaly: ReactNode = useMemo<ReactNode>(() => render ? render(data, row) : data, [data, render, row])
    return (
        <div style={{ width }} onClick={onClick} className={classNames('cell', cellClassName, { 'd-none': display === false })}>
            {valueToDispaly}
        </div>
    )
}

export default TableCell
