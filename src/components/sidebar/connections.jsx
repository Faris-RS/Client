import React, { useEffect, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faArrowLeft,
  faCheck,
  faTimes,
} from "@fortawesome/free-solid-svg-icons";
import animationStore from "../../store/animationStore";
import modalStore from "../../store/modalStore";
import axios from "axios";
import { postUrl, userUrl } from "../../api/api";
import PeopleModal from "../posts/peopleModal";
import postStore from "../../store/postStore";

export default function Connections({ requests }) {
  const [userData, setUserData] = useState("");
  const { newPost, setNewPost } = postStore();

  const {
    setIsActive,
    isActive,
    connection,
    setIsConnection,
    showUserModal4,
    setShowUserModal4,
    setIfRequest,
    refresh,
    setRefresh,
  } = modalStore();
  const { isHovered, setIsHovered } = animationStore();
  const data = {
    token: localStorage.getItem("userToken"),
  };

  const showProfile = async (id) => {
    await axios.patch(`${postUrl}userProfile/${id}`, data).then((response) => {
      setUserData(response.data.data);
      setShowUserModal4(true);
      if (response.data.request === true) {
        setIfRequest(true);
      }
    });
  };

  // useEffect(()=>{
  //   const checkConnections = async () => {
  //     await axios.patch(`${userUrl}checkRequests`, data).then((response) => {
  //       setRequestData(response.data.data);
  //     });
  //   };
  //   checkConnections()
  // },[refresh])

  const sidebar = () => {
    setIsConnection(!connection);
    setIsActive(!isActive);
  };

  const acceptRequest = async (id) => {
    await axios.put(`${userUrl}acceptRequest/${id}`, data).then((response) => {
      if (response.data.status) {
        setNewPost(!newPost);
        setRefresh(!refresh);
      }
    });
  };

  const declineRequest = async (id) => {
    await axios.put(`${userUrl}declineRequest/${id}`, data).then((response) => {
      setNewPost(!newPost);
      setRefresh(!refresh);
    });
  };
  return (
    <>
      <div
        className={`top-0 right-0 w-full sm:w-[35vw] bg-blue-600  p-10 md:pl-20 sm:pl-0 text-white fixed h-full z-40  ease-in-out duration-300 fixed ${
          connection ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <div className="flex items-center mt-10">
          <h3
            className="text-4xl font-semibold text-white cursor-pointer hover:scale-125 duration-300 ease-in-out"
            onClick={sidebar}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </h3>
          <h3 className="ml-10 text-2xl font-semibold text-white">
            Connection requests
          </h3>
        </div>
        <ul>
          <hr className="mt-10 border-b-1 border-white" />
          {requests.length === 0 ? (
            <div>Hurray, you have dealt with all your connection requests</div>
          ) : (
            <>
              {requests.map((result) => (
                <>
                  <div
                    key={result._id}
                    className="mt-4 bg-blue-600 flex items-center justify-between p-2"
                  >
                    <h3
                      className={`text-2xl font-semibold text-white cursor-pointer duration-300 ease-in-out ${
                        isHovered ? "hover:underline" : ""
                      }`}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                      onClick={() => showProfile(result._id)}
                    >
                      {result.firstName} {result.lastName}
                    </h3>
                    <div className="flex items-center">
                      <button
                        className="px-4 py-2 mr-2 bg-green-600 text-white rounded hover:bg-green-700"
                        onClick={() => acceptRequest(result._id)}
                      >
                        <FontAwesomeIcon icon={faCheck} />
                      </button>
                      <button
                        className="px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
                        onClick={() => declineRequest(result._id)}
                      >
                        <FontAwesomeIcon icon={faTimes} />
                      </button>
                    </div>
                  </div>
                  <hr className="mt-4 border-b-1 border-white" />
                </>
              ))}
            </>
          )}
        </ul>
      </div>
      {showUserModal4 ? <PeopleModal data={userData} /> : null}
    </>
  );
}
