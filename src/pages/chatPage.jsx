import React, { useEffect, useState, useRef } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { io } from "socket.io-client";
import styled from "styled-components";
import { allUsersRoute, host } from "../api/chatRoutes";
import ChatContainer from "../components/chat/ChatContainer";
import Contacts from "../components/chat/Contacts";
import Welcome from "../components/chat/Welcome";
import { chatUrl } from "../api/api";
import Sidebar from "../components/sidebar/sidebar";

export default function Chat() {
  const navigate = useNavigate();
  const socket = useRef();
  const [contacts, setContacts] = useState([]);
  const [currentChat, setCurrentChat] = useState();
  const [currentUser, setCurrentUser] = useState();

  useEffect(() => {
    const token = { token: localStorage.getItem('userToken') }
    if (!localStorage.getItem('userToken')) {
      navigate("/login");
    }
    else {
      axios.post(`${chatUrl}userData`, token).then((response)=>{
        setCurrentUser(response.data.data);
      })
    }
  }, []);

  useEffect(() => {
    if (currentUser) {
      socket.current = io(host);
      socket.current.emit("add-user", currentUser._id);
    }
  }, [currentUser]);

  useEffect( () => {
    if (currentUser) {
      if (currentUser.isAvatarImageSet) {
        axios.get(`${allUsersRoute}/${currentUser._id}`).then((response)=>{
          setContacts(response.data);
        });
      } else {
        navigate("/setAvatar");
      }
    }
  }, [currentUser]);
  
  const handleChatChange = (chat) => {
    setCurrentChat(chat);
  };
  return (
    <>
    <Sidebar/>
      <Container>
        <div className="container">
          <Contacts contacts={contacts} changeChat={handleChatChange} />
          {currentChat === undefined ? (
            <Welcome />
          ) : (
            <ChatContainer currentChat={currentChat} socket={socket} />
          )}
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
  background-color: white;

  .container {
    height: 100vh;
    width: 100%;
    background-image: url("https://img.freepik.com/free-vector/vector-social-contact-seamless-pattern-white-blue_1284-41919.jpg?w=826&t=st=1680856630~exp=1680857230~hmac=82ea269b490915d39486b599905d7bc382bca08166ba283d94f80852448b5d3d");
    background-repeat: no-repeat;
    background-size: cover;

    display: grid;
    grid-template-columns: 25% 75%;
    @media screen and (min-width: 720px) and (max-width: 1080px) {
      grid-template-columns: 35% 65%;
    }
  }
`;