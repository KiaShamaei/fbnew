import { IPortfolioItem } from "components/PortfolioWatchTable/meta/type";
import { IDashboardState } from "pages/Dashboard/meta/types";
import { IUserControlState } from "pages/Dashboard/panels/UserControl/meta/types";
import {
  IWatchMenuItem,
  IWatchMenuState,
  IWatchState,
} from "pages/Dashboard/panels/Watch/meta/types";
import { Action } from "redux";
import { ISymbolGroup } from "types/ISymbolGroup";
import { IUserInfo } from "types/IUserInfo";
import { ISymbolSearch } from "pages/Dashboard/panels/SymbolList/meta/types";
import { IActiveTechnicalTabState } from "pages/Dashboard/panels/TechnicalChart/meta/type";
import { IPurchasingPower } from "types/IPurchasingPower";
import { Moment } from "jalali-moment";
import { ISymbol } from "types/ISymbol";
import { IEffectiveSymbolsState } from "../pages/Dashboard/panels/EffectiveSymbols/meta/types";
import {IServerTime} from "../components/Header/components/meta/timeReducer"
import { ICodalState } from "pages/Dashboard/panels/Codal/meta/type";

export interface IRegularAction extends Action {
  type: string;
  payload: any;
}

export interface IFetchDataAction {
  type: string;
  payload: any;
  hasEnd?: boolean;
}

export interface IUserAction extends IRegularAction {
  type: string;
  payload: IUserInfo;
  loading: boolean;
}

export interface IUserReducerState {
  userInfo?: IUserInfo;
  loading?: boolean;
  error?: any;
  isLoggedIn?: boolean | null;
}

export interface IReduxState {
  user: IUserReducerState;
  portfolio: IFetchState<IPortfolioItem[]>;
  watch: IFetchState<IWatchState>;
  watchMenu: IWatchMenuState<IWatchMenuItem[]>;
  symbolGroup: IFetchState<ISymbolGroup[]>;
  symbol: IFetchState<ISymbolSearch[]>;
  dashboard: IDashboardState;
  activeSymbol: IActiveSymbol;
  activeSector: IActiveSector;
  userControl: IUserControlState;
  technicalTabs: IActiveTechnicalTabState;
  purchasingPower: IPurchasingPowerState;
  timeCalender: ITimeCalenderState;
  symbolDetail: IFetchState<ISymbol>;
  effectiveSymbols: IEffectiveSymbolsState;
  currentOrders: ICurrentOrders;
  serverTime: IServerTime;
  codal: ICodalState;
  symbolNote: ISymbolNoteState;
  alarm: IAlarmState;
  visitor: IVisitorIdState
}

export interface IFetchState<T = any> {
  isLoading?: boolean;
  data?: T;
  hasEnd?: boolean;
  page?: number;
  error?: string;
}

export interface IFetchAction {
  type: string;
  params: any;
  urlParams?: any;
}

export interface IActiveSymbol {
  isin?: string;
}

export interface IActiveSector {
  sectorCode?: string;
}

export interface IActiveSectorAction extends Action, IActiveSector {}

export interface IActiveSymbolAction extends Action, IActiveSymbol {}

export interface IPurchasingPowerState {
  purchasingPower?: IPurchasingPower;
  isLoading?: boolean;
}

export interface IPurchasingPowerAction extends Action {
  payload: {
    purchasingPower?: IPurchasingPower;
    isLoading?: boolean;
  };
}

export interface ITse {
  code: string;
  title: string;
}
export interface ISymbolNote {
  fetch: () => void;
}
export interface ITimeCalender {
  currentTime?: Moment;
  tse?: ITse;
}

export interface ITimeCalenderResponse {
  currentTime?: string;
  tse?: ITse;
}

export interface ITimeCalenderState extends ITimeCalender {
  isLoading: boolean;
}

export interface ITimeCalenderAction extends Action, ITimeCalender {
  isLoading?: boolean;
}

export interface ICurrentOrders {
  data?: any;
  isLoading: boolean;
}

export interface ISymbolNoteState {
  isOpen: boolean;
  symbol?: { id: string, label: string }
}

export interface ISymbolNoteAction extends Action {
  payload?: {
    isOpen?: boolean;
    symbol?: { id: string, label: string }
  }
}

export interface IAlarmState {
  isOpen: boolean;
  symbol?: { id: string, label: string } 
}

export interface IAlarmAction extends Action {
  payload?: {
    isOpen?: boolean;
    symbol?: { id: string, label: string }
  }
}

export interface IVisitorIdState {
  visitorId?: string; 
}

export interface IVisitorIdAction extends Action {
  visitorId?: string; 
}