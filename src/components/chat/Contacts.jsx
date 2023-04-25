import React, { useState, useEffect } from "react";
import styled from "styled-components";
// import Logo from "../assets/logo.svg";
import axios from "axios";
import { chatUrl } from "../../api/api";

export default function Contacts({ contacts, changeChat }) {
  const [currentUserName, setCurrentUserName] = useState(undefined);
  const [currentUserImage, setCurrentUserImage] = useState(undefined);
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [loading, setLoading] = useState(true)

  const [searchTerm, setSearchTerm] = useState("");
  const [searchActive, setSearchActive] = useState(false);


  const filteredContacts = contacts.filter((contact) =>
    contact.firstName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleSearchClick = () => {
    setSearchActive(true);
  };

  const handleSearchBlur = () => {
    setSearchActive(false);
    setSearchTerm("");
  };


  useEffect(() => {
    const token = { token: localStorage.getItem('userToken') }
    // console.log(token);
    axios.post(`${chatUrl}userData`, token).then((response) => {
      // console.log(response.data.data);
      setCurrentUserName(response.data.data.firstName);
      setCurrentUserImage(response.data.data.avatarImage);
    })
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = () => {
        setLoading(false);
      };
      loader();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  const changeCurrentChat = (index, contact) => {
    setCurrentSelected(index);
    changeChat(contact);
  };
  return (
    <>
      {loading ? (
        <div>Loading...</div>
      ) : (
        <>
          {currentUserImage && (
            <div style={{
              display: 'grid',
              gridTemplateRows: '10% 75% 15%',
              overflow: 'hidden',
              backgroundColor: 'skyblue'
            }}>
              {/* <div style={{ 
                display: 'flex',
                alignItems: 'center',
                gap: '1rem',
                justifyContent: 'center'
              }} className="brand">
              </div> */}
              <div style={{
                backgroundColor: '#ffffff34',
                height: '47px',
                width: '382px'
              }} className={`search-bar ${searchActive ? "active" : ""}`}>
                <input
                  type="text"
                  placeholder="Search"
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  onClick={handleSearchClick}
                  onBlur={handleSearchBlur}
                />
              </div>
              <div style={{
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                overflow: 'auto',
                gap: '0.8rem'
              }} className="contacts">
                {filteredContacts.map((contact, index) => {
                  return (
                    <div
                      key={contact._id}
                      style={{
                        backgroundColor: '#ffffff34',
                        minHeight: '5rem',
                        cursor: 'pointer',
                        width: '90%',
                        borderRadius: '0.2rem',
                        padding: '0.4rem',
                        display: 'flex',
                        gap: '1rem',
                        alignItems: 'center',
                        transition: '0.5s ease-in-out'
                      }}
                      className={`contact ${index === currentSelected ? "selected" : ""}`}
                      onClick={() => changeCurrentChat(index, contact)}
                    >
                      <div style={{
                        height: '3rem'
                      }} className="avatar">
                        <img
                          src={`data:image/svg+xml;base64,${contact.avatarImage}`}
                          alt=""
                        />
                      </div>
                      <div style={{
                        color: 'black'
                      }} className="firstName">
                        <h3>{contact.firstName}</h3>
                      </div>
                    </div>
                  );
                })}
              </div>
            </div>
          )}
        </>
      )}
    </>
  );
}