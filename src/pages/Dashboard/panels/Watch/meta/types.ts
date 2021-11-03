import { Action } from "redux";
import { IFetchState } from "redux/types";

export interface IWatchData {
    data: any[];
    hasEnd?: boolean;
}

export interface IWatchMenuItem {
    id: number;
    title: string;
    removable?: boolean;
}

export interface IWatchListAction extends Action {
    payload: IWatchMenuItem;
}

export interface IWatchItem {
    isin: string;
    title: string;
    lastPrice: number;
    lastPercent: number;
    finalPrice: number;
    finalPercent: number;
    history: number[];
    InstrumentStateCode: string;
    instrumentTitle: string;
}

export interface IWatchMenuState<T> extends IFetchState<T> {
    activeWatchMenu?: IWatchMenuItem;
}

export interface IWatchState {
    [watchMenu: string]: IWatchItem[];
}

export type ChartDataTimeFrameType = 'w' | 'd' | 'm';