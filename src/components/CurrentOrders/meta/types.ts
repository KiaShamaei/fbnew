import { CurrentOrderType } from "types/ICurrentOrder"

export enum ViewModeEnum {
    SEARCH = 'SEARCH',
    COMPRESSED = 'LAYERS',
    // CLOCK = 'CLOCK'
}

export interface IViewMode {
    type: ViewModeEnum;
    icon: string;
    activeClassName?: string;
    tooltip?:string;
}

export type SetActiveViewModeType = (viewMode: ViewModeEnum) => void;

export type SetActiveCircleType = (activeCircle: CurrentOrderType) => void;

export type CurrentOrdersCircleType = {
    [key in CurrentOrderType]: boolean
};

export type CurrentItemMode = 'edit' | 'expanded' | 'cancel' | 'calculator';