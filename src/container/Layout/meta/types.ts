import { IPanelItemProps } from "pages/Dashboard/meta/types";
import { ElementType } from "react";

export interface IPanelItem {
    id: string;
    width?: number;
    minWidth?: number;
    maxWidth?: number;
    widthInPixel?: number;
    minWidthInPixel?: number;
    maxWidthInPixel?: number;
    height?: number;
    heightInPixel?: number;
    component: ElementType<IPanelItemProps>,
    index?: number;
}

export interface IPanelProps {

}