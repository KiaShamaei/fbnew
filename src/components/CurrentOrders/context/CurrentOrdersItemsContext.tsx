import { createContext } from "react";
import { CurrentItemMode } from "../meta/types";

interface CurrentOrdersItemsContextProps {
    currentItemsModes: CurrentItemMode[];
    setIndexMode: (index: number, mode: CurrentItemMode) => void;
}

export const CurrentOrdersItemsContext = createContext<CurrentOrdersItemsContextProps>({
    currentItemsModes: [],
    setIndexMode: () => { }
})