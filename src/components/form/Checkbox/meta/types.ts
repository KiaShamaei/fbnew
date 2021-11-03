import { FieldRenderProps } from "react-final-form";

export interface ICheckboxProps extends FieldRenderProps<boolean> {
    value?: boolean;
    onChange?: (value: boolean) => void;
    disabled?: boolean;
    className?: string;
}