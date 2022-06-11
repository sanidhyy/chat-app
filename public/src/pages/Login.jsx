import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";

import "react-toastify/dist/ReactToastify.css";
import { loginRoute } from "../utils/APIRoutes";

const Login = () => {
  const navigate = useNavigate();

  const initialState = {
    email: "",
    password: "",
  };

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

  const [values, setValues] = useState(initialState);

  useEffect(() => {
    if (localStorage.getItem(process.env.REACT_APP_CHAT_APP_USER))
      return navigate("/");
  }, []); // eslint-disable-line

  const handleSubmit = async (e) => {
    e.preventDefault(); // prevents reload of page
    if (handleValidation()) {
      const { email, password } = values;

      const { data } = await axios.post(loginRoute, {
        email,
        password,
      });

      if (!data.status) showToast(data.msg);

      if (data.status) {
        localStorage.setItem(
          process.env.REACT_APP_CHAT_APP_USER,
          JSON.stringify(data.user)
        );
        return navigate("/");
      }
    }
  };

  const handleValidation = () => {
    const { email, password } = values;

    const isInvalidEmail = (email) => {
      const regex = new RegExp( // eslint-disable-next-line
        /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i
      );
      return !email || regex.test(email) === false;
    };

    if (isInvalidEmail(email) || password.length < 3) {
      showToast("E-mail and Password are required");
      return false;
    }
    return true;
  };

  const handleChange = (e) => {
    setValues({ ...values, [e.target.name]: e.target.value });
  };

  return (
    <>
      <FormContainer>
        <form
          onSubmit={(e) => handleSubmit(e)}
          autoComplete="off"
          autoCapitalize="off"
          autoCorrect="off"
        >
          <div className="brand">
            <img src={Logo} alt="Snappy" />
            <h1>Snappy</h1>
          </div>
          <input
            type="text"
            placeholder="E-mail"
            name="email"
            onChange={(e) => handleChange(e)}
          />
          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />
          <button type="submit">Login</button>
          <span>
            Don't have an account? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>

      <ToastContainer />
    </>
  );
};

const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;

  .brand {
    display: flex;
    align-items: center;
    gap: 1rem;
    justify-content: center;
  }

  img {
    height: 5rem;
  }

  h1 {
    color: #fff;
    text-transform: uppercase;
  }

  form {
    display: flex;
    flex-direction: column;
    gap: 2rem;
    background-color: rgba(0, 0, 0, 0.463);
    border-radius: 2rem;
    padding: 3rem 5rem;
    input {
      background-color: transparent;
      padding: 1rem;
      border: 0.1rem solid #4e0eff;
      border-radius: 0.4rem;
      color: #fff;
      width: 100%;
      font-size: 1rem;

      &:focus {
        border: 0.1rem solid #997af0;
        outline: none;
      }
    }

    button {
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

    span {
      color: #fff;
      text-transform: uppercase;
      a {
        color: #4e0eff;
        text-decoration: none;
        font-weight: bold;
      }
    }
  }
`;

export default Login;
