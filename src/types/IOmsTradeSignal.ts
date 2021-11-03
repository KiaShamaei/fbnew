export interface IOmsTradeSignal {
    instrumentId: number;
    investorBourseCode: string;
    investorBourseCodeId: number;
    orderId: number;
    tradeId: number;
    tradePrice: number;
    tradeQuantity: number;
    instrumentName: string;
    investorBourseTitle: string;
    orderNumber: number;
    tradeNumber: number;
    tradeSide: number;
    tradeDateTime: string;
    tradeRemainingQuantity: number;
    instrumentIdentification: number;
}