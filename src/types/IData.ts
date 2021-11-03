export interface IData<T> {
    data: T;
    msg: string | null;
    success: boolean;
    total: number;
}