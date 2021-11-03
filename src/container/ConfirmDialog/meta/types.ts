export interface IConfirmDialog {
    message: string;
    title: string;
}

export interface ConfirmDialogProps {
    open: (dialog: IConfirmDialog, confirm: () => void) => void;
}