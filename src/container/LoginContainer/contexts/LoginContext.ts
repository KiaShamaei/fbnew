import { createContext } from "react";
import { ILoginContextProps } from "../meta/types";

const noop = () => {}

export const LoginContext = createContext<ILoginContextProps>({
    close: noop,
    activeForm: null,
    open: noop,
    confirmCode: noop,
    getValidationCode: noop,
    goBack: noop,
    gotToLoginPage: noop,
    otp:noop
})
