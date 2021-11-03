import { ReactNode } from "react";

export interface IKeyboardKey {
    keyChar: string;
    label?: ReactNode | string;
    className?: string;
    code?: string;
}