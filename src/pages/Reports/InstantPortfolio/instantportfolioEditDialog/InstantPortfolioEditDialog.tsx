import React, { useCallback } from 'react';
import Dialog from "../../../../components/Dialog/Dialog";
import InstantPortfolioEditForm from "./InstantPortfolioEditFrom";
import './assets/instantPortfolioEditDialog.scss'
import { useIntl } from "react-intl";
interface InstantPortfolioEditDialogProps {
    close: () => void;
    isOpen: boolean;
    title: string;
    data: any;
    type: string;
    titleDialog: string;
    initialData:number;
}

const messages = {
    title: {
        id: 'edit',
        defaultMessage: 'edit'
    }
}



export default function InstantPortfolioEditDialog({
    close,
    isOpen,
    titleDialog,
    data,
    type,
    initialData
}: InstantPortfolioEditDialogProps) {
    const intl = useIntl();
    return (
            <Dialog className={'dialog-portfolio'} defaultX={(window.innerWidth / 2) - (300 / 2)} defaultY={(window.innerHeight / 2) - (300 / 2)} close={close} isOpen={isOpen} title={intl.formatMessage(messages.title)}>
                <InstantPortfolioEditForm close={close} data={data} type={type} title={titleDialog} initialData={initialData}/>
            </Dialog>
    )
}