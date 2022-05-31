import { useState, useEffect, useRef, useCallback } from "react";
import Socket from "../services/socket";

const useGetMessages = () => {
  const [messages, setMessages] = useState([]);
  const chatviewRef = useRef(null);
  const socket = Socket.getInstance();

  const scroll = useCallback(() => {
    if (chatviewRef.current) {
      chatviewRef.current.scrollTop = chatviewRef.current.scrollHeight;
    }
  }, [chatviewRef]);

  useEffect(() => {
    fetch("http://localhost:8080/messages", {
      method: "GET",
    })
      .then((res) => res.json())
      .then((res) => {
        setMessages(res);
      });
  }, []);

  useEffect(() => {
    socket.on("message", (message) => {
      const { id, text, createdAt, firstName, lastName } = message;
      setMessages([
        ...messages,
        {
          id,
          text,
          createdAt,
          firstName,
          lastName
        },
      ]);
    });
    scroll();
  }, [messages, scroll, socket]);

  return {
    messages,
    chatviewRef,
  };
};

export default useGetMessages;
