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
  height: 80%;
`;

export default Messages;
