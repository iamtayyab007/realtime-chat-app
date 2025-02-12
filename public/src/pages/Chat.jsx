import React from "react";
import { useState, useEffect } from "react";
import Register from "./Register";
import styled from "styled-components";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { allUsersRoute } from "../utils/ApiRoutes";
import Contact from "../components/Contact";

function Chat() {
  const [contacts, setContacts] = useState([]);
  const [currentUser, setCurrentUser] = useState(undefined);
  const navigate = useNavigate();
  console.log(contacts);
  useEffect(() => {
    if (localStorage.getItem("chat-app-user")) {
      navigate("/");
    } else {
      setCurrentUser(JSON.parse(localStorage.getItem("chat-app-user")));
    }
  }, []);
  useEffect(() => {
    const checkCurrentUser = async () => {
      if (currentUser) {
        if (currentUser.isAvatarImageSet) {
          const data = await axios.get(`${allUsersRoute}/${currentUser.id}`);
          setContacts(data.data);
        } else {
          navigate("/setAvatar");
        }
      }
    };
    checkCurrentUser();
  }, [currentUser]);
  return (
    <>
      <Container>
        <div className="container">
          <Contact contacts={contacts} currentUser={currentUser} />
        </div>
      </Container>
    </>
  );
}
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
    background-color: #00000076;
    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;
export default Chat;
