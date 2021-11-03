import { createContext } from "react";
import { SocketContextProps } from "../meta/type";

export const SocketContext = createContext<SocketContextProps>({
    socket: null
})