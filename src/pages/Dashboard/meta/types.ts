export interface IPanelItemProps {
    height: number;
    index?: number;
    width: number;
}

export type PanelRightBottomType = 'NEWS' | 'MESSAGE' | 'NOTE' | 'RISK_STATEMENT' | 'CHANGE_PASSWORD' | 'CODAL' | 'ALARM';

export interface IDashboardAction {
    type: string;
    payload: any;
    params?: any;
}

export interface IDashboardState {
    activePanelRightBottom: PanelRightBottomType,
    params?: any;

}