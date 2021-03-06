export interface IOmsResultSignal {
    orderId: number,
    personageId: number,
    investorBourseCode: string,
    investorBourseCodeId: number,
    action: number,
    noticeMessage: string,
    isPopupClosable: number,
    remainQuantity: number,
    quantity1: number,
    clientInternalId: number,
    accountRouteTypeId: number,
    accountRouteTypeTitle: number,
    parentExecutedQuantity: number,
    description: string,
    instrumentIsin: string,
    instrumentName: string,
    investorTitle: string,
    orderNumber: number,
    hostOrderNumber: number,
    orderSide: number,
    orderStateId: number,
    orderStateEnglishTitle: string,
    parentDescription: string,
    parentOrderId: number,
    parentOrderStateId: number,
    price1: number,
    userOrderEntryId: number,
    orderEntryDate: string,
    orderEntryTime: string,
    orderStatus: number,
    parentOrderStatus: number,
    canceledQuantity: number,
    executed: number,
    quantity2: number,
    price2: number,
}