import { IComboboxItem } from "components/form/Combobox/meta/types";
import { ReactNode } from "react";

export interface LazyComboboxProps {
    url: (searchKey: string) => string;
    getParams?: (searchKey: string) => any;
    parser: (v: any) => IComboboxItem[];
    icon?: ReactNode;
    className?: string;
    onChange: (value?: IComboboxItem) => void,
    value?: IComboboxItem,
    placeholder?: string,
    hasClear?: boolean;
}