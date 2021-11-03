import { createContext } from "react";
import { PortfolioWatchContextProps } from "../meta/type";

export const PortfolioWatchContext = createContext<PortfolioWatchContextProps>({
    closeIsin: () => {},
    openIsin: () => {},
    openedIsin: '',
    x: 0,
    y: 0,
    changeOrderBy: () => {}
});