import React from "react";
import { useState } from "react";
import axios from "axios";
import { userUrl } from "../../api/api";
import signinStore from "../../store/signinStore";
import userdetailsStore from "../../store/userdetailsStore";

export default function NewPassword() {
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [pwError, setPwError] = useState(false);

  const { setForgotPasswordForm } = signinStore();
  const { resetMail } = userdetailsStore();

  const userData = {
    email: resetMail,
    password,
  };

  const forgotPassword = (e) => {
    e.preventDefault();
    axios.post(`${userUrl}resetPassword`, userData).then((response) => {
      if (response.data.status) {
        setPwError(false);
        setForgotPasswordForm("none");
      } else {
        setPwError(true);
      }
    });
  };

  // const forgotPassword = () => {
  //   setForgotPasswordForm('otpPrompt')
  // }

  return (
    <>
      <main>
        <section className="absolute w-full h-full">
          <div
            className="absolute top-0 w-full h-full bg-gray-900"
            style={{
              backgroundImage:
                "url('https://images.unsplash.com/photo-1510906594845-bc082582c8cc?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1144&q=80')",
              backgroundSize: "100%",
              backgroundRepeat: "no-repeat",
            }}
          ></div>
          <div className="container mx-auto px-4 h-full">
            <div className="flex content-center items-center justify-center h-full">
              <div className="w-full lg:w-4/12 px-4">
              <div className="relative flex flex-col min-w-0 break-words w-full mb-6 shadow-lg rounded-lg bg-blue-600 border-0">
                  <div className="rounded-t mb-0 px-6 py-6">
                    <div className="text-center mb-3">
                      <h6 className="text-gray-600 text-sm font-bold">
                        Please enter your new password
                      </h6>
                    </div>
                    <hr className="mt-6 border-b-1 border-white" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={forgotPassword}>
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
                          style={{ transition: "all .15s ease" }}
                          required
                          pattern=".{8,}"
                          value={password}
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {pwError && (
                          <p className="text-danger">
                            Please don't use your previous password
                          </p>
                        )}
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="border-0 px-3 py-3 placeholder-blue-300 text-white bg-blue-500 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          htmlFor="grid-password"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-gray-400 text-gray-700 bg-white rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Confirm Password"
                          style={{ transition: "all .15s ease" }}
                          required
                          pattern=".{8,}"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {password.length < 8 ? (
                          <label>
                            Password should be atleast 8 letters in length
                          </label>
                        ) : null}
                        {password !== confirmPassword && (
                          <p className="text-white">Passwords do not match</p>
                        )}
                      </div>

                      <div className="text-center mt-6">
                        <button
                          className="bg-blue-800 text-white active:bg-blue-900 hover:bg-blue-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Continue
                        </button>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6">
                  <div className="w-1/2">
                    {/* <a
                      onClick={(e) => e.preventDefault()}
                      className="text-gray-300"
                    >
                      <small>Back to login</small>
                    </a> */}
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
