import React, {
  createContext,
  useContext,
  useMemo,
  useState,
  useEffect,
} from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const useSocket = () => {
  return useContext(SocketContext);
};

function Socket(props) {
  const [isSocketDisconnected, setIsSocketDisconnected] = useState(true);
  const socket = useMemo(() => io(process.env.REACT_APP_SOCKET_URL), []);

  const handleSocketConnection = () => {
    setIsSocketDisconnected(false);
    console.log("connected");
    socket.emit("room-join", { node_name: "admin-panel" });
  };

  const handleSocketDisconnect = () => {
    setIsSocketDisconnected(true);
    console.log("disconnected");
  };

  const handleJoinedRoom = () => {
    console.log("joined to room");
  };

  useEffect(() => {
    socket.on("connect", handleSocketConnection);
    socket.on("disconnect", handleSocketDisconnect);
    socket.on("joined-room", handleJoinedRoom);

    return () => {
      socket.off("disconnect", handleSocketDisconnect);
      socket.off("connect", handleSocketConnection);
      socket.off("joined-room", handleJoinedRoom);
    };
  });

  return (
    <SocketContext.Provider value={{ socket, isSocketDisconnected }}>
      {props.children}
    </SocketContext.Provider>
  );
}

export default Socket;
