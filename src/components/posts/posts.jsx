import React, { useEffect, useState } from "react";
import "./post.css";
import { postUrl } from "../../api/api";
import axios from "axios";
import PeopleModal from "./peopleModal";
import modalStore from "../../store/modalStore";

export default function Posts() {
  const [posts, setPosts] = useState([]);
  const [postDetail, setPostDetail] = useState("");
  const [showModal, setShowModal] = useState(false);
  const [userData, setUserData] = useState("");
  const [liked, setLiked] = useState(false);
  const [reported, setReported] = useState(false);
  const {
    showUserModal3,
    setShowUserModal3,
    setIfContact,
    setIfRequest,
    setIsUser,
  } = modalStore();
  const data = {
    token: localStorage.getItem("userToken"),
  };

  useEffect(() => {
    const getPosts = async () => {
      if (data.token != null) {
        await axios.post(`${postUrl}posts`, data).then((response) => {
          setPosts(response.data.data);
        });
      }
    };
    getPosts();
  }, []);

  const showPost = async (id) => {
    await axios.patch(`${postUrl}viewPost/${id}`, data).then((response) => {
      setPostDetail(response.data.data);
      setShowModal(true);
      if (response.data.liked === true) {
        setLiked(true);
      } else {
        setLiked(false);
      }
      if (response.data.report === true) {
        setReported(true);
      } else {
        setReported(false);
      }
    });
  };

  const showUser = async (id) => {
    await axios
      .get(`${postUrl}showPostUser/${id}/${data.token}`)
      .then((response) => {
        console.log(response.data);
        setUserData(response.data.data);
        if (response.status === 206) {
          setIsUser(true);
        }
        if (response.data.request === true) {
          setIfRequest(true);
        } else if (response.data.contact === true) {
          setIfContact(true);
        }
        setShowUserModal3(true);
      });
  };

  const likePost = async (id) => {
    await axios.patch(`${postUrl}likePost/${id}`, data).then((response) => {
      if (response.data.status) {
        setLiked(!liked);
      }
    });
  };

  const reportPost = async (id) => {
    await axios.patch(`${postUrl}reportPost/${id}`, data).then((response) => {
      if (response.data.status) {
        setReported(!reported);
      }
    });
  };

  return (
    <>
      <main>
        <section>
          <div className="container mx-auto px-4">
            <div className="flex flex-wrap">
              {!posts.length ? (
                <div>
                  There appears to be nothing to suggest now. Please check back
                  later.
                </div>
              ) : (
                <>
                  {posts.map((x) => {
                    return (
                      <div
                        className="lg:pt-12 pt-6 w-full md:w-4/12 px-4 text-center z-10"
                        key={x._id}
                        onClick={() => showPost(x._id)}
                      >
                        {/* <a className="group relative block bg-black">
                          <img
                            alt={x.title}
                            src={x.image}
                            className="absolute inset-0 h-full w-full object-cover opacity-75 transition-opacity group-hover:opacity-50"
                          />

                          <div className="relative p-4 sm:p-6 lg:p-8">
                            <p className="text-sm font-medium uppercase tracking-widest text-pink-500">
                              {x.userName}
                            </p>

                            <p className="text-xl font-bold text-white sm:text-2xl">
                              {x.title}
                            </p>

                            <div className="mt-32 sm:mt-48 lg:mt-64">
                              <div className="translate-y-8 transform opacity-0 transition-all group-hover:translate-y-0 group-hover:opacity-100">
                                <p className="text-sm text-white">
                                  {x.caption}
                                </p>
                              </div>
                            </div>
                          </div>
                        </a> */}

                        <a
                          className="relative block overflow-hidden bg-cover bg-center bg-no-repeat shadow-md rounded-lg hover:shadow-xl transition-shadow duration-300 ease-in-out"
                          style={{ backgroundImage: `url(${x.image})` }}
                        >
                          <div className="absolute inset-0 bg-black/25"></div>

                          <div className="relative flex items-start justify-between p-4 sm:p-6 lg:p-8">
                            <div className="sm:pt-18 pt-12 text-white lg:pt-24">
                              <h3 className="text-xl font-bold sm:text-2xl">
                                {x.title}
                              </h3>

                              <p className="text-sm">{x.userName}</p>
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
                            <h6 className="text-xl font-semibold">{x.title}</h6>
                            <p className="mt-2 mb-4 text-blueGray-500">
                              {x.caption}
                            </p>
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

      {showUserModal3 ? <PeopleModal data={userData} /> : null}

      {showModal && (
        <>
          <div className="fixed top-0 left-0 w-full h-full bg-black opacity-50 z-30"></div>
          <div className="justify-center items-center flex overflow-x-hidden overflow-y-auto fixed inset-0 z-40 outline-none focus:outline-none">
            {" "}
            <div className="relative w-auto my-6 mx-auto max-w-3xl">
              <div className="border-0 rounded-lg shadow-lg relative flex flex-col w-full bg-transparent outline-none focus:outline-none">
                <div className="flex items-start justify-between p-5 rounded-t"></div>
                <div className="relative p-0 flex-auto">
                  <div className="max-w-4xl flex items-center h-auto  flex-wrap mx-auto lg:my-0"></div>
                  <div className="test flex flex-col max-w-md p-6 bg-gray-600 text-gray-100">
                    <div style={{ textAlign: "right", marginTop: "-20px" }}>
                      <span className="block pb-2 text-sm text-gray-400 cursor-pointer">
                        {reported === true ? (
                          <span
                            className="border-b-2 border-transparent transition duration-300 hover:border-gray-400"
                            onClick={() => reportPost(postDetail._id)}
                          >
                            Snippet reported
                          </span>
                        ) : (
                          <span
                            className="border-b-2 border-transparent transition duration-300 hover:border-gray-400"
                            onClick={() => reportPost(postDetail._id)}
                          >
                            Report snippet
                          </span>
                        )}
                      </span>
                    </div>
                    <img
                      src={postDetail.image}
                      alt=""
                      className="flex-shrink-0 object-cover h-64 rounded-sm sm:h-96 dark:bg-gray-500 aspect-square"
                    />
                    <div key={liked}>
                      <div className="flex justify-between">
                        <h2 className="text-2xl font-semibold">
                          {postDetail.title}
                        </h2>
                        {liked === true && (
                          <span className="block pb-2 text-sm text-white cursor-pointer">
                            <span
                              className="border-b-2 border-transparent transition duration-300 hover:border-gray-400"
                              onClick={() => likePost(postDetail._id)}
                            >
                              Unlike
                            </span>
                          </span>
                        )}
                        {liked === false && (
                          <span className="block pb-2 text-sm text-white cursor-pointer">
                            <span
                              className="border-b-2 border-transparent transition duration-300 hover:border-gray-400"
                              onClick={() => likePost(postDetail._id)}
                            >
                              Like
                            </span>
                          </span>
                        )}
                      </div>
                      <span className="block pb-2 text-sm dark:text-gray-400 cursor-pointer">
                        <span
                          className="border-b-2 border-transparent transition duration-300 hover:border-gray-400"
                          onClick={() => showUser(postDetail._id)}
                        >
                          {postDetail.userName}
                        </span>
                      </span>
                      <p>{postDetail.caption}</p>
                    </div>
                  </div>
                </div>
                <button
                  className="bg-transparent hover:bg-gray-500 text-gray-200 font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded"
                  onClick={() => setShowModal(false)}
                >
                  Close snippet
                </button>
              </div>
            </div>
          </div>
        </>
      )}
    </>
  );
}
