import { createContext } from "react";
import { ConfirmDialogProps } from "../meta/types";



export const ConfirmDialogContext = createContext<ConfirmDialogProps>({
    open: () => {}
})