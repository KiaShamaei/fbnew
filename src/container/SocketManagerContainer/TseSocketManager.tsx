import { SocketContext } from 'container/SocketContainer/context/SocketContext'
import React, { Component } from 'react'
import { useContext } from 'react'
import { TseSocketManagerContext } from './context/TseSocketManagerContext'
import { AGClientSocket } from 'socketcluster-client'
import { SocketKeysEnum } from 'enums/SocketKeysEnum'

interface TseSocketManagerContentProps {
    socket: AGClientSocket | null;
}

class TseSocketManagerContent extends Component<TseSocketManagerContentProps> {

    constructor(props: TseSocketManagerContentProps) {
        super(props);
        this.register = this.register.bind(this);
        this.unRegister = this.unRegister.bind(this);
        this.queueRegister = this.queueRegister.bind(this);
        this.queueUnRegister = this.queueUnRegister.bind(this);
        this.listen = this.listen.bind(this);
        this.queueListen = this.queueListen.bind(this)
        this.queueListenToAll = this.queueListenToAll.bind(this)
        this.listenToAll = this.listenToAll.bind(this);
        this.listenToTse = this.listenToTse.bind(this);
        this.registerTsePublic = this.registerTsePublic.bind(this);
        this.unRegisterGlobal = this.unRegisterGlobal.bind(this);
    }

    isinsToListen: {
        [isin: string]: { cb: (data: any) => void, code: SocketKeysEnum }[];
    } = {};
    queueIsinsToListen: {
        [isin: string]: { cb: (data: any) => void, code: SocketKeysEnum }[];
    } = {};



    publicCallbacks: { cb: (data: any) => void, code: SocketKeysEnum }[] = [];
    chanals: { [isin: string]: any } = {};

    register(isin: string, cb: (data: any) => void, code: SocketKeysEnum) {
        if (this.isinsToListen[isin] === undefined) {
            this.isinsToListen[isin] = [];
        }
        this.isinsToListen[isin].push({ cb, code });
        this.listenToAll();
    }
    queueRegister(isin: string, cb: (data: any) => void, code: SocketKeysEnum) {
        if (this.queueIsinsToListen[isin] === undefined) {
            this.queueIsinsToListen[isin] = [];
        }
        this.queueIsinsToListen[isin].push({ cb, code });
        this.queueListenToAll();
    }
    queueUnRegister(isin: string, cb: (data: any) => void) {
        if (this.queueIsinsToListen && this.queueIsinsToListen[isin]) {
            const indexToRemove = this.queueIsinsToListen[isin].findIndex(item => item.cb === cb);
            if (indexToRemove !== -1) {
                this.queueIsinsToListen[isin].splice(indexToRemove, 1);
                if (this.queueIsinsToListen[isin].length === 0) {
                    this.props.socket?.unsubscribe(`tse.queue-${isin}`);
                    delete this.queueIsinsToListen[isin];
                }
                this.queueListenToAll();
            }
        }
    }

    registerTsePublic(cb: (data: any) => void, code: SocketKeysEnum) {
        this.publicCallbacks.push({
            cb,
            code
        });
        this.globalListenToAll();
    }

    unRegister(isin: string, cb: (data: any) => void) {
        
        if (this.isinsToListen && this.isinsToListen[isin]) {
            const indexToRemove = this.isinsToListen[isin].findIndex(item => item.cb === cb);
            if (indexToRemove !== -1) {
                this.isinsToListen[isin].splice(indexToRemove, 1);
                if (this.isinsToListen[isin].length === 0) {
                    this.props.socket?.unsubscribe(`tse-${isin}`);
                    delete this.isinsToListen[isin];
                }
                this.listenToAll();
            }
        }
    }

    unRegisterGlobal(cb: (data: any) => void) {
        const itemToRemove = this.publicCallbacks.findIndex(item => item.cb === cb)
        this.publicCallbacks.splice(itemToRemove, 1)
        this.globalListenToAll();
    }

    async listenToTse() {
        if (this.props.socket) {
            const chanal = this.props.socket.subscribe(`global`);
            for await (const data of chanal) {
                for (let callBackItem of this.publicCallbacks) {
                    const rawData = data.data;
                    if (data.code === callBackItem.code) {
                        callBackItem.cb(rawData);
                    }
                }
            }
        }
    }

    async listen(isin: string, callbackItems: { cb: (data: any) => void, code: SocketKeysEnum }[]) {
        if (this.props.socket) {
            if (this.chanals[`tse-${isin}`]) {
                this.chanals[`tse-${isin}`].closeOutput();
            }
            const chanal = this.props.socket.subscribe(`tse-${isin}`);
            this.chanals[`tse-${isin}`] = chanal;
            for await (const data of chanal) {
                const rawData = data.data;
                for (const item of callbackItems) {
                    if (data.code === item.code) {
                        item.cb(rawData);
                    }
                }
            }
        }

    }
    async globalListen(callbackItems: { cb: (data: any) => void, code: SocketKeysEnum }[]) {
        console.log('called')
        if (this.props.socket) {
            if (this.chanals['global']) {
                this.chanals['global'].closeOutput();
            }
            const chanal = this.props.socket.subscribe(`global`);
            this.chanals[`global`] = chanal;
            for await (const data of chanal) {
                const rawData = data.data;
                for (const item of callbackItems) {
                    if(item.code === data.code)
                        item.cb(rawData);
                }
            }
        }

    }

    async queueListen(isin: string, callbackItems: { cb: (data: any) => void, code: SocketKeysEnum }[]) {
        if (this.props.socket) {
            if (this.chanals[`tse.queue-${isin}`]) {
                this.chanals[`tse.queue-${isin}`].closeOutput();
            }
            const chanal = this.props.socket.subscribe(`tse.queue-${isin}`);
            this.chanals[`tse.queue-${isin}`] = chanal;
            for await (const data of chanal) {
                const rawData = data.data;
                for (const item of callbackItems) {
                    if (data.code === item.code) {
                        item.cb(rawData);
                    }
                }
            }
        }
    }

    queueListenToAll() {
        for (const [isin, item] of Object.entries(this.queueIsinsToListen)) {
            if (item.length === 0) {
                this.props.socket?.unsubscribe(`tse.queue-${isin}`)
            } else {
                this.queueListen(isin, item);
            }
        }
    }
    listenToAll() {
        for (const [isin, item] of Object.entries(this.isinsToListen)) {
            if (item.length === 0) {
                this.props.socket?.unsubscribe(`tse-${isin}`)
            } else {
                this.listen(isin, item);
            }
        }
    }
    globalListenToAll() {
        this.globalListen(this.publicCallbacks);
    }

    render() {
        return (
            <TseSocketManagerContext.Provider value={{
                register: this.register,
                unRegister: this.unRegister,
                unRegisterGlobal: this.unRegisterGlobal,
                registerPublicTse: this.registerTsePublic,
                queueUnRegister: this.queueUnRegister,
                queueRegister: this.queueRegister
            }}>
                {this.props.children}
            </TseSocketManagerContext.Provider>
        )
    }
}

const TseSocketManager: React.FC = ({
    children
}) => {
    const { socket } = useContext(SocketContext)
    return <TseSocketManagerContent
        socket={socket}
    >
        {children}
    </TseSocketManagerContent>
}

export const useTseSocket = () => {
    const context = useContext(TseSocketManagerContext)
    return {
        registerPublicTse: context?.registerPublicTse,
        register: context?.register,
        unRegister: context?.unRegister,
        unRegisterGlobal: context?.unRegisterGlobal,
        queueUnRegister: context?.queueUnRegister,
        queueRegister: context?.queueRegister
    }
}

export default TseSocketManager
