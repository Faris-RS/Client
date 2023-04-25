import React, { useEffect, useState } from "react";
import userProfileStore from "../../store/userProfileStore";
import axios from "axios";
import { userUrl } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import postStore from "../../store/postStore";
import Loading from "../loading/Loading";
import { useNavigate } from "react-router-dom";

export default function Connections() {
  const [contacts, setContacts] = useState([]);
  const [status, setStatus] = useState(false);
  const [loading, setLoading] = useState(true);
  const { setUserProfile } = userProfileStore();
  const { newPost } = postStore();
  const Navigate = useNavigate();
  const token = {
    token: localStorage.getItem("userToken"),
  };
  useEffect(() => {
    const getDetails = async () => {
      await axios.patch(`${userUrl}getConnection`, token).then((response) => {
        setContacts(response.data.data);
      });
    };
    getDetails();
  }, []);

  useEffect(() => {
    const getDetails = async () => {
      await axios.patch(`${userUrl}getConnection`, token).then((response) => {
        setContacts(response.data.data);
      });
    };
    getDetails();
  }, [status]);

  useEffect(() => {
    const didNewPost = () => {
      setStatus(!status);
    };
    didNewPost();
  }, [newPost]);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = () => {
        setLoading(false);
      };
      loader();
    }, 1000);
    return () => clearTimeout(timer);
  }, [contacts]);

  const handleDelete = (id) => {
    toast
      .promise(confirmToast(), {
        loading: "Waiting for confirmation...",
        success: "Connection revoked!",
        error: "Connection not deleted",
      })
      .then(async () => {
        await axios
          .delete(`${userUrl}removeConnection/${id}/${token.token}`)
          .then((response) => {
            if (response.status) {
              setStatus(!status);
            }
          });
      })
      .catch((err) => {
        console.error(err);
      });
  };

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
      {loading ? (
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
                    <Loading />
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      ) : (
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
                      <div className="w-full lg:w-4/12 px-4 lg:order-1">
                        <div className="py-6 px-3 mt-32 sm:mt-0">
                          <button
                            className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                            type="button"
                            style={{ transition: "all .15s ease" }}
                            onClick={() => setUserProfile("about")}
                          >
                            Go back
                          </button>
                        </div>
                      </div>
                      <div className="w-full lg:w-4/12 px-4 lg:order-3">
                        <div className="py-6 px-3 mt-32 sm:mt-0 underline">
                          <a className="bg-white text-black font-semibold uppercase font-bold text-xs px-4 py-2 rounded sm:mr-2 mb-1">
                            You have a total of {contacts.length}{" "}
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
                                        You do not appear to have any
                                        connections. Connect with people to
                                        start interactions
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
                                                    alt="Bonnie image"
                                                  />
                                                  <a className="mb-1 text-xl font-medium text-black">
                                                    {x.firstName}
                                                  </a>
                                                  <span className="text-sm text-gray-500">
                                                    {x.job}
                                                  </span>
                                                  <div className="flex mt-4 space-x-3 md:mt-6">
                                                    <a
                                                      onClick={() =>
                                                        Navigate(
                                                          `/otherprofile/${x._id}`
                                                        )
                                                      }
                                                      className="inline-flex items-center cursor-pointer px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                                                    >
                                                      View Profile
                                                    </a>
                                                    <a
                                                      onClick={() =>
                                                        handleDelete(x._id)
                                                      }
                                                      className="inline-flex items-center px-4 cursor-pointer py-2 text-sm font-medium text-center text-gray-900 bg-white border border-gray-300 rounded-lg hover:bg-gray-100 focus:ring-4 focus:outline-none focus:ring-gray-200 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-700 dark:focus:ring-gray-700"
                                                    >
                                                      Remove
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
                  </div>
                </div>
              </div>
            </section>
          </main>
        </>
      )}
    </>
  );
}
