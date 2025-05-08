import useWebSocket from "react-use-websocket";
import { SOCKET_URL } from "../api/config";
import { useState } from "react";

console.log(SOCKET_URL);

const Server = () => {
  const [message, setMessage] = useState("");
  const { sendJsonMessage } = useWebSocket(SOCKET_URL, {
    onOpen: () => {
      console.log("connected");
    },

    onClose: () => {
      console.log("closed");
    },
    onError: () => {
      console.log("error");
    },
    onMessage: (msg) => {
      setMessage(msg.data);
    },
  });

  const sendHello = () => {
    const message = { text: "hello!" };
    sendJsonMessage(message);
  };

  return (
    <>
      <div>
        <button onClick={sendHello}>Send</button>
        <div> Received Data: {message}</div>
      </div>
    </>
  );
};

export default Server;
