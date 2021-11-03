import { createContext } from "react";
import { OrderContextProps } from "../meta/types";

const OrdersContext = createContext<OrderContextProps>({
    close: () => {},
    openCurrentOrder: () => {},
    currentOrder: undefined
});

export default OrdersContext;