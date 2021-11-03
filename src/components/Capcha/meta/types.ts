export interface ICapcha {
    id: string;
    image: string;
    expiration:any;
}

export interface IRefCapchaProps {
    fetch: () => void;
}