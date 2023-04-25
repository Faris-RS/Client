import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { userUrl } from "../../api/api";
import signinStore from "../../store/signinStore";
import userdetailsStore from "../../store/userdetailsStore";

export default function ForgotPasswordOtp() {
  const [otp, setOtp] = useState("");
  const [otpError, setOtpError] = useState(false);
  const [isHovered, setIsHovered] = useState(false);

  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  const { setForgotPasswordForm } = signinStore();
  const { resetMail } = userdetailsStore();

  const data = {
    otp,
    email: resetMail,
  };

  useEffect(() => {
    const interval = setInterval(() => {
      if (seconds > 0) {
        setSeconds(seconds - 1);
      }
      if (seconds === 0) {
        if (minutes === 0) {
          clearInterval(interval);
        } else {
          setSeconds(59);
          setMinutes(minutes - 1);
        }
      }
    }, 1000);
    return () => {
      clearInterval(interval);
    };
  }, [seconds]);

  const forgotPassword = (e) => {
    e.preventDefault();
    axios.post(`${userUrl}forgotPasswordOtp`, data).then((response) => {
      if (response.data.status) {
        setOtpError(false);
        setForgotPasswordForm("pwReset");
      } else {
        setOtpError(true);
      }
    });
  };

  const resendOtp = () => {
    setMinutes(1);
    setSeconds(30);
    axios.post(`${userUrl}forgotPasswordResendOtp`, data);
  };

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
                      <h6 className="text-white text-sm font-bold">
                        Can you enter the OTP we sent to your mail?
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
                          OTP
                        </label>
                        <input
                          type="number"
                          className="border-0 px-3 py-3 placeholder-blue-300 text-white bg-blue-500 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Enter your otp"
                          style={{ transition: "all .15s ease" }}
                          required
                          name="otp"
                          value={otp}
                          onChange={(e) => setOtp(e.target.value)}
                        />
                      </div>
                      {otpError && <p className="text-danger">Incorrect OTP</p>}

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
                    {seconds > 0 || minutes > 0 ? (
                      <p className="text-white">
                        Time Remaining: {minutes < 10 ? `0${minutes}` : minutes}
                        :{seconds < 10 ? `0${seconds}` : seconds}
                      </p>
                    ) : (
                      <p
                        className={`text-white cursor-pointer ${
                          isHovered ? "hover:underline" : ""
                        }`}
                        onMouseEnter={() => setIsHovered(true)}
                        onMouseLeave={() => setIsHovered(false)}
                        onClick={resendOtp}
                      >
                        Resend Otp
                      </p>
                    )}
                  </div>
                </div>
                <div className="flex flex-wrap mt-6">
                  <div className="w-1/2">
                    <a
                      onClick={(e) => e.preventDefault()}
                      className={`text-white cursor-pointer ${
                        isHovered ? "hover:underline" : ""
                      }`}
                      onMouseEnter={() => setIsHovered(true)}
                      onMouseLeave={() => setIsHovered(false)}
                    >
                      <small>Back to login</small>
                    </a>
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
