import { useState } from "react";
import styled from "styled-components";
import { BiInfoCircle } from "react-icons/bi";
import { IoClose } from "react-icons/io5";

const DISMISS_KEY = "snappy-server-wake-notice-dismissed";

const ServerWakeNotice = () => {
  const [visible, setVisible] = useState(() => {
    try {
      return sessionStorage.getItem(DISMISS_KEY) !== "1";
    } catch {
      return true;
    }
  });

  if (!visible) return null;

  const dismiss = () => {
    setVisible(false);
    try {
      sessionStorage.setItem(DISMISS_KEY, "1");
    } catch {
      // Ignore storage failures (private mode, disabled storage).
    }
  };

  return (
    <Notice role="status">
      <BiInfoCircle aria-hidden />
      <p>First load may take up to 1 minute if the server has been idle.</p>
      <button type="button" aria-label="Dismiss notice" onClick={dismiss}>
        <IoClose />
      </button>
    </Notice>
  );
};

const Notice = styled.aside`
  position: fixed;
  bottom: 1.5rem;
  left: 1.5rem;
  z-index: 1000;
  display: flex;
  align-items: flex-start;
  gap: 0.75rem;
  max-width: min(22rem, calc(100vw - 3rem));
  padding: 0.9rem 0.85rem 0.9rem 1rem;
  background-color: rgba(0, 0, 0, 0.72);
  border: 0.1rem solid #4e0eff;
  border-radius: 0.8rem;
  color: #ebe7ff;
  box-shadow: 0 0.5rem 1.5rem rgba(0, 0, 0, 0.35);

  svg {
    flex-shrink: 0;
    margin-top: 0.1rem;
    font-size: 1.35rem;
    color: #997af0;
  }

  p {
    margin: 0;
    font-size: 0.85rem;
    line-height: 1.4;
  }

  button {
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
    padding: 0.1rem;
    border: none;
    background: transparent;
    color: #ebe7ff;
    cursor: pointer;

    svg {
      margin: 0;
      font-size: 1.15rem;
      color: inherit;
    }

    &:hover {
      color: #fff;
    }
  }
`;

export default ServerWakeNotice;
