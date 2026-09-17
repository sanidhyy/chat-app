import { useState, type FormEvent } from "react";
import styled from "styled-components";
import EmojiPicker, { Theme, type EmojiClickData } from "emoji-picker-react";
import { IoMdSend } from "react-icons/io";
import { BsEmojiSmileFill } from "react-icons/bs";

type ChatInputProps = {
  handleSendMsg: (msg: string) => void;
};

const ChatInput = ({ handleSendMsg }: ChatInputProps) => {
  const [showEmojiPicker, setShowEmojiPicker] = useState(false);
  const [message, setMessage] = useState("");

  const handleEmojiPickerHideShow = () => {
    setShowEmojiPicker(!showEmojiPicker);
  };

  const handleEmojiClick = (emoji: EmojiClickData) => {
    setMessage((msg) => msg + emoji.emoji);
  };

  // Send Chat
  const sendChat = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    // Check if string is empty or contains whitespaces
    const isEmptyOrSpaces = (str: string) => {
      return /^\s*$/.test(str);
    };

    if (!isEmptyOrSpaces(message)) {
      handleSendMsg(message);
      setMessage("");
    }
  };

  return (
    <Container>
      <div className="button-container">
        {/* Emoji Selector */}
        <div className="emoji">
          <BsEmojiSmileFill onClick={handleEmojiPickerHideShow} />
          {showEmojiPicker && (
            <EmojiPicker
              onEmojiClick={handleEmojiClick}
              theme={Theme.DARK}
              lazyLoadEmojis
            />
          )}
        </div>
      </div>
      {/* Form Input */}
      <form className="input-container" onSubmit={(e) => sendChat(e)}>
        <input
          type="text"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button className="submit">
          <IoMdSend />
        </button>
      </form>
    </Container>
  );
};

// Styled Components
const Container = styled.div`
  display: grid;
  grid-template-columns: 5% 95%;
  align-items: center;
  background-color: #080220;
  padding: 0 2rem;
  padding-bottom: 0.3rem;
  border-bottom-right-radius: 2rem;

  @media screen and (min-width: 720px) and (max-width: 1080px) {
    padding: 0 1rem;
    gap: 1rem;
  }

  .button-container {
    display: flex;
    align-items: center;
    color: #fff;
    gap: 1rem;

    .emoji {
      position: relative;
      svg {
        font-size: 1.5rem;
        color: rgba(255, 255, 0, 0.784);
        cursor: pointer;
      }

      .EmojiPickerReact {
        position: absolute;
        top: -450px;
        background-color: #080420 !important;
        box-shadow: 0 5px 10px #9a86f3;
        border-color: #9a86f3 !important;

        .epr-body::-webkit-scrollbar {
          background-color: #080420;
          width: 5px;

          &-thumb {
            background-color: #9186f3;
          }
        }

        .epr-emoji-category-label {
          background-color: #080420 !important;
        }

        .epr-search-container input {
          background-color: transparent;
          border-color: #9186f3;
          color: #fff;
        }
      }
    }
  }

  .input-container {
    width: 100%;
    border-radius: 2rem;
    display: flex;
    align-items: center;
    gap: 2rem;
    background-color: rgba(255, 255, 255, 0.204);

    input {
      width: 90%;
      background-color: transparent;
      color: #fff;
      border: none;
      padding-left: 1rem;
      font-size: 1.2rem;

      &::selection {
        background-color: #9a86f3;
      }

      &:focus {
        outline: none;
      }
    }

    button {
      padding: 0.3rem 1.3rem;
      border-radius: 2rem;
      display: flex;
      justify-content: center;
      align-items: center;
      background-color: #9a86f3;
      border: none;
      cursor: pointer;

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        padding: 0.3rem 1rem;

        svg {
          font-size: 1rem;
        }
      }

      svg {
        font-size: 2rem;
        color: #fff;
      }
    }
  }
`;

export default ChatInput;
