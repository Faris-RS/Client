import React, { useState } from "react";
import toast, { Toaster } from "react-hot-toast";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faArrowLeft } from "@fortawesome/free-solid-svg-icons";
import { postUrl } from "../../api/api";
import postStore from "../../store/postStore";
import modalStore from "../../store/modalStore";
import axios from "axios";

export default function CreateSnippet() {
  const [isImageShown, setIsImageShown] = useState(false);
  const [image, setImage] = useState("");
  const [fileBaseKey, setFileBaseKey] = useState(0);
  const [isLoading, setIsLoading] = useState("");
  const { setNewPost, newPost } = postStore();
  const {
    isSnippet,
    setIsSnippet,
    setIsActive,
    isActive,
    setShowSidebar,
    showSidebar,
  } = modalStore();

  const [postData, setPostData] = useState({
    title: "",
    caption: "",
    selectedFile: "",
  });

  const token = localStorage.getItem("userToken");
  const formData = {
    postData,
    token,
  };

  const sendForm = (e) => {
    e.preventDefault();
    let imageData;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      imageData = reader.result;
      try {
        setIsLoading(true);
        axios
          .post(`${postUrl}createPost`, { imageData, formData })
          .then((response) => {
            if (response.data) {
              setIsLoading(false);
              setNewPost(!newPost);
              toast.success("Snippet created successfully!");
            } else {
              toast.error("Failed to create Snippet");
            }
          })
          .catch((error) => {
            setIsLoading(false);
            toast.error("An error occurred while creating the Snippet");
            console.error(error);
          });
      } catch (err) {
        console.error(err);
      }
    };
  };

  const clear = () => {
    setPostData({ title: "", caption: "", selectedFile: null });
    setFileBaseKey(fileBaseKey + 1);
    setIsImageShown(false);
    setImage(null);
  };

  const addSnippet = () => {
    setShowSidebar(!showSidebar);
    setIsSnippet(!isSnippet);
    setIsActive(!isActive);
  };

  return (
    <>
      <Toaster />

      <div
        className={`top-0 right-0 w-full sm:w-[35vw] bg-blue-600  p-10 md:pl-20 sm:pl-0 text-white fixed h-full z-40  ease-in-out duration-300 fixed ${
          isSnippet ? "translate-x-0 " : "translate-x-full"
        }`}
      >
        <div className="flex items-center mt-10">
          <h3
            className="text-4xl font-semibold text-white cursor-pointer hover:scale-125 duration-300 ease-in-out"
            onClick={addSnippet}
          >
            <FontAwesomeIcon icon={faArrowLeft} />
          </h3>
          <h3 className="ml-10 text-2xl font-semibold text-white">
            Snippet details
          </h3>
        </div>

        <form onSubmit={sendForm}>
          <h3 className="mt-16 text-xl font-semibold text-white">Title</h3>
          <input
            type="text"
            className="border-0 px-3 py-3 placeholder-blue-800 text-white bg-blue-500 rounded text-sm shadow focus:outline-none focus:ring w-full focus:shadow-xl hover:shadow-xl transition-shadow duration-300 ease-in-out"
            placeholder="Enter the title for your snippet"
            style={{ transition: "all .15s ease" }}
            required
            onChange={(e) =>
              setPostData({ ...postData, title: e.target.value })
            }
            value={postData.title}
          />
          <h3 className="mt-10 text-xl font-semibold text-white">Caption</h3>
          <input
            type="text"
            className="border-0 px-3 py-3 placeholder-blue-800 text-white bg-blue-500 rounded text-sm shadow focus:outline-none focus:ring w-full focus:shadow-xl hover:shadow-xl transition-shadow duration-300 ease-in-out"
            placeholder="Describe your snippet"
            required
            style={{ transition: "all .15s ease" }}
            onChange={(e) =>
              setPostData({
                ...postData,
                caption: e.target.value,
              })
            }
            value={postData.caption}
          />
          <h3 className="mt-10 text-xl font-semibold text-white">Image</h3>
          <input
            type="file"
            className="border-0 px-3 py-3 placeholder-blue-800 text-blue-800 bg-blue-500 rounded text-sm shadow focus:outline-none focus:ring w-full focus:shadow-xl hover:shadow-xl transition-shadow duration-300 ease-in-out"
            // value={twitter}
            accept="image/*"
            onChange={(e) => {
              setImage(e.target.files[0]);
            }}
            key={fileBaseKey}
          />
          <span
            onClick={() => setIsImageShown(!isImageShown)}
            className="border-b-2 border-transparent transition duration-300 text-blue-400 hover:border-blue-400 cursor-pointer"
          >
            View Image
          </span>{" "}
          {isImageShown && (
            <>
              {image ? (
                <img
                  src={URL.createObjectURL(image)}
                  alt="Selected file"
                  className="shadow-xl h-72 w-72 mt-8"
                />
              ) : (
                <p>Please select an image first</p>
              )}
            </>
          )}
          <br />
          <>
            {isLoading ? (
              <>
                <button
                  className={`mt-4 text-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded focus:shadow-xl hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-not-allowed`}
                  type="submit"
                >
                  Creating Snippet...
                </button>
              </>
            ) : (
              <>
                {isImageShown !== true && (
                  <button
                    className={`mt-4 text-xl bg-blue-500 hover:bg-blue-400 text-white font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded focus:shadow-xl hover:shadow-xl transition-shadow duration-300 ease-in-out`}
                    type="submit"
                  >
                    Create Snippet
                  </button>
                )}
              </>
            )}{" "}
          </>
          <br />
          <>
            {isLoading ? (
              <button
                className="mt-2 text-xl font-semibold bg-blue-500 hover:bg-blue-400 text-white font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded focus:shadow-xl hover:shadow-xl transition-shadow duration-300 ease-in-out cursor-not-allowed"
                onClick={clear}
              >
                Clear Form
              </button>
            ) : (
              <>
                {isImageShown !== true && (
                  <button
                    className="mt-2 text-xl font-semibold bg-blue-500 hover:bg-blue-400 text-white font-semibold hover:text-white py-2 px-4 hover:border-transparent rounded focus:shadow-xl hover:shadow-xl transition-shadow duration-300 ease-in-out"
                    onClick={clear}
                  >
                    Clear Form
                  </button>
                )}
              </>
            )}
          </>
        </form>
      </div>
    </>
  );
}
