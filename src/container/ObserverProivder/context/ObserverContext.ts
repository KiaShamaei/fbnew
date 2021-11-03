import { createContext } from "react";
import { Observer } from "utils/observer";
import { ObserverContextProps } from "../meta/types";

export const ObserverContext = createContext<ObserverContextProps>({
    observer: new Observer()
})