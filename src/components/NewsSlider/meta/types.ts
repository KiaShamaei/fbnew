import { ReactNode } from "react";

export interface ISlide {
    content: string | ReactNode;
}

export interface INewsSliderState {
    activeIndex: number;
    nextIndex: number;
}