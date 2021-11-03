import { AxiosError } from "axios";

export function commonErrorHandler(error: AxiosError): string {
    if(error?.response?.data) {
        const message = error.response.data.message;
        return message;
    } else if(error.message) {
        return error.message;
    } else {
        return 'خطا رخ داده است'
    }
}

export function errorHandler({
    msg,
}: {
    msg: string[]
}) {
    if(msg) {
        return msg[0]
    }
    return null
}