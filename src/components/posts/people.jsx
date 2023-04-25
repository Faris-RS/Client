import React, { useEffect, useState } from "react";
import "./post.css";
import axios from "axios";
import { postUrl } from "../../api/api";
import PeopleModal from "./peopleModal";
import modalStore from "../../store/modalStore";

export default function People() {
  const [people, setPeople] = useState([]);
  const [userData, setUserData] = useState("");
  const {
    showUserModal,
    setShowUserModal,
    refresh,
    setIfRequest,
    setIfContact,
  } = modalStore();

  const data = {
    token: localStorage.getItem("userToken"),
  };

  useEffect(() => {
    const getPeople = async () => {
      if (data.token != null) {
        await axios.post(`${postUrl}people`, data).then((response) => {
          setPeople(response.data.data);
        });
      }
    };
    getPeople();
  }, []);

  const showProfile = async (id) => {
    await axios.patch(`${postUrl}userProfile/${id}`, data).then((response) => {
      setUserData(response.data.data[0]);
      if (response.data.request === true) {
        setIfRequest(true);
      } else if (response.data.contact === true) {
        setIfContact(true);
      }
    });
  };

  // This useEffect is for rendering the modal on click
  useEffect(() => {
    setShowUserModal(true);
  }, [userData]);

  // This useEffect is for disabling the modal on page reload and not to render
  // it on cold start.
  useEffect(() => {
    setShowUserModal(false);
  }, []);

  return (
    <>
      {showUserModal ? <PeopleModal data={userData} /> : null}

      <div className="flex flex-col bg-white m-auto p-auto">
        <div className="flex overflow-x-scroll pb-10 hide-scroll-bar">
          <div className="flex flex-nowrap lg:ml-40 md:ml-20 ml-10">
            {people.map((x) => {
              return (
                <>
                  <div
                    className="flex flex-col justify-center max-w-xs p-6 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out sm:px-12 bg-blue-100 text-black ml-6"
                    key={x._id}
                  >
                    <img
                      src={x.image}
                      alt=""
                      className="w-32 h-32 mx-auto rounded-full dark:bg-gray-700 aspect-square"
                    />
                    <div className="space-y-4 text-center divide-y divide-gray-700">
                      <div className="my-2 space-y-1">
                        <h2 className="text-xl font-semibold sm:text-2xl">
                          {x.firstName}
                          {/* {x.lastName} */}
                        </h2>
                        <p className="px-5 text-xs sm:text-base dark:text-gray-400">
                          {x.location}
                        </p>
                      </div>
                      <div className="flex justify-center pt-2 space-x-4 align-center">
                        <button
                          className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded"
                          onClick={() => showProfile(x._id)}
                        >
                          View Profile
                        </button>
                      </div>
                    </div>
                  </div>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </>
  );
}
