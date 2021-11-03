export interface IDialogState<T = any> {
    x: number;
    y: number;
    isOpen: boolean;
    payload?: T;
}
