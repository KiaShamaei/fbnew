import React, { ReactElement, ReactNode } from 'react'
import Dialog from 'components/Dialog/Dialog'

interface Props {
    close: () => void;
    x: number;
    y: number;
    isOpen: boolean;
    title: string | ReactNode;
    children: ReactNode;
}


function RequestCommonDialog({
    title,
    close,
    isOpen,
    x,
    y,
    children
}: Props): ReactElement {
    return (
        <Dialog
            title={title}
            close={close}
            isOpen={true}
            defaultX={x}
            defaultY={y}
            className="deposit-money-dialog">
            {children}
        </Dialog>
    )
}

export default RequestCommonDialog
