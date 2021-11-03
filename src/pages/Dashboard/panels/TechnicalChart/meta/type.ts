import { Action } from "redux";

export interface IActiveTechnicalTabState {
    active: number;
}

export interface IActiveTechnicalTabAction extends Action, IActiveTechnicalTabState {
}