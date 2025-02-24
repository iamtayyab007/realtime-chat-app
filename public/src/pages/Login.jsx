import React from "react";
import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link } from "react-router-dom";
import Logo from "../assets/logo.svg";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { loginRoute } from "../utils/ApiRoutes.js";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();
  const [value, setValue] = useState({
    username: "",
    password: "",
  });

  // Toast options
  const toastOptions = {
    position: "bottom-right",
    autoClose: 8000,
    pauseOnHover: true,
    draggable: true,
    theme: "dark",
  };
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    }
  }, []);

  const handleValidation = () => {
    console.log(loginRoute);
    const { username, password } = value;
    if (password === "") {
      toast.error("Username and password is required", toastOptions);
      return false;
    } else if (username.length === "") {
      toast.error("Username and password is required", toastOptions);
      return false;
    }
    return true;
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (handleValidation()) {
      try {
        const { username, password } = value;
        const { data } = await axios.post(loginRoute, {
          username,
          password,
        });
        if (data.status === false) {
          toast.error(data.message, toastOptions);
        }
        if (data.status === true) {
          localStorage.setItem("chat-app-user", JSON.stringify(data.user));
          navigate("/");
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const handleChange = (e) => {
    setValue({ ...value, [e.target.name]: e.target.value });
  };
  return (
    <>
      <FormContainer>
        <form onSubmit={(event) => handleSubmit(event)}>
          <div className="brand">
            <img src={Logo} alt="Logo" />
            <h1>Snappy</h1>
          </div>
          <input
            type="text"
            placeholder="Username"
            name="username"
            onChange={(e) => handleChange(e)}
            min={3}
          />

          <input
            type="password"
            placeholder="Password"
            name="password"
            onChange={(e) => handleChange(e)}
          />

          <button type="submit">Login In</button>
          <span>
            Don't have an account ? <Link to="/register">Register</Link>
          </span>
        </form>
      </FormContainer>
      <ToastContainer />
    </>
  );
}
const FormContainer = styled.div`
  height: 100vh;
  width: 100vw;
  display: flex;
  flex-direction: column;
  justify-content: center;
  gap: 1rem;
  align-items: center;
  background-color: #131324;
  .brand{
  display:flex;
  align-items:center;
  justify-content:center;
  gap:1rem;
  img{
  height:5rem;
  }
  h1{
  color:white;
  text-transform:uppercase;
  }
  
  }
  form{
  display:flex;
  flex-direction:column;
  gap:2rem;
  background-color:#00000076
  border-radius:2rem;
  padding:3rem 5rem;
  input{
  background-color:transparent;
  padding:1rem;
  border:0.1rem solid #4e0eff;
  border-radius:0.4rem;
  color:white;
  width:100%;
  font-size:1rem;
  &:focus{
  border:0.1rem solid #997af0;
  outline:none;
  }
  }
  button{
  background-color:#997af0;
  color:white;
  padding:1rem 2rem;
  border:none;
  font-weight:bold;
  cursor:pointer;
  border-radius:0.4rem
  font-size:1rem;
  text-transform:uppercase;
  &:hover{
  background-color:4e0eff;
  }
  }
  span{
  color:white;
  text-transform:uppercase;
  a{
  color:#4e0eff;
  text-transform:none;
  font-weight:bold;
  }
    }
  }
`;
export default Login;
