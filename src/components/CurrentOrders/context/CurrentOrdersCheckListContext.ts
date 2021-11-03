import { createContext } from "react";
import { CurrentOrdersCheckListContextProps } from "../meta/type";

export const CurrentOrdersCheckListContext = createContext<CurrentOrdersCheckListContextProps>({
    checkList: [],
    onCheck: () => {},
    setCheckList: () => {}
})