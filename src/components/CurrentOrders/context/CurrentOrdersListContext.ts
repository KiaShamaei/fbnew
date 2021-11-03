import { createContext } from "react";
import { CurrentOrderListContextProps } from "../meta/type";

export const CurrentOrdersListContext = createContext<CurrentOrderListContextProps>({
    handleOrder: () => {},
    handlePreOrder: () => {},
})
