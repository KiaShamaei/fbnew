export interface IOmsIpoOrderChangeSignal {
    instrumentIsin: string;
    startDateTime: string;
    endDateTime: string;
    maxOrderQuntity: number;
    minimumprice: number;
    maximumprice: number;
    action: number;
}