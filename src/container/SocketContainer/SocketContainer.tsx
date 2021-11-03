import React from "react";
import { useContext } from "react";
import { useState } from "react";
import { useEffect } from "react";
import { useSelector } from "react-redux";
import { IReduxState } from "redux/types";
import { AGClientSocket, create } from "socketcluster-client";
import { SocketContext } from "./context/SocketContext";

interface Props {}

const SocketContainer: React.FC<Props> = ({ children }) => {
  const { userInfo, isLoggedIn } = useSelector((state: IReduxState) => state.user);
  const [socket, setSocket] = useState<AGClientSocket | null>(null);

  useEffect(() => {
    const options: any = {
      path: "/socketcluster/",
      autoReconnect: true,
      connectTimeout: 5000,
      multiplex: true,
      ...(process.env.REACT_APP_STREAMING_IS_SECURE === "true"
        ? { secure: true }
        : {}),
      rejectUnauthorized: false,
      query: {
        user: userInfo?.userName ?? '', //send user name
        device: "desktop", //specify device that will recive data
        ...(process.env.REACT_APP_STREAMING_HAS_TOKEN === 'true' ? { accessToken: 'c5c2248641044d1fa3b1bc868e252655' } : {}) // send access token if needed
      },
      hostname: process.env.REACT_APP_STREAMING_URL,
      port: Number(process.env.REACT_APP_STREAMING_PORT), //443
      protocolVersion: 1
    };
    let socket: any;
    if(isLoggedIn !== undefined && isLoggedIn !== null) {
      socket = create(options);
      setSocket(prev => {
        prev?.closeAllChannelListeners();
        prev?.disconnect()
        return socket;
      });
    }

    return () => {
      if(socket) {
        socket.closeAllChannelListeners();
      }
    }
  }, [isLoggedIn, userInfo]);

  return (
    <SocketContext.Provider
      value={{
        socket,
      }}>
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => {
  const { socket } = useContext(SocketContext);
  return socket;
};

export default React.memo(SocketContainer);
