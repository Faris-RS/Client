import React, { useEffect, useState } from "react";
import userProfileStore from "../../store/userProfileStore";
import axios from "axios";
import { postUrl, userUrl } from "../../api/api";
import animationStore from "../../store/animationStore";
import toast, { Toaster } from "react-hot-toast";
import { useNavigate, useParams } from "react-router-dom";
import Sidebar from "../sidebar/sidebar";
import modalStore from "../../store/modalStore";
import PeopleModal from "../posts/peopleModal";

export default function OtherProfile() {
  const [userData, setUserData] = useState("");
  const [modalData, setModalData] = useState("");
  const [parsing, setParsing] = useState(true);
  const [snippetData, setSnippetData] = useState([]);
  const [contacts, setContacts] = useState([]);
  const [dob, setDob] = useState("");
  const { setOtherProfilePage, otherProfilePage } = userProfileStore();
  const { isHovered, setIsHovered } = animationStore();
  const {
    showUserModal5,
    setShowUserModal5,
    setIfRequest,
    setIfContact,
    setIsUser,
    ifContact,
  } = modalStore();
  // const Navigate = useNavigate();

  const { propValue } = useParams();

  const token = localStorage.getItem("userToken");

  useEffect(() => {
    const getDetails = () => {
      axios.get(`${userUrl}getDetails/${propValue}`).then((response) => {
        setUserData(response.data.data);
        setTimeout(() => {
          setParsing(false);
        }, 100);
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

  useEffect(() => {
    const getDetails = async () => {
      await axios
        .get(`${userUrl}getConnection/${propValue}`)
        .then((response) => {
          setContacts(response.data.data);
        });
    };
    getDetails();
  }, []);

  useEffect(() => {
    const getDetails = async () => {
      await axios
        .get(`${postUrl}snippetHistory/${propValue}`)
        .then((response) => {
          setSnippetData(response.data.data);
        });
    };
    getDetails();
  }, []);

  const showModal = async (id) => {
    await axios.get(`${userUrl}userProfile/${id}/${token}`).then((response) => {
      console.log(response);
      if (response.status === 206) {
        setIsUser(true);
      }
      if (response.data.request === true) {
        setIfRequest(true);
      } else if (response.data.contact === true) {
        setIfContact(true);
      }
      setModalData(response.data.data[0]);
    });
    setShowUserModal5(true);
  };

  const handleDelete = (id) => {
    toast
      .promise(confirmToast(), {
        loading: "Waiting for confirmation...",
        success: "Connection revoked!",
        error: "Connection not deleted",
      })
      .then(async () => {
        await axios
          .delete(`${userUrl}removeConnection/${id}/${token}`)
          .then((response) => {
            if (response.status) {
              setIfContact(false);
            }
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

  useEffect(()=>{
    const changeContactStatus = async() => {
      await axios.get(`${userUrl}checkOtherProfile/${token}`).then((response) => {
        console.log('hello');
      })
    }
    changeContactStatus()
  },[ifContact])

  const confirmToast = () => {
    return new Promise((resolve, reject) => {
      toast(
        <div>
          <p>Are you sure you want to remove this connection?</p>
          <div className="mt-4">
            <button
              className="bg-red-500 hover:bg-red-600 text-white font-bold py-2 px-4 rounded mr-4"
              onClick={() => {
                resolve();
                toast.dismiss();
              }}
            >
              Yes
            </button>
            <button
              className="bg-gray-500 hover:bg-gray-600 text-white font-bold py-2 px-4 rounded"
              onClick={() => {
                reject();
                toast.dismiss();
              }}
            >
              No
            </button>
          </div>
        </div>,
        {
          duration: 10000, // Set a longer duration for the confirmation toast
        }
      );
    });
  };

  return (
    <>
      <Toaster />
      {showUserModal5 ? <PeopleModal data={modalData} /> : null}
      <Sidebar />
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
                {
                  ifContact === true ? (
                    <>
                    You are not connected to this user
                    </>
                  ) : (
                    <>
                    {otherProfilePage === "about" && (
                      <>
                        <div className="flex flex-wrap justify-center">
                          <div className="w-full lg:w-3/12 px-4 lg:order-2 flex justify-center">
                            <div className="relative">
                              <img
                                alt="..."
                                src={userData.image}
                                className="shadow-xl rounded-full h-72 w-72 align-middle border-none absolute -m-16 -ml-20 lg:-ml-32 -mt-48"
                                style={{ maxWidth: "340px" }}
                              />
                            </div>
                          </div>
                          <div className="w-full lg:w-4/12 px-4 lg:order-3 lg:text-right lg:self-center">
                            <div className="py-6 px-3 mt-32 sm:mt-0">
                              {/* <button
                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => handleDelete(userData._id)}
                              >
                                Remove Connection
                              </button> */}
                            </div>
                          </div>
                          <div className="w-full lg:w-4/12 px-4 lg:order-1">
                            <div className="py-6 px-3 mt-32 sm:mt-0">
                              <button
                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => setOtherProfilePage("history")}
                              >
                                View snippets
                              </button>
                              {parsing ? null : (
                                <span
                                  className={`uppercase text-red-500 font-bold text-xs px-4 py-2 rounded outline-none sm:mr-2 cursor-pointer mb-1 ${
                                    isHovered ? "hover:underline" : ""
                                  }`}
                                  type="button"
                                  style={{ transition: "all .15s ease" }}
                                  onClick={() => setOtherProfilePage("peeps")}
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
                                {userData.description}
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {otherProfilePage === "history" && (
                      <>
                        <div className="flex flex-wrap justify-center">
                          <div className="w-full lg:w-4/12 px-4 lg:order-1">
                            <div className="py-6 px-3 mt-32 sm:mt-0">
                              <button
                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => setOtherProfilePage("about")}
                              >
                                Go back
                              </button>
                            </div>
                          </div>
                          <div className="w-full lg:w-4/12 px-4 lg:order-3">
                            <div className="py-6 px-3 mt-32 sm:mt-0 underline">
                              <a className="bg-white text-black font-semibold uppercase font-bold text-xs px-4 py-2 rounded sm:mr-2 mb-1">
                                {userData.firstName} have a total of{" "}
                                {snippetData.length}{" "}
                                {snippetData.length === 1 ? (
                                  <span>snippet</span>
                                ) : (
                                  <span>snippets</span>
                                )}
                              </a>
                            </div>
                          </div>
                        </div>
                        <div className="mt-10 py-10 border-t border-gray-300 text-center">
                          <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-9/12 px-4">
                              <p className="mb-4 text-lg leading-relaxed text-gray-800">
                                <main>
                                  <section>
                                    <div className="container mx-auto px-4">
                                      <div className="flex flex-wrap">
                                        {!snippetData.length ? (
                                          <div>
                                            {userData.firstName} does not appear to
                                            have created any snippet.
                                          </div>
                                        ) : (
                                          <>
                                            {snippetData.map((x) => {
                                              const formattedDate = new Date(
                                                x.createdDate
                                              ).toLocaleString("en-IN", {
                                                month: "2-digit",
                                                day: "2-digit",
                                                year: "numeric",
                                                hour: "numeric",
                                                minute: "numeric",
                                                hour12: true,
                                              });
    
                                              return (
                                                <div
                                                  className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center z-10"
                                                  key={x._id}
                                                >
                                                  <a className="group relative block bg-gray-500">
                                                    <img
                                                      alt="Failed to load image"
                                                      src={x.image}
                                                      className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                                    />
                                                    <div className="relative p-4 sm:p-6 lg:p-8">
                                                      <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                                                        {formattedDate}
                                                      </p>
    
                                                      <p className="text-xl font-bold text-white sm:text-2xl">
                                                        {x.title}
                                                      </p>
    
                                                      <div className="mt-32 sm:mt-48 lg:mt-64">
                                                        <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                                                          <p className="text-sm text-white">
                                                            {x.caption}
                                                          </p>
                                                          <p className="text-sm text-white">
                                                            {x.like.length} likes
                                                          </p>
                                                        </div>
                                                      </div>
                                                    </div>
                                                  </a>
                                                </div>
                                              );
                                            })}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </section>
                                </main>
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    {otherProfilePage === "peeps" && (
                      <>
                        <div className="flex flex-wrap justify-center">
                          <div className="w-full lg:w-4/12 px-4 lg:order-1">
                            <div className="py-6 px-3 mt-32 sm:mt-0">
                              <button
                                className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                                type="button"
                                style={{ transition: "all .15s ease" }}
                                onClick={() => setOtherProfilePage("about")}
                              >
                                Go back
                              </button>
                            </div>
                          </div>
                          <div className="w-full lg:w-4/12 px-4 lg:order-3">
                            <div className="py-6 px-3 mt-32 sm:mt-0 underline">
                              <a className="bg-white text-black font-semibold uppercase font-bold text-xs px-4 py-2 rounded sm:mr-2 mb-1">
                                {userData.firstName} have a total of{" "}
                                {contacts.length}{" "}
                                {contacts.length === 1 ? (
                                  <span>connection</span>
                                ) : (
                                  <span>connections</span>
                                )}
                              </a>
                            </div>
                          </div>
                        </div>
    
                        <div className="mt-10 py-10 border-t border-gray-300 text-center">
                          <div className="flex flex-wrap justify-center">
                            <div className="w-full lg:w-9/12 px-4">
                              <p className="mb-4 text-lg leading-relaxed text-gray-800">
                                <main>
                                  <section>
                                    <div className="container mx-auto">
                                      <div className="flex flex-wrap">
                                        {!contacts.length ? (
                                          <div>
                                            {userData.firstName} does not appear to
                                            have any connections.
                                          </div>
                                        ) : (
                                          <>
                                            {contacts.map((x) => {
                                              return (
                                                <>
                                                  <div
                                                    className="w-full max-w-xs mx-4 pt-5 my-4 md:w-1/3 bg-white border border-gray-200 rounded-lg shadow"
                                                    key={x._id}
                                                  >
                                                    <div className="flex flex-col items-center pb-10">
                                                      <img
                                                        className="w-24 h-24 mb-3 rounded-full shadow-lg"
                                                        src={x.image}
                                                      />
                                                      <a className="mb-1 text-xl font-medium text-black">
                                                        {x.firstName}
                                                      </a>
                                                      <span className="text-sm text-gray-500">
                                                        {x.job}
                                                      </span>
                                                      <div className="flex mt-4 space-x-3 md:mt-6">
                                                        <a
                                                          className="inline-flex cursor-pointer items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                          onClick={() =>
                                                            showModal(x._id)
                                                          }
                                                        >
                                                          View Contact Card
                                                        </a>
                                                      </div>
                                                    </div>
                                                  </div>
                                                </>
                                              );
                                            })}
                                          </>
                                        )}
                                      </div>
                                    </div>
                                  </section>
                                </main>
                              </p>
                            </div>
                          </div>
                        </div>
                      </>
                    )}
                    </>
                  )
                }
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
