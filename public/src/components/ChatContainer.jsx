import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import styled from "styled-components";
import Logout from "./Logout";
import DefaultAvatar from "../assets/user-default.png";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { getAllMessagesRoute, sendMessageRoute } from "../utils/APIRoutes";

// Chat Container
const ChatContainer = ({ currentChat, currentUser, socket }) => {
  const [messages, setMessages] = useState([]);
  const [arrivalMessage, setArrivalMessage] = useState(undefined);
  const scrollRef = useRef();

  // fetch all messages
  useEffect(() => {
    const fetchAllMessages = async () => {
      const response = await axios.post(getAllMessagesRoute, {
        from: currentUser?._id,
        to: currentChat?._id,
      });

      setMessages(response?.data);
    };

    fetchAllMessages();
  }, [currentChat]); // eslint-disable-line

  // socket.io message recieve
  useEffect(() => {
    if (socket.current) {
      socket.current.on("msg-recieve", (msg) => {
        setArrivalMessage({ fromSelf: false, message: msg });
      });
    }
  }, []); // eslint-disable-line

  // check message from server using socket.io
  useEffect(() => {
    arrivalMessage && setMessages((prev) => [...prev, arrivalMessage]);
  }, [arrivalMessage]);

  // change scroll to latest message
  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behaviour: "smooth" });
  }, [messages]);

  // Handle Send Messages
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });

    // socket.io send msg
    socket.current.emit("send-msg", {
      to: currentChat._id,
      from: currentUser._id,
      message: msg,
    });

    const msgs = [...messages];
    msgs.push({ fromSelf: true, message: msg });
    setMessages(msgs);
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
