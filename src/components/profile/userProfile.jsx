import React, { useEffect, useState } from "react";
import userProfileStore from "../../store/userProfileStore";
import axios from "axios";
import { userUrl } from "../../api/api";
import animationStore from "../../store/animationStore";

export default function UserProfile() {
  const [userData, setUserData] = useState("");
  const [parsing, setParsing] = useState(true);
  const [dob, setDob] = useState("");
  const { setUserProfile } = userProfileStore();
  const { isHovered, setIsHovered } = animationStore();

  useEffect(() => {
    const token = {
      token: localStorage.getItem("userToken"),
    };
    const getDetails = () => {
      axios.post(`${userUrl}getDetails`, token).then((response) => {
        setUserData(response.data.data);
        setTimeout(() => {
          setParsing(false);
        }, 100);
        // console.log(userData);
      });
    };
    getDetails();
  }, []);

  useEffect(() => {
    const getDob = () => {
      const formattedDate = new Date(userData.dateOfBirth).toLocaleString(
        "en-IN",
        {
          month: "2-digit",
          day: "2-digit",
          year: "numeric",
        }
      );
      setDob(formattedDate);
    };
    getDob();
  }, [userData]);

  return (
    <>
      <main className="profile-page">
        <section className="relative block" style={{ height: "500px" }}>
          <div
            className="absolute top-0 w-full h-full bg-center bg-cover"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1499336315816-097655dcfbda?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=2710&q=80')",
            }}
          >
            <span
              id="blackOverlay"
              className="w-full h-full absolute opacity-50 bg-black"
            ></span>
          </div>
          <div
            className="top-auto bottom-0 left-0 right-0 w-full absolute pointer-events-none overflow-hidden"
            style={{ height: "70px" }}
          >
            <svg
              className="absolute bottom-0 overflow-hidden"
              xmlns="http://www.w3.org/2000/svg"
              preserveAspectRatio="none"
              version="1.1"
              viewBox="0 0 2560 100"
              x="0"
              y="0"
            >
              <polygon
                className="text-white fill-current"
                points="2560 0 2560 100 0 100"
              ></polygon>
            </svg>
          </div>
        </section>
        <section className="relative py-16 bg-white">
          <div className="container mx-auto px-4">
            <div className="relative flex flex-col min-w-0 break-words bg-white w-full mb-6 shadow-xl rounded-lg -mt-64">
              <div className="px-6">
                <div className="flex flex-wrap justify-center">
                  <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                    <div className="relative">
                      <img
                        alt="..."
                        src={userData.image}
                        className="shadow-xl rounded-full h-72 w-72 align-middle border-none absolute -m-16 -ml-20 lg:-ml-32 -mt-48"
                        style={{ maxWidth: "340px" }}
                      />
                      {/* <img src={userData.image} alt="My Image" /> */}
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => setUserProfile("edit")}
                      >
                        Edit your profile
                      </button>
                    </div>
                  </div>
                  <div className="w-full lg:w-4/12 px-4 lg:order-1">
                    <div className="py-6 px-3 mt-32 sm:mt-0">
                      <button
                        className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => setUserProfile("history")}
                      >
                        View your snippets
                      </button>
                      {/* <span
                        className={`uppercase text-red-500 font-bold text-xs px-4 py-2 rounded outline-none sm:mr-2 cursor-pointer mb-1 ${
                          isHovered ? "hover:underline" : ""
                        }`}
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={() => setUserProfile("peeps")}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                      > */}
                      {parsing ? null : (
                        <span
                          className={`uppercase text-red-500 font-bold text-xs px-4 py-2 rounded outline-none sm:mr-2 cursor-pointer mb-1 ${
                            isHovered ? "hover:underline" : ""
                          }`}
                          type="button"
                          style={{ transition: "all .15s ease" }}
                          onClick={() => setUserProfile("peeps")}
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          {userData.contacts.length}{" "}
                          {userData.contacts.length === 1 ? (
                            <span>Connection</span>
                          ) : (
                            <span>Connections</span>
                          )}
                        </span>
                      )}
                      {/* {userData.contacts.length}
                        {userData.contacts.length === 1 ? (
                          <span>Connection</span>
                        ) : (
                          <span>Connections</span>
                        )}
                      </span> */}
                    </div>
                  </div>
                </div>
                <div className="text-center mt-12">
                  <h3 className="text-4xl font-semibold leading-normal mb-2 text-gray-800 mb-2">
                    {userData.firstName}
                  </h3>
                  <div className="text-sm leading-normal mt-0 mb-2 text-gray-500 font-bold uppercase">
                    <i className="fas fa-map-marker-alt mr-2 text-lg text-gray-500"></i>{" "}
                    Location: {userData.location}
                  </div>
                  <div className="mb-2 text-gray-700 mt-10">
                    <i className="fas fa-briefcase mr-2 text-lg text-gray-500"></i>
                    {userData.job}
                  </div>
                  <div className="mb-2 text-gray-700">
                    <i className="fas fa-university mr-2 text-lg text-gray-500"></i>
                    Date of birth: {dob}
                  </div>
                </div>
                <div className="mt-10 py-10 border-t border-gray-300 text-center">
                  <div className="flex flex-wrap justify-center">
                    <div className="w-full lg:w-9/12 px-4">
                      <p className="mb-4 text-lg leading-relaxed text-gray-800">
                        {/* An artist of considerable range, Jenna the name taken by
                        Melbourne-raised, Brooklyn-based Nick Murphy writes,
                        performs and records all of his own music, giving it a
                        warm, intimate feel with a solid groove structure. An
                        artist of considerable range. */}
                        {userData.description}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
