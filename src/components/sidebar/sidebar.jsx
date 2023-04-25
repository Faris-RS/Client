import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import userProfileStore from "../../store/userProfileStore";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faTimes } from "@fortawesome/free-solid-svg-icons";
import modalStore from "../../store/modalStore";
import CreateSnippet from "./createSnippet";
import animationStore from "../../store/animationStore";
import LogoutLocal from "../logout/logoutLocal";
import Search from "./search";
import Connections from "./connections";
import axios from "axios";
import { userUrl } from "../../api/api";

const Sidebar = () => {
  const [requestData, setRequestData] = useState([]);
  const {
    isSnippet,
    setIsSnippet,
    isActive,
    setIsActive,
    showSidebar,
    setShowSidebar,
    showSearch,
    setShowSearch,
    connection,
    setIsConnection,
    refresh,
  } = modalStore();
  const { isHovered, setIsHovered, setLoading, loading } = animationStore();
  const { connectionRequest, setIsConnectionRequest } = userProfileStore();

  const { setUserProfile } = userProfileStore();
  const Navigate = useNavigate();

  const data = {
    token: localStorage.getItem("userToken"),
  };

  const addSnippet = () => {
    setIsSnippet(!isSnippet);
    setIsActive(!isActive);
    setShowSidebar(!showSidebar);
  };

  const searchBar = () => {
    setShowSearch(!showSearch);
    setIsActive(!isActive);
  };

  const connectionSidebar = async () => {
    await axios.patch(`${userUrl}checkRequests`, data).then((response) => {
      setRequestData(response.data.data);
      setIsConnection(true);
      setIsActive(!isActive);
    });
  };

  useEffect(() => {
    const checkConnections = async () => {
      await axios.patch(`${userUrl}checkRequests`, data).then((response) => {
        setRequestData(response.data.data);
      });
    };
    checkConnections();
  }, [refresh]);

  const closeSidebar = () => {
    setIsSnippet(false);
    setIsActive(true);
    setShowSidebar(false);
  };

  return (
    <>
      {showSidebar && !showSearch && !isSnippet && !connection ? (
        <>
          <button
            className="flex text-4xl text-white items-center cursor-pointer fixed right-10 top-6 z-50 hover:scale-125 duration-300 ease-in-out"
            onClick={closeSidebar}
          >
            <FontAwesomeIcon icon={faTimes} />
          </button>
        </>
      ) : (
        <svg
          onClick={() => setShowSidebar(!showSidebar)}
          className="fixed  z-30 flex items-center cursor-pointer right-10 top-6"
          fill="#2563EB"
          viewBox="0 0 100 80"
          width="40"
          height="40"
        >
          <rect width="100" height="10"></rect>
          <rect y="30" width="100" height="10"></rect>
          <rect y="60" width="100" height="10"></rect>
        </svg>
      )}

      <>
        <div
          className={`top-0 right-0 w-full sm:w-[35vw] bg-blue-600  p-10 md:pl-20 text-white fixed h-full z-40  ease-in-out duration-300 fixed ${
            showSidebar ? "translate-x-0 " : "translate-x-full"
          } ${isActive ? "" : "hidden"}`}
        >
          <h3
            className={`mt-20 text-3xl font-semibold text-white cursor-pointer inline-block duration-300 ease-in-out ${
              isHovered ? "hover:underline" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => Navigate("/")}
          >
            Home
          </h3>{" "}
          <br />
          <h3
            className={`mt-10 text-3xl font-semibold text-white cursor-pointer inline-block duration-300 ease-in-out ${
              isHovered ? "hover:underline" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={searchBar}
          >
            Search
          </h3>{" "}
          <br />
          <h3
            className={`mt-10 text-3xl font-semibold text-white cursor-pointer inline-block duration-300 ease-in-out ${
              isHovered ? "hover:underline" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={connectionSidebar}
          >
            Connection request
          </h3>{" "}
          <br />
          <h3
            className={`mt-10 text-3xl font-semibold text-white cursor-pointer inline-block duration-300 ease-in-out ${
              isHovered ? "hover:underline" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => (setUserProfile("about"), Navigate("/profile"))}
          >
            Profile
          </h3>{" "}
          <br />
          <h3
            className={`mt-10 text-3xl font-semibold text-white cursor-pointer inline-block duration-300 ease-in-out ${
              isHovered ? "hover:underline" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={addSnippet}
          >
            Create snippet
          </h3>{" "}
          <br />
          <h3
            className={`mt-10 text-3xl font-semibold text-white cursor-pointer inline-block duration-300 ease-in-out ${
              isHovered ? "hover:underline" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={() => Navigate("/chat")}
          >
            Open Chat
          </h3>{" "}
          <br />
          <LogoutLocal />
        </div>
      </>

      {isSnippet ? <CreateSnippet /> : null}

      {showSearch ? <Search /> : null}

      {connection ? <Connections requests={requestData} /> : null}
    </>
  );
};

export default Sidebar;
