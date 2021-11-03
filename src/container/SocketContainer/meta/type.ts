import { AGClientSocket } from 'socketcluster-client'

export interface SocketContextProps {
    socket: AGClientSocket | null;
}