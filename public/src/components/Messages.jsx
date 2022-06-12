import React from "react";
import styled from "styled-components";

const Messages = ({ messages }) => {
  return (
    <Container>
      {messages?.map((message) => {
        return (
          <div>
            <div
              className={`message ${message.fromSelf ? "sended" : "recieved"}`}
            >
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

const Container = styled.div`
  padding: 1rem 2rem;
  display: flex;
  flex-direction: column;
  gap: 1rem;
  overflow: auto;

  .message {
    display: flex;
    align-items: center;

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
