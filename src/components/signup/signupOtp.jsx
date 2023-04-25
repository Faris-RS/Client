import React from "react";
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { userUrl } from "../../api/api";
import userdetailsStore from "../../store/userdetailsStore";
import signinStore from "../../store/signinStore";

export default function SignupOtp() {
  const [otp, setOtp] = useState("");
  const [otpErr, setOtpErr] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [minutes, setMinutes] = useState(1);
  const [seconds, setSeconds] = useState(30);

  const Navigate = useNavigate();

  const { email, phone, lastName, firstName, dob, password, confirmPassword } =
    userdetailsStore();

  const { setSignupForm } = signinStore();

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

  const userData = {
    phone,
    email,
    firstName,
    lastName,
    dob,
    password,
    confirmPassword,
  };

  const verifyOtpAndSignUp = (e) => {
    e.preventDefault();
    axios.post(`${userUrl}signUp`, { otp, userData }).then((response) => {
      if (response.data.status) {
        setOtpErr(false);
        setSignupForm("contactDetails");
        Navigate("/Login");
      } else {
        setOtpErr(true);
      }
    });
  };

  const resendOtp = () => {
    setMinutes(1);
    setSeconds(30);
    axios.post(`${userUrl}resendOtp`, { email })
  };

  // const handleClick = () => {
  //   setX('moreDetails');
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
                        Can you enter the OTP sent to your mail?
                      </h6>
                    </div>
                    <hr className="mt-6 border-b-1 border-white" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={verifyOtpAndSignUp}>
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
                          placeholder="OTP"
                          style={{ transition: "all .15s ease" }}
                          onChange={(e) => setOtp(e.target.value)}
                          value={otp}
                        />
                        {otpErr && <p className="text-white">Incorrect Otp</p>}
                      </div>
                      <div className="text-center mt-6">
                        <button
                          className="bg-blue-800 text-white active:bg-blue-900 hover:bg-blue-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Verify OTP
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
                    <div className="w-1/2">
                      {/* <a
                        onClick={(e) => e.preventDefault()}
                        className="text-black-300"
                      >
                        Already have an account?
                      </a> */}
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
