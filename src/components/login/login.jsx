import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userUrl } from "../../api/api";
import userStore from "../../store/userStore";
import signinStore from "../../store/signinStore";

export default function Login() {
  const Navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [userError, setUserError] = useState(false);
  const [incorrectPass, setIncorrectPass] = useState(false);
  const [block, setBlock] = useState(false);
  const [loading, setLoading] = useState(false);
  // const [checkbox, setCheckbox] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const { setUserName, setLoginMethod, setLogin } = userStore();
  const { setForgotPasswordForm } = signinStore();

  const userData = {
    email,
    password,
  };

  const github = () => {
    window.open(import.meta.env.VITE_GITHUB_URL, "_self");
    newWindow.addEventListener("unload", () => {
      window.location.reload(false);
    });
  };
  const google = () => {
    const newWindow = window.open(import.meta.env.VITE_GOOGLE_URL, "_self");
    newWindow.addEventListener("unload", () => {
      window.location.reload(false);
    });
  };

  const forgotPassword = () => {
    setForgotPasswordForm("mailPrompt");
  };

  const userSignIN = (e) => {
    e.preventDefault();
    setLoading(true)
    axios.post(`${userUrl}signIn`, userData).then((response) => {
      setLoading(false)
      if (response.data.user) {
        // setUserErr(false);
        if (!response.data.block) {
          setBlock(false);
          if (response.data.password) {
            setIncorrectPass(false);
            // document.cookie = `token=${response.data.token}`;
            localStorage.setItem("userToken", response.data.token);
            localStorage.setItem("loginName", response.data.name);
            setUserName(response.data.name);
            setLoginMethod("local");
            setLogin(true);
            localStorage.setItem("loginMethod", "local");
            localStorage.setItem("isLogged", true);
            window.location.reload(false);
            Navigate("/");
          } else {
            setIncorrectPass(true);
            setUserError(false);
            setBlock(false);
          }
        } else {
          setBlock(true);
          setUserError(false);
          setIncorrectPass(false);
          console.log("user is blocked");
        }
      } else {
        setUserError(true);
        setIncorrectPass(false);
        setBlock(false);
      }
    });
  };

  // const handleCheckbox = (event) => {
  //   if (event.target.checked) {
  //     // localStorage.setItem('remember', true)
  //   } else {
  //     // localStorage.setItem('remember', false)
  //   }
  //   setCheckbox((current) => !current);
  // };

  return (
    <>
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1510906594845-bc082582c8cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1144&q=80')",
              backgroundSize: "cover",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
                <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blue-600 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-white text-sm font-bold">
                        Sign in with
                      </h6>
                    </div>
                    <div className="btn-wrapper text-center">
                      <button
                        className="bg-blue-300 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 text-blue-900 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={github}
                      >
                        {/* <img
                          alt="..."
                          className="w-5 mr-1"
                          src={require("assets/img/github.svg").default}
                        /> */}
                        Github
                      </button>
                      <button
                        className="bg-blue-300 hover:bg-blue-500 active:bg-blue-800 active:text-blue-100 text-blue-900 font-normal px-4 py-2 rounded outline-none focus:outline-none mr-2 mb-1 uppercase shadow hover:shadow-md inline-flex items-center font-bold text-xs"
                        type="button"
                        style={{ transition: "all .15s ease" }}
                        onClick={google}
                      >
                        {/* <img 
                          alt="..."
                          className="w-5 mr-1"
                          src={require("assets/img/google.svg").default}
                        /> */}
                        Google
                      </button>
                    </div>
                    <hr className="mt-6 border-b-1 border-white" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <div className="text-white text-center mb-3 font-bold">
                      <small>Or sign in with credentials</small>
                    </div>
                    <form onSubmit={userSignIN}>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-white text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Email
                        </label>
                        <input
                          type="email"
                          className="border-0 px-3 py-3 placeholder-blue-300 text-white bg-blue-500 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Email"
                          style={{ transition: "all .15s ease" }}
                          onChange={(e) => setEmail(e.target.value)}
                          value={email}
                        />
                        {userError && (
                          <p className="text-white">
                            No such user exists or you are blocked
                          </p>
                        )}
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-white text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-blue-300 text-white bg-blue-500 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Password"
                          onChange={(e) => setPassword(e.target.value)}
                          value={password}
                          style={{ transition: "all .15s ease" }}
                        />
                        {incorrectPass && (
                          <p className="text-white">Incorrect Password</p>
                        )}
                      </div>
                      {/* <div>
                        <label className="inline-flex items-center cursor-pointer">
                          <input
                            id="customCheckLogin"
                            type="checkbox"
                            className="form-checkbox border-0 rounded text-blue-500 ml-1 w-5 h-5"
                            style={{ transition: "all .15s ease" }}
                            onChange={handleCheckbox}
                            value={checkbox}
                          />
                          <span className="ml-2 text-sm font-semibold text-gray-700">
                            Remember me
                          </span>
                        </label>
                      </div> */}

                      <div className="text-center mt-6">
                        {loading ? (
                          <button
                            className="bg-blue-900 text-white cursor-not-allowed text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                            style={{ transition: "all .15s ease" }}
                          >
                            Please wait
                          </button>
                        ) : (
                          <button
                            className="bg-blue-800 text-white active:bg-blue-900 hover:bg-blue-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                            type="submit"
                            style={{ transition: "all .15s ease" }}
                          >
                            Sign In
                          </button>
                        )}
                        {/* <button
                          className="bg-blue-800 text-white active:bg-blue-900 hover:bg-blue-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Sign In
                        </button> */}
                        {block && (
                          <p className="text-white">
                            You are blocked, please contact admin
                          </p>
                        )}
                      </div>
                    </form>
                    <div style={{ display: "flex" }}>
                      <div className="w-1/2">
                        <a
                          onClick={forgotPassword}
                          className={`text-white cursor-pointer ${
                            isHovered ? "hover:underline" : ""
                          }`}
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          <small>Forgot password?</small>
                        </a>
                      </div>
                      <div className="w-1/2 text-right">
                        <a
                          onClick={() => Navigate("/signup")}
                          className={`text-white cursor-pointer ${
                            isHovered ? "hover:underline" : ""
                          }`}
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          <small>Create new account</small>
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
