import { createContext } from "react";
import { ISnackbarContext } from "../meta/types";

const SnackbarContext = createContext<ISnackbarContext>({
    display: () => {}
})

export default SnackbarContext;