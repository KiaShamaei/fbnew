import { createContext } from "react";
import { SocketManagerContextProps } from "../meta/types";

export const TseSocketManagerContext = createContext<SocketManagerContextProps | null>(null)