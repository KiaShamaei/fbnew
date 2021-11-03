export interface ISymbolToOrder {
    id: number;
    isin: string;
    defaultMode?: 'BUY' | 'SELL',
    initialFormValues?: any;
}

export interface IBuyAndSellDialogContextProps {
    symbolList: (ISymbolToOrder)[];
    openDialog: (ising: string, defaultMode?: 'BUY' | 'SELL', initialFormValues?: any) => void;
    closeDialog: (id: number) => void;
    isChainActive?: boolean;
    setIsChainActive?: any;
    freeze?: boolean;
    setFreeze?: any;
}