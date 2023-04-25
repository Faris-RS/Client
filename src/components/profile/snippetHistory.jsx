import React, { useEffect, useState } from "react";
import userProfileStore from "../../store/userProfileStore";
import axios from "axios";
import { postUrl } from "../../api/api";
import toast, { Toaster } from "react-hot-toast";
import postStore from "../../store/postStore";
import Loading from "../loading/Loading";

export default function SnippetHistory() {
  const [snippetData, setSnippetData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [status, setStatus] = useState(false);
  const { setUserProfile } = userProfileStore();
  const { newPost } = postStore();
  const token = {
    token: localStorage.getItem("userToken"),
  };
  useEffect(() => {
    const getDetails = async () => {
      await axios.patch(`${postUrl}snippetHistory`, token).then((response) => {
        setSnippetData(response.data.data);
      });
    };
    getDetails();
  }, []);

  useEffect(() => {
    const getDetails = async () => {
      await axios.patch(`${postUrl}snippetHistory`, token).then((response) => {
        setSnippetData(response.data.data);
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
  }, [snippetData]);

  const handleDelete = (id) => {
    toast
      .promise(confirmToast(), {
        loading: "Deleting snippet...",
        success: "Snippet deleted!",
        error: "Snippet deletion cancelled",
      })
      .then(async () => {
        await axios.delete(`${postUrl}deletePost/${id}`).then((response) => {
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
          <p>Are you sure you want to delete this snippet?</p>
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
                            You have a total of {snippetData.length}{" "}
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
                            {/* {userData.description} */}
                            {/* Test */}

                            <main>
                              <section>
                                <div className="container mx-auto px-4">
                                  <div className="flex flex-wrap">
                                    {!snippetData.length ? (
                                      <div>
                                        You do not appear to have created any
                                        snippet. Why don't you share a moment in
                                        your life from sidebar?
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
                                              // onClick={() => showPost(x._id)}
                                            >
                                              <a className="group relative block bg-gray-500">
                                                <img
                                                  alt="Failed to load image"
                                                  src={x.image}
                                                  className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                                                />
                                                <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                                                  <button
                                                    className="bg-transparent hover:bg-pink-500 text-white font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded w-full"
                                                    // onClick={handleDelete}
                                                    onClick={() =>
                                                      handleDelete(x._id)
                                                    }
                                                  >
                                                    Delete snippet
                                                  </button>
                                                </div>
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

                                              {/* <div className="relative flex flex-col min-w-0 break-words bg-blue-100 w-full mb-8 shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out">
                                            <img
                                              className="h-64 w-full object-cover rounded-lg"
                                              src={x.image}
                                              alt={x.title}
                                            />
                                            <div className="px-4 py-5 flex-auto">
                                              <h6 className="text-xl font-semibold">
                                                {x.title}
                                              </h6>
                                              <p className="mt-2 mb-4 text-blueGray-500">
                                                {x.caption}
                                              </p>
                                              <p className="mt-2 mb-4 text-blueGray-500">
                                                {x.like.length} likes
                                              </p>
                                              <p className="mt-2 mb-4 text-blueGray-400">
                                                {formattedDate}
                                              </p>
                                              <button
                                                className="bg-transparent hover:bg-blue-500 text-blue-700 font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded"
                                                onClick={()=>handleDelete(x._id)}
                                              >
                                                Delete snippet
                                              </button>
                                              <Toaster />
                                            </div>
                                          </div> */}
                                            </div>
                                          );
                                        })}
                                      </>
                                    )}
                                  </div>
                                </div>
                              </section>
                            </main>

                            {/* /Test */}
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
