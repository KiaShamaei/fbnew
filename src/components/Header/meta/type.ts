import { ReactNode } from "react";

export interface INavItem {
    title?: string | ReactNode;
    className?: string;
    dropdown?: ReactNode;
    link?: string;
}

export interface IIndexItem {
    code: string,
    title: string,
    value: number,
    change: number,
    percent: number
}

export interface IUserWidgetMenuItem {
    title: string;
    icon: string;
}