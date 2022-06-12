import React from "react";
import axios from "axios";
import styled from "styled-components";
import Logout from "./Logout";
import DefaultAvatar from "../assets/user-default.png";
import ChatInput from "./ChatInput";
import Messages from "./Messages";
import { sendMessageRoute } from "../utils/APIRoutes";

const ChatContainer = ({ currentChat, currentUser }) => {
  const handleSendMsg = async (msg) => {
    await axios.post(sendMessageRoute, {
      from: currentUser._id,
      to: currentChat._id,
      message: msg,
    });
  };

  return (
    <Container>
      <div className="chat-header">
        <div className="user-details">
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
          <div className="username">
            <h3>{currentChat?.username}</h3>
          </div>
        </div>
        <Logout />
      </div>
      <Messages />
      <ChatInput handleSendMsg={handleSendMsg} />
    </Container>
  );
};

const Container = styled.div`
  padding-top: 1rem;

  .chat-header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    padding: 0 2rem;

    .user-details {
      display: flex;
      align-items: center;
      gap: 1rem;

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
