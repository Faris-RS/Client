import React, { useState } from "react";
import axios from "axios";
import { postUrl } from "../../api/api";
import FileBase from "react-file-base64";

export default function CreateSnippet() {
  const [postData, setPostData] = useState({
    title: "",
    caption: "",
    selectedFile: "",
  });
  const [image, setImage] = useState("");
  const [fileBaseKey, setFileBaseKey] = useState(0);
  const token = localStorage.getItem("userToken");
  const formData = {
    postData,
    token,
  };

  const clear = () => {
    setPostData({ title: "", caption: "", selectedFile: null });
    setFileBaseKey(fileBaseKey + 1);
  };

  const sendForm = (e) => {
    e.preventDefault();
    let imageData;
    const reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onloadend = () => {
      imageData = reader.result;
      try {
        axios
          .post(`${postUrl}createPost`, { imageData, formData })
          .then((response) => {
            if (response.data) {
            } else {
            }
          });
      } catch (err) {
        console.error(err);
      }
    };
  };
  return (
    <>
      <main>
        <section className="absolute w-full h-full">
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-gray-300 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Create a snippet
                      </h6>
                    </div>
                    <hr className="mt-6 border-b-1 border-gray-400" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={sendForm}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Title
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Enter the title for your snippet"
                          style={{ transition: "all .15s ease" }}
                          required
                          onChange={(e) =>
                            setPostData({ ...postData, title: e.target.value })
                          }
                          value={postData.title}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Caption
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
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
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Image
                        </label>
                        {/* <FileBase
                          required
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          type="file"
                          multiple={false}
                          onDone={({ base64 }) =>
                            setPostData({ ...postData, selectedFile: base64 })
                          }
                          key={fileBaseKey}
                        /> */}
                        <input
                          type="file"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          // value={twitter}
                          accept="image/*"
                          onChange={(e) => {
                            setImage(e.target.files[0]);
                          }}
                          key={fileBaseKey}
                        />
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-gray-900 text-white active:bg-gray-700 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Create Snippet
                        </button>
                      </div>
                    </form>
                    <div style={{ display: "flex" }}>
                      <div className="w-1/2">
                        <a
                          className="text-white-900 cursor-pointer"
                          onClick={clear}
                        >
                          <small>Clear fields</small>
                        </a>
                      </div>
                      <div className="w-1/2 text-right">
                        <a className="text-white-900 cursor-pointer">
                          <small>Close</small>
                        </a>
                      </div>
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
