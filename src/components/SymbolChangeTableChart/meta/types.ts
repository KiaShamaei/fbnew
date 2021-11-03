export interface IBidAskTableRow {
    number?: number;
    price?: number;
    quantity?: number;
    id?: number;
    order?: number;
}

export interface SymbolChangeTableChartContextProps {
    onVolumeClick: (orderSide: number, volume: number, price: number) => void;
    onPriceClick: (orderSide: number, price: number) => void;   
}