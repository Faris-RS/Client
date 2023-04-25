import React, { useEffect, useState } from "react";
import userProfileStore from "../../store/userProfileStore";
import axios from "axios";
import { userUrl } from "../../api/api";
import Loading from "../loading/Loading";

export default function EditProfile() {
  const [userData, setUserData] = useState("");

  const { setUserProfile } = userProfileStore();

  const [phone, setPhone] = useState("");
  const [ogPhone, setOgPhone] = useState("");

  const [firstName, setFirstName] = useState("");
  const [ogFirstName, setOgFirstName] = useState("");

  const [lastName, setLastName] = useState("");
  const [ogLastName, setOgLastName] = useState("");

  const [location, setLocation] = useState("");
  const [ogLocation, setOgLocation] = useState("");

  const [facebook, setFacebook] = useState("");
  const [ogFacebook, setOgFacebook] = useState("");

  const [instagram, setInstagram] = useState("");
  const [ogInstagram, setOgInstagram] = useState("");

  const [twitter, setTwitter] = useState("");
  const [ogTwitter, setOgTwitter] = useState("");

  const [description, setDescription] = useState("");
  const [ogDescription, setOgDescription] = useState("");

  const [job, setJob] = useState("");
  const [ogJob, setOgJob] = useState("");

  const [image, setImage] = useState("");
  const [ogImage, setOgImage] = useState("");

  const [showImage, setShowImage] = useState(false);

  const [loading, setLoading] = useState(true);
  const [isLoading, setIsloading] = useState(false);

  useEffect(() => {
    const token = {
      token: localStorage.getItem("userToken"),
    };
    const getDetails = () => {
      axios.post(`${userUrl}getDetails`, token).then((response) => {
        setUserData(response.data.data);
      });
    };
    getDetails();
  }, []);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = () => {
        setFirstName(userData.firstName);
        setOgFirstName(userData.firstName);
        setLastName(userData.lastName);
        setOgLastName(userData.lastName);
        setFacebook(userData.facebook);
        setOgFacebook(userData.facebook);
        setInstagram(userData.instagram);
        setOgInstagram(userData.instagram);
        setTwitter(userData.twitter);
        setOgTwitter(userData.twitter);
        setDescription(userData.description);
        setOgDescription(userData.description);
        setPhone(userData.phone);
        setOgPhone(userData.phone);
        setLocation(userData.location);
        setOgLocation(userData.location);
        setJob(userData.job);
        setOgJob(userData.job);
        setImage(userData.image);
        setOgImage(userData.image);
        setLoading(false);
      };
      loader();
    }, 1000);
    return () => clearTimeout(timer);
  }, [userData]);

  const editedData = {
    firstName,
    lastName,
    facebook,
    instagram,
    twitter,
    description,
    phone,
    location,
    job,
    token: localStorage.getItem("userToken"),
  };

  const viewProfile = () => {
    setUserProfile("about");
  };

  const saveEdit = (e) => {
    setIsloading(true);
    e.preventDefault(e);
    if (
      firstName !== ogFirstName ||
      lastName !== ogLastName ||
      facebook !== ogFacebook ||
      instagram !== ogInstagram ||
      twitter !== ogTwitter ||
      description !== ogDescription ||
      location !== ogLocation ||
      phone !== ogPhone ||
      job !== ogJob ||
      image !== ogImage
    ) {
      let imageData;
      if (image !== ogImage) {
        const reader = new FileReader();
        reader.readAsDataURL(image);
        reader.onloadend = () => {
          imageData = reader.result;
          axios
            .post(`${userUrl}editProfile`, { imageData, editedData })
            .then((response) => {
              if (response.status) {
                setIsloading(false);
                setUserProfile("about");
              }
            });
        };
      } else {
        imageData = null
        axios
          .post(`${userUrl}editProfile`, { editedData })
          .then((response) => {
            if (response.status) {
              setIsloading(false);
              setUserProfile("about");
            }
          });
      }
    } else {
      setIsloading(false);
    }
    // if (image !== ogImage) {
    //   const reader = new FileReader();
    //   reader.readAsDataURL(image);
    //   reader.onloadend = () => {
    //     imageData = reader.result;
    //     axios
    //       .post(`${userUrl}editProfile`, { imageData, editedData })
    //       .then((response) => {
    //         if (response.status) {
    //           setIsloading(false);
    //           setUserProfile("about");
    //         }
    //       });
    //   };
    // } else {
    //   setIsloading(false);
    // }
  };

  return (
    <>
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
                    <form onSubmit={saveEdit}>
                      <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blueGray-100 border-0">
                        <div className="rounded-t bg-white mb-0 px-6 py-6">
                          <div className="text-center flex justify-between">
                            {/* <h6 className="text-blueGray-700 text-xl font-bold" onClick={viewProfile}>Go back</h6> */}
                            <button
                              className="bg-pink-500 active:bg-pink-600 uppercase text-white font-bold hover:shadow-md shadow text-xs px-4 py-2 rounded outline-none focus:outline-none sm:mr-2 mb-1"
                              type="button"
                              style={{ transition: "all .15s ease" }}
                              onClick={viewProfile}
                            >
                              Go back
                            </button>
                            {isLoading ? (
                              <button
                                className="bg-green-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150 cursor-not-allowed"
                                type="submit"
                                // onClick={saveEdit}
                              >
                                Saving...
                              </button>
                            ) : (
                              <button
                                className="bg-green-500 text-white active:bg-pink-600 font-bold uppercase text-xs px-4 py-2 rounded shadow hover:shadow-md outline-none focus:outline-none mr-1 ease-linear transition-all duration-150"
                                type="submit"
                                // onClick={saveEdit}
                              >
                                Save
                              </button>
                            )}
                          </div>
                        </div>
                        <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                          {/* <form onSubmit={saveEdit}> */}
                          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            User Information
                          </h6>
                          <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                  defaultValue={userData.firstName}
                                >
                                  First Name
                                </label>
                                <input
                                  type="text"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  required
                                  onChange={(e) => {
                                    const re = /^\s*$/;
                                    if (re.test(e.target.value)) {
                                      setFirstName("");
                                    } else {
                                      setFirstName(e.target.value);
                                    }
                                  }}
                                  value={firstName}
                                />
                              </div>
                            </div>
                            <div className="w-full lg:w-6/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  Last Name
                                </label>
                                <input
                                  type="text"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  onChange={(e) => {
                                    const re = /^\s*$/;
                                    if (re.test(e.target.value)) {
                                      setLastName("");
                                    } else {
                                      setLastName(e.target.value);
                                    }
                                  }}
                                  value={lastName}
                                  required
                                  // defaultValue={userData.lastName}
                                />
                              </div>
                            </div>
                            <div className="w-full px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  Job Title
                                </label>
                                <input
                                  type="text"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  onChange={(e) => {
                                    const re = /^\s*$/;
                                    if (re.test(e.target.value)) {
                                      setJob("");
                                    } else {
                                      setJob(e.target.value);
                                    }
                                  }}
                                  value={job}
                                  required
                                  // defaultValue={userData.lastName}
                                />
                              </div>
                            </div>
                          </div>

                          <hr className="mt-6 border-b-1 border-blueGray-300" />

                          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            Contact Information
                          </h6>
                          <div className="flex flex-wrap">
                            <div className="w-full lg:w-6/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  Phone Number
                                </label>
                                <input
                                  type="number"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  onChange={(e) => {
                                    const re = /^\s*$/;
                                    if (re.test(e.target.value)) {
                                      setPhone("");
                                    } else {
                                      setPhone(e.target.value);
                                    }
                                  }}
                                  value={phone}
                                  required
                                />
                              </div>
                            </div>

                            <div className="w-full lg:w-6/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  Location
                                </label>
                                <input
                                  type="text"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  required
                                  onChange={(e) => {
                                    const re = /^\s*$/;
                                    if (re.test(e.target.value)) {
                                      setLocation("");
                                    } else {
                                      setLocation(e.target.value);
                                    }
                                  }}
                                  value={location}
                                  // defaultValue={userData.location}
                                />
                              </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  Facebook name
                                </label>
                                <input
                                  type="text"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  onChange={(e) => {
                                    const re = /^\s*$/;
                                    if (re.test(e.target.value)) {
                                      setFacebook("");
                                    } else {
                                      setFacebook(e.target.value);
                                    }
                                  }}
                                  value={facebook}
                                  // defaultValue={userData.facebook}
                                />
                              </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  Instagram ID
                                </label>
                                <input
                                  type="text"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  onChange={(e) => {
                                    const re = /^\s*$/;
                                    if (re.test(e.target.value)) {
                                      setInstagram("");
                                    } else {
                                      setInstagram(e.target.value);
                                    }
                                  }}
                                  value={instagram}
                                  // defaultValue={userData.instagram}
                                />
                              </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  Twitter Handle
                                </label>
                                <input
                                  type="text"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  onChange={(e) => {
                                    const re = /^\s*$/;
                                    if (re.test(e.target.value)) {
                                      setTwitter("");
                                    } else {
                                      setTwitter(e.target.value);
                                    }
                                  }}
                                  value={twitter}
                                />
                              </div>
                            </div>
                            <div className="w-full lg:w-4/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  Profile Photo
                                </label>
                                <input
                                  type="file"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  // value={twitter}
                                  accept="image/*"
                                  onChange={(e) => {
                                    setImage(e.target.files[0]);
                                  }}
                                />
                              </div>
                            </div>
                            <div
                              className="mt-7 ml-5"
                              onClick={() => setShowImage(!showImage)}
                            >
                              Click here to view current profile picture
                            </div>
                            {showImage && (
                              <img
                                alt=""
                                src={userData.image}
                                className="shadow-xl h-72 w-72"
                              />
                            )}
                          </div>

                          <hr className="mt-6 border-b-1 border-blueGray-300" />

                          <h6 className="text-blueGray-400 text-sm mt-3 mb-6 font-bold uppercase">
                            About Me
                          </h6>
                          <div className="flex flex-wrap">
                            <div className="w-full lg:w-12/12 px-4">
                              <div className="relative w-full mb-3">
                                <label
                                  className="block uppercase text-blueGray-600 text-xs font-bold mb-2"
                                  htmlFor="grid-password"
                                >
                                  Please Describe about yourself
                                </label>
                                <textarea
                                  type="text"
                                  className="border-0 px-3 py-3 placeholder-blueGray-300 text-blueGray-600 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full ease-linear transition-all duration-150"
                                  rows="4"
                                  onChange={(e) => {
                                    const re = /^\s*$/;
                                    if (re.test(e.target.value)) {
                                      setDescription("");
                                    } else {
                                      setDescription(e.target.value);
                                    }
                                  }}
                                  value={description}
                                ></textarea>
                              </div>
                            </div>
                          </div>
                          {/* </form> */}
                        </div>
                      </div>
                    </form>
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
