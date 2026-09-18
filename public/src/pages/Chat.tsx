import { useState, useEffect, useRef } from "react";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router";
import { io, type Socket } from "socket.io-client";
import { allUsersRoute, host } from "../utils/APIRoutes";
import { getStoredUser } from "../utils/storage";
import type { User } from "../types";
import Contacts from "../components/Contacts";
import Welcome from "../components/Welcome";
import ChatContainer from "../components/ChatContainer";

const Chat = () => {
  const socket = useRef<Socket | null>(null);
  const navigate = useNavigate();
  const [contacts, setContacts] = useState<User[]>([]);
  const [currentUser] = useState<User | undefined>(
    () => getStoredUser() ?? undefined
  );
  const [currentChat, setCurrentChat] = useState<User | undefined>(undefined);

  useEffect(() => {
    if (!currentUser) navigate("/login");
  }, [currentUser, navigate]);

  // Socket.io add user
  useEffect(() => {
    if (!currentUser) return;

    const currentSocket = io(host);
    socket.current = currentSocket;
    currentSocket.emit("add-user", currentUser._id);

    return () => {
      currentSocket.disconnect();
      socket.current = null;
    };
  }, [currentUser]);

  // Fetch all users
  useEffect(() => {
    const fetchAllUsers = async () => {
      if (currentUser) {
        if (!currentUser.isAvatarImageSet) {
          navigate("/setAvatar");
          return;
        }
        const data = await axios.get<User[]>(
          `${allUsersRoute}/${currentUser._id}`
        );
        setContacts(data.data);
      }
    };

    fetchAllUsers();
  }, [currentUser, navigate]);

  // handle chat change
  const handleChatChange = (chat: User) => {
    setCurrentChat(chat);
  };

  return (
    <Container>
      <div className="container">
        {/* Contacts */}
        <Contacts
          contacts={contacts}
          currentUser={currentUser}
          changeChat={handleChatChange}
        />
        {/* check If no chat is selected */}
        {currentChat === undefined || !currentUser ? (
          <Welcome currentUser={currentUser} />
        ) : (
          <ChatContainer
            key={currentChat._id}
            currentChat={currentChat}
            currentUser={currentUser}
            socket={socket}
          />
        )}
      </div>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .container {
    height: 85vh;
    width: 85vw;
    background-color: rgba(0, 0, 0, 0.463);
    display: grid;
    grid-template-columns: 25% 75%;
    border-radius: 2rem;
    box-shadow: rgba(0, 0, 0, 0.35) 0px 5px 15px;

    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;

export default Chat;
