
export interface IOrderCollapsable {
    rows: ICumativeOrder[];
    title: string;
    orderSide: number;
    upperPriceThreshold: number;
    lowerPriceThreshold: number;
}

export interface OrderDetailogProps {
    close: () => void;
    order: IOrderCollapsable;
    title: string;
    data: any[];
    orderSide: number;
}

export interface IOrderCollapsableState {
    order: IOrderCollapsable;
    mode: 'EDIT' | 'CANCEL';
    title: string;
    orderSide: number;
}

export interface OrderContextProps {
    currentOrder?: IOrderCollapsableState;
    openCurrentOrder: (order: IOrderCollapsable, mode: 'EDIT' | 'CANCEL', title: string, orderSide: number, lowerPriceThreshold: number, upperPriceThreshold: number) => void;
    close: () => void;
}

export interface ICumativeOrder {
    id: string,
    isin: string,
    instrumentName: string,
    orderSide: number,
    orderSideName: string,
    price: number,
    quantity: number,
    remainQuantity: number,
    orderStatusName: string,
    upperPriceThreshold: number;
    lowerPriceThreshold: number;
    entryTime: string;
}