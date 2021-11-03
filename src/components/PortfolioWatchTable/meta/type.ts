export interface IPortfolioItem {
    isin: string,
    instrumentName: string,
    closingPrice: number,
    closingPricePercent: number,
    lastTradePrice: number,
    lastTradePricePercent: number,
    quantity: number,
    history: number[],
    instrumentStateCode: string,
    instrumentStateTitle: string,
}

export interface IPriceSocket {
    present: number;
    price: number;
    negative?: boolean;
    positive?: boolean;
}

export interface PortfolioWatchContextProps {
    openedIsin?: string;
    openIsin: (isin: string, e: React.MouseEvent) => void;
    closeIsin: () => void;
    y?: number;
    x?: number;
    orderBy?: string;
    direction?: 'DESC' | 'ASC',
    changeOrderBy: (orderBy: string, direction: 'DESC' | 'ASC') => void;
}

export interface IPortfolioWatchSortModel {
    orderBy?: string;
    direction: 'ASC' | 'DESC'
}