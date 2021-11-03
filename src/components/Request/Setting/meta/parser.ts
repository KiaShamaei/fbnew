import {LOGIN_LOGOUT_USER} from "./dataMap";

export function loginAndLogoutUser(data:any){
    return data.map((row:any) => ({
        LoginDate : row[LOGIN_LOGOUT_USER.LoginDate],
        LoginTime : row[LOGIN_LOGOUT_USER.LoginTime],
        IpAddress : row[LOGIN_LOGOUT_USER.IpAddress],
        Status : row[LOGIN_LOGOUT_USER.Status]
    }))
}


export function settingParser(data:any): any {
    return Object.fromEntries((data?.data ?? []).map(([key,val]: any) => [key, val.split('"').join('')]))
}

