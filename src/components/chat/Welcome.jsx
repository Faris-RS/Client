import React, { useState, useEffect } from "react";
import styled from "styled-components";
import axios from "axios";
import { chatUrl } from "../../api/api";
// import Robot from "../assets/robot.gif";
export default function Welcome() {
  const [userName, setUserName] = useState("");
  
  useEffect(() => {
    const token = { token: localStorage.getItem('userToken') }
    axios.post(`${chatUrl}userData`, token).then((response)=>{
      setUserName(response.data.data.firstName);
    })
  }, []);
  
  return (
    <Container>
      {/* <img src={Robot} alt="" /> */}
      <h1>
        Welcome, <span>{userName}!</span>
      </h1>
      <h3>Please select a chat to Start messaging.</h3>
    </Container>
  );
}

const Container = styled.div`
  display: flex;
  justify-content: center;
  align-items: center;
  color: white;
  flex-direction: column;
  img {
    height: 20rem;
  }
  span {
    color: #4e0eff;
  }
`;
