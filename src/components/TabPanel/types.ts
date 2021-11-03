import { ReactElement, ReactNode } from "react";

export interface ITabItemProps {
    title?: string | ReactNode;
    children: ReactNode;
    id: number | string;
    icon?: ReactNode;
    alertNumber?: number;
}

export interface ITabPanelProps {
    children: ReactElement<ITabItemProps>[];
    defaultActiveTab?: number;
    panelsMenu?: ReactNode[];
    className?: string;
}

export interface ITabPanelControlledProps extends ITabPanelProps {
    onActiveTabChange: (activeTab: any) => void;
    activeTab?: number | string;
    panelsMenu?: ReactNode[];
    className?: string;
}

