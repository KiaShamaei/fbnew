import { IDialogState } from "components/Dialog/IDialogState";
import { ReactNode } from "react";
import { Action } from "redux";
import { ISymbol } from "types/ISymbol";

export type RenderFuncType = (data?: any, row?: any) => ReactNode

export interface IKeyInformationAttr {
    label: string;
    field: string;
    render?: RenderFuncType;
    className?: string;
}

export type IBuyAndSellPayload = 'BUY' | 'SELL';

export type ToggleTransactionType = (e: React.MouseEvent, payload?: IDialogStatePayload) => void;

export interface IDialogStatePayload {
    isin: string;
    mode: IBuyAndSellPayload;
}

export interface ISymbolDetailContextState {
    isIndustryOpen: boolean;
    isSymbolListOpen: boolean;
    searchValue: string;
    selectedSymbolGroup: string | null;
    finalSearchValue: string;
    transactionDialog: IDialogState<IDialogStatePayload>;
}

export interface ISymbolDetailContextProps extends ISymbolDetailContextState {
    close: () => void;
    openIndustry: () => void;
    backToIndustry: () => void;
    onIndustryClick: (code: string) => void;
    openSymbolList: () => void;
    setSearchValue: (v: string) => void | undefined;
    toggleTransaction: ToggleTransactionType;
    closeTransactionDialog: () => void;
}

export interface ISetSymbolDetailAction extends Action {
    payload: ISymbol    
}