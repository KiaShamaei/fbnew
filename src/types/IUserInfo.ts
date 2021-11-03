export interface IUserInfo {
    userName?: string;
    fullName?: string;
    natinalCode?: string;
    email?: string;
    mobile?: string;
    bourseCode?: string;
    accessToken?: string;
}

export interface ILoginSuccess {
    accessToken: string;
    refreshToken: string;
    role?: any;
    userName: string;
}