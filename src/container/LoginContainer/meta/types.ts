export type ActiveLoginFormType = 'LOGIN' | 'FORGOTT_PASSWORD_GET_VALIDATION_CODE' | 'FORGOT_PASSWORD_CONFIRM_CODE' | 'IMPORT_CONFIRM_CODE'|'OTP' |null;

export interface ILoginContextState {
    activeForm: ActiveLoginFormType;
    nationalCode?: string;
    userName?:string;
    password?:string;
    
    
}

export interface ILoginContextProps extends ILoginContextState {
    open: () => void;
    close: () => void;
    getValidationCode: any;
    confirmCode: (nationalCode: string) => void;
    goBack: () => void;
    gotToLoginPage: () => void;
    otp:(userName:string,password:string)=>void
}

export interface ITimerRef {
    refresh: () => void;
    start: () => void;
}