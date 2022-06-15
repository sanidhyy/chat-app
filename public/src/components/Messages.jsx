import React from "react";
import styled from "styled-components";
import { v4 as uuidv4 } from "uuid";

// Messages
const Messages = ({ messages, scrollRef }) => {
  return (
    <Container>
      {/* Show each message */}
      {messages?.map((message) => {
        return (
          <div ref={scrollRef} key={uuidv4()}>
            {/* sended - Message sent from user */}
            {/* recieved - Message recieved by user */}
            <div
              className={`message ${message.fromSelf ? "sended" : "recieved"}`}
            >
              {/* Message */}
              <div className="content">
                <p>{message.message}</p>
              </div>
            </div>
          </div>
        );
      })}
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;

  &::-webkit-scrollbar {
    width: 0.2rem;

    &-thumb {
      background-color: rgba(255, 255, 255, 0.224);
      width: 0.1rem;
      border-radius: 1rem;
    }
  }

  .message {
    display: flex;
    align-items: center;
    cursor: default;

    .content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 1rem;
      font-size: 1.1rem;
      border-radius: 1rem;
      color: #d1d1d1;
    }
  }

  .sended {
    justify-content: flex-end;

    .content {
      background-color: rgba(79, 4, 255, 0.129);
    }
  }

  .recieved {
    justify-content: flex-start;

    .content {
      background-color: rgba(153, 0, 255, 0.125);
    }
  }
`;

export default Messages;
