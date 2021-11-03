import { ReactNode } from "react";

export interface ICombobxProps {
  items?: IComboboxItem[];
  onChange?: (item: IComboboxItem | IComboboxItem[]) => void;
  onBlur?: (e?: any) => void;
  hasInput?: boolean;
  disabled?: boolean;
  onInputChange?: (value: string, hasClosed?: boolean) => void;
  onInputFocus?: (e?: any) => void;
  loading?: boolean;
  multiSelect?: boolean;
  value?: IComboboxItem | IComboboxItem[];
  placeholder?: string;
  marketCheckbox?:boolean;
  label?: string;
  className?: string;
  icon?: ReactNode;
  onOpenStateChange?: (stat: boolean) => void;
  hasSearch?: boolean;
  inputValue?: string;
}

export interface ISelectedItemProps {
  value?: IComboboxItem | IComboboxItem[];
  placeholder?: string;
}

export interface IComboboxItemProps extends IComboboxItem {
  onMouseEnterItem: (id: number) => void;
  onMouseLeaveItem: () => void;
  onItemClick: (item: IComboboxItem) => () => void;
  onCheckboxChange: (checked: boolean, item: IComboboxItem) => void;
  multiSelect: boolean;
  value?: IComboboxItem | IComboboxItem[];
  itemsObject?: any;
  marketCheckbox?:boolean
  className?: string;
}

export interface IComboboxItem {
  label?: string;
  subtitle?: string;
  id?: any;
  [meta: string]: any;
  group?: boolean;
}
