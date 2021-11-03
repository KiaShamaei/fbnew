export interface ISnack {
    id?: string;
    type?: 'success' | 'error' | 'warning';
    message: string;
    width?: number;
}

export interface ISnackbarContext {
    display: (snack: ISnack) => void;
}