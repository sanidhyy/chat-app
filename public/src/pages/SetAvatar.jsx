import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import styled from "styled-components";
import loader from "../assets/loader.gif";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { Buffer } from "buffer";

import "react-toastify/dist/ReactToastify.css";
import { setAvatarRoute } from "../utils/APIRoutes";
const SetAvatar = () => {
  const api = "https://api.multiavatar.com";
  const navigate = useNavigate();
  const [avatars, setAvatars] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [selectedAvatar, setSelectedAvatar] = useState(undefined);

  const showToast = (msg) => {
    const toastOptions = {
      position: "bottom-right",
      autoClose: 8000,
      pauseOnHover: true,
      draggable: true,
      theme: "dark",
    };

    return toast.error(msg, toastOptions);
  };

  const setProfilePicture = async () => {
    if (selectedAvatar === undefined) {
      showToast("Please select an avatar");
    } else {
      const user = await JSON.parse(
        localStorage.getItem(process.env.REACT_APP_CHAT_APP_USER)
      );
      const { data } = await axios.post(`${setAvatarRoute}/${user._id}`, {
        image: avatars[selectedAvatar],
      });

      if (data.isSet) {
        user.isAvatarImageSet = true;
        user.avatarImage = data.image;
        localStorage.setItem(
          process.env.REACT_APP_CHAT_APP_USER,
          JSON.stringify(user)
        );
        navigate("/");
      } else {
        showToast("Error setting avatar. Please try again");
      }
    }
  };

  const fetchAvatars = async () => {
    setIsLoading(true);
    const data = [];
    // foreach doesn't work with APIs
    for (let i = 0; i < 4; i++) {
      const image = await axios.get(
        `${api}/${Math.round(Math.random() * 1000)}?apikey=${
          process.env.REACT_APP_MULTIAVATAR_API_KEY
        }`
      );
      const buffer = new Buffer(image.data);
      data.push(buffer.toString("base64"));
    }

    setAvatars(data);
    setIsLoading(false);
    setSelectedAvatar(undefined);
  };

  useEffect(() => {
    fetchAvatars();
  }, []);

  return (
    <>
      {isLoading ? (
        <Container>
          <img src={loader} alt="Loading..." className="loader" />
        </Container>
      ) : (
        <Container>
          <div className="title-container">
            <h1>Pick an avatar as your profile picture</h1>
          </div>
          <div className="avatars">
            {avatars.map((avatar, i) => {
              return (
                <div
                  key={i}
                  className={`avatar ${selectedAvatar === i ? "selected" : ""}`}
                >
                  <img
                    src={`data:image/svg+xml;base64,${avatar}`}
                    alt={`Avatar ${i + 1}`}
                    onClick={() => setSelectedAvatar(i)}
                  />
                </div>
              );
            })}
          </div>
          <div className="btn-container">
            <button className="submit-btn" onClick={setProfilePicture}>
              Set as Profile Picture
            </button>
            <button
              className="reload-btn"
              onClick={fetchAvatars}
              title="Load New Avatars"
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="32"
                height="32"
                fill="currentColor"
                viewBox="0 0 16 16"
              >
                <path
                  fillRule="evenodd"
                  d="M8 3a5 5 0 1 0 4.546 2.914.5.5 0 0 1 .908-.417A6 6 0 1 1 8 2v1z"
                />
                <path d="M8 4.466V.534a.25.25 0 0 1 .41-.192l2.36 1.966c.12.1.12.284 0 .384L8.41 4.658A.25.25 0 0 1 8 4.466z" />
              </svg>
            </button>
          </div>
        </Container>
      )}
      <ToastContainer />
    </>
  );
};

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  flex-direction: column;
  gap: 3rem;
  background-color: #131324;
  height: 100vh;
  width: 100vw;
  .loader {
    max-inline-size: 100%;
  }

  .title-container {
    h1 {
      color: #fff;
    }
  }

  .avatars {
    display: flex;
    gap: 2rem;

    .avatar {
      border: 0.4rem solid transparent;
      padding: 0.4rem;
      border-radius: 5rem;
      display: flex;
      justify-content: center;
      align-items: center;
      transition: 0.5s ease-in-out;

      img {
        height: 6rem;
      }
    }

    .selected {
      border: 0.4rem solid #4e0eff;
    }
  }

  .btn-container {
    display: flex;
    justify-content: center;
    align-items: center;
    gap: 0.5rem;

    .submit-btn {
      background-color: #4e0eff;
      color: #fff;
      padding: 1rem 2rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.2s ease-in-out;

      &:hover {
        background-color: #997af0;
      }
    }

    .reload-btn {
      display: grid;
      place-items: center;
      background-color: #4e0eff;
      color: #fff;
      height: 100%;
      padding: 0 1rem;
      border: none;
      font-weight: bold;
      cursor: pointer;
      border-radius: 0.4rem;
      font-size: 1rem;
      text-transform: uppercase;
      transition: 0.2s ease-in-out;

      &:hover {
        background-color: #997af0;
      }
    }
  }
`;

export default SetAvatar;
