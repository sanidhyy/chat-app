import { useState, useEffect, useRef, type RefObject } from "react";
import axios from "axios";
import styled from "styled-components";
import type { Socket } from "socket.io-client";
import Logout from "./Logout";
import DefaultAvatar from "../assets/user-default.png";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";
import type { ChatMessage, User } from "../types";

type ChatContainerProps = {
  currentChat: User;
  currentUser: User;
  socket: RefObject<Socket | null>;
};

const ChatContainer = ({
  currentChat,
  currentUser,
  socket,
}: ChatContainerProps) => {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const scrollRef = useRef<HTMLDivElement | null>(null);

  useEffect(() => {
    const controller = new AbortController();

    const fetchAllMessages = async () => {
      try {
        const response = await axios.post<ChatMessage[]>(
          getAllMessagesRoute,
          {
            from: currentUser._id,
            to: currentChat._id,
          },
          { signal: controller.signal }
        );

        setMessages((prev) => {
          const history = response.data ?? [];
          const historyIds = new Set(history.map((item) => item.id));
          const pending = prev.filter(
            (item) => item.fromSelf && !historyIds.has(item.id)
          );
          return [...history, ...pending];
        });
      } catch (error) {
        if (!axios.isCancel(error) && !controller.signal.aborted) {
          console.error(error);
        }
      }
    };

    fetchAllMessages();

    return () => controller.abort();
  }, [currentChat._id, currentUser._id]);

  useEffect(() => {
    const currentSocket = socket.current;
    if (!currentSocket) return;

    const handleIncoming = (msg: string) => {
      setMessages((prev) => [
        ...prev,
        { id: crypto.randomUUID(), fromSelf: false, message: msg },
      ]);
    };

    currentSocket.on("msg-recieve", handleIncoming);
    return () => {
      currentSocket.off("msg-recieve", handleIncoming);
    };
  }, [socket]);

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const handleSendMsg = async (msg: string) => {
    const outgoing: ChatMessage = {
      id: crypto.randomUUID(),
      fromSelf: true,
      message: msg,
    };

    setMessages((prev) => [...prev, outgoing]);

    socket.current?.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    try {
      await axios.post(sendMessageRoute, {
        from: currentUser._id,
        to: currentChat._id,
        message: msg,
      });
    } catch (error) {
      console.error(error);
      setMessages((prev) => prev.filter((item) => item.id !== outgoing.id));
    }
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
          {/* User Avatar */}
          <div className="avatar">
            <img
              src={`${
                currentChat?.isAvatarImageSet
                  ? `data:image/svg+xml;base64,${currentChat?.avatarImage}`
                  : DefaultAvatar
              }`}
              alt={`${currentChat?.username}'s Avatar`}
            />
          </div>
          {/* Avatar Username */}
          <div className="username">
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
        {/* Logout */}
        <Logout />
      </div>
      {/* Messages */}
      <Messages messages={messages} scrollRef={scrollRef} />
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding-top: 1rem;
  display: grid;
  grid-template-rows: 10% 78% 12%;
  gap: 0.1rem;
  overflow: hidden;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    grid-template-rows: 15% 70% 15%;
  }

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;
      cursor: default;

      .avatar {
        img {
          height: 3rem;
        }
      }

      .username {
        h3 {
          color: #fff;
        }
      }
    }
  }
`;

export default ChatContainer;
