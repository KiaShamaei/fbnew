import { Action } from "redux";

export interface IUserControlState {
    isLoading?: boolean;
    error?: any;
    activeTab?: 'portfolio' | 'watch'
}

export interface IUserControlAction extends Action {
    payload: any;
}