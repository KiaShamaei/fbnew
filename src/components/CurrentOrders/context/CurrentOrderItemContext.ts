import { createContext } from "react";

interface CurrentOrderItemContextProps {
    setIsCancelDisplay: (s: boolean) => void;
    isCancelDisplay: boolean;
    setExpanded: (s: boolean) => void;
    expanded: boolean;
    setIsEdit: (s: boolean) => void;
    isEdit: boolean;
    setCalculator: (s: boolean) => void,
    isCalcular: boolean;
}

const noop = (...args: any) => { };

const CurrentOrderItemContext = createContext<CurrentOrderItemContextProps>({
    setIsCancelDisplay: noop,
    isCancelDisplay: false,
    setExpanded: noop,
    isEdit: false,
    setIsEdit: noop,
    expanded: false,
    isCalcular: false,
    setCalculator: noop
})

export default CurrentOrderItemContext;