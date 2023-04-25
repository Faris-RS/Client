import axios from "axios";
import React, { useEffect, useState } from "react";
import { userUrl } from "../../api/api";
import io from "socket.io-client";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import PeopleModal from "../posts/peopleModal";
import modalStore from "../../store/modalStore";
import animationStore from "../../store/animationStore";

const socket = io(import.meta.env.VITE_USER_URL);

export default function Search() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState([]);
  const [userData, setUserData] = useState("");
  const { setIsUser } = modalStore();
  const token = localStorage.getItem("userToken");

  const {
    showUserModal2,
    setShowUserModal2,
    showSearch,
    setShowSearch,
    setIsActive,
    isActive,
    setIfRequest,
    setIfContact,
  } = modalStore();
  const { isHovered, setIsHovered } = animationStore();

  const showProfile = async (id) => {
    await axios.get(`${userUrl}userProfile/${id}/${token}`).then((response) => {
      if (response.status === 206) {
        setIsUser(true);
      }
      if (response.data.request === true) {
        setIfRequest(true);
      } else if (response.data.contact === true) {
        setIfContact(true);
      }
      setUserData(response.data.data);
    });
  };

  useEffect(() => {
    setShowUserModal2(true);
  }, [userData]);
  useEffect(() => {
    setShowUserModal2(false);
  }, []);

  function handleSearch(e) {
    setQuery(e.target.value);
    socket.emit("search", e.target.value);
  }

  useEffect(() => {
    socket.on("searchResult", (data) => {
      setResults(data);
    });
    return () => {
      socket.off("searchResult");
    };
  }, []);
  socket.on("searchResult", (result) => {
    setResults(result.data);
  });

  const searchBar = () => {
    setShowSearch(!showSearch);
    setIsActive(!isActive);
  };

  return (
    <>
      <div
        className={`top-0 right-0 w-full sm:w-[35vw] bg-blue-600  p-10 md:pl-20 sm:pl-0 text-white fixed h-full z-40  ease-in-out duration-300 fixed ${
          showSearch ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <div className="flex items-center mt-10">
          <h3
            className="text-4xl font-semibold text-white cursor-pointer hover:scale-125 duration-300 ease-in-out"
            onClick={searchBar}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </h3>
          <h3 className="ml-10 text-2xl font-semibold text-white">Search</h3>
        </div>
        <input
          type="text"
          className="mt-10 border-0 px-3 py-3 placeholder-blue-800 text-white bg-blue-500 rounded text-sm shadow focus:outline-none focus:ring w-full focus:shadow-xl hover:shadow-xl transition-shadow duration-300 ease-in-out"
          placeholder="User to be searched.."
          required
          style={{ transition: "all .15s ease" }}
          value={query}
          onChange={handleSearch}
        />
        <span
          onClick={() => (setResults([]), setQuery(""))}
          className="cursor-pointer"
        >
          clear search
        </span>
        <br />

        <ul>
          {results.length !== 0 && results.length !== 5 && (
            <>
              {results.map((result) => (
                <div key={result._id} className="bg-blue-600">
                  <h3
                    className={`mt-10 text-3xl font-semibold text-white cursor-pointer inline-block duration-300 ease-in-out ${
                      isHovered ? "hover:underline" : ""
                    }`}
                    onMouseEnter={() => setIsHovered(true)}
                    onMouseLeave={() => setIsHovered(false)}
                    onClick={() => showProfile(result._id)}
                  >
                    {result.firstName} {result.lastName}
                  </h3>
                </div>
              ))}
            </>
          )}
        </ul>
      </div>
      {showUserModal2 ? <PeopleModal data={userData[0]} /> : null}
    </>
  );
}
