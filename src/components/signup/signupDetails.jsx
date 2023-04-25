import React, { useEffect } from "react";
import { useState } from "react";
import axios from "axios";
import { parseISO, differenceInYears } from "date-fns";
import { userUrl } from "../../api/api";
import signinStore from "../../store/signinStore";
import userdetailsStore from "../../store/userdetailsStore";
import { useNavigate } from "react-router-dom";

export default function Signup() {
  const Navigate = useNavigate();
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [dob, setDob] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  //   const [gender, setGender] = useState("");
  const [isHovered, setIsHovered] = useState(false);

  const [userExist, setUserExist] = useState(false);
  const [isAgeValid, setIsAgeValid] = useState(false);

  const handleDateChange = (event) => {
    const userDate = parseISO(event.target.value);
    const now = new Date();
    const age = differenceInYears(now, userDate);

    if (age <= 21) {
      setDob(event.target.value);
      setIsAgeValid(false);
    } else {
      setDob(event.target.value);
      setIsAgeValid(true);
    }
  };

  const { setSignupForm } = signinStore();
  const {
    setEmails,
    setPhones,
    setFirstNames,
    setLastNames,
    setDobs,
    setPasswords,
    setConfirmPasswords,
  } = userdetailsStore();

  const userData = {
    phone,
    email,
    firstName,
    lastName,
    dob,
    password,
    confirmPassword,
    type: "local",
  };

  const sentOtp = (e) => {
    e.preventDefault();
    axios.post(`${userUrl}getOtp`, userData).then((response) => {
      if (response.data.status) {
        setUserExist(false);
        setEmails(email);
        setPhones(phone);
        setFirstNames(firstName);
        setLastNames(lastName);
        setDobs(dob);
        setPasswords(password);
        setConfirmPasswords(confirmPassword);
        setSignupForm("otpVerification");
      } else {
        setUserExist(true);
      }
    });
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
                        Hi! Can you give some details?
                      </h6>
                    </div>
                    <hr className="mt-6 border-b-1 border-white" />
                  </div>
                  <div className="flex-auto px-4 lg:px-10 py-10 pt-0">
                    <form onSubmit={sentOtp}>
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
                          required
                          value={email}
                          onChange={(e) => {
                            const re = /^\s*$/;
                            if (re.test(e.target.value)) {
                              setEmail("");
                            } else {
                              setEmail(e.target.value);
                            }
                          }}
                        />
                        {userExist && <label>Email already Exists</label>}
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-white text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Phone Number
                        </label>
                        <input
                          type="number"
                          className="border-0 px-3 py-3 placeholder-blue-300 text-white bg-blue-500 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Phone number"
                          style={{ transition: "all .15s ease" }}
                          pattern="^[7896][0-9]{9}$"
                          required
                          value={phone}
                          onChange={(e) => {
                            const inputVal = e.target.value;
                            // Remove all non-digit characters
                            const strippedVal = inputVal.replace(/\D/g, "");
                            // Limit to 10 digits
                            const limitedVal = strippedVal.slice(0, 10);
                            setPhone(limitedVal);

                            // Check for valid phone number
                            if (
                              limitedVal.length < 10 ||
                              limitedVal.length > 10
                            ) {
                              e.target.setCustomValidity(
                                "Phone number must be exactly 10 digits."
                              );
                            } else {
                              e.target.setCustomValidity("");
                            }
                          }}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-white text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          First Name
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blue-300 text-white bg-blue-500 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="First Name"
                          style={{ transition: "all .15s ease" }}
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

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-white text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Last Name
                        </label>
                        <input
                          type="text"
                          className="border-0 px-3 py-3 placeholder-blue-300 text-white bg-blue-500 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Last Name"
                          style={{ transition: "all .15s ease" }}
                          required
                          value={lastName}
                          onChange={(e) => {
                            const re = /^\s*$/;
                            if (re.test(e.target.value)) {
                              setLastName("");
                            } else {
                              setLastName(e.target.value);
                            }
                          }}
                        />
                      </div>

                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-white text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Date of Birth
                        </label>
                        <input
                          type="date"
                          className="border-0 px-3 py-3 placeholder-blue-300 text-white bg-blue-500 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder=""
                          style={{ transition: "all .15s ease" }}
                          required
                          onChange={handleDateChange}
                          value={dob}
                        />
                        {!isAgeValid && (
                          <label className="text-white">
                            You must be at least 21 years old to register.
                          </label>
                        )}
                      </div>
                      <br />
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
                          value={password}
                          pattern=".{8,}"
                          onChange={(e) => setPassword(e.target.value)}
                        />
                        {password.length < 8 ? (
                          <label className="text-white">
                            {" "}
                            Password should be atleast 8 letters in length
                          </label>
                        ) : null}
                      </div>
                      <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-white text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Confirm Password
                        </label>
                        <input
                          type="password"
                          className="border-0 px-3 py-3 placeholder-blue-300 text-white bg-blue-500 rounded text-sm shadow focus:outline-none focus:ring w-full"
                          placeholder="Confirm Password"
                          style={{ transition: "all .15s ease" }}
                          required
                          pattern=".{8,}"
                          value={confirmPassword}
                          onChange={(e) => setConfirmPassword(e.target.value)}
                        />
                        {password !== confirmPassword ? (
                          <label className="text-white">
                            {" "}
                            Password do not match
                          </label>
                        ) : null}
                      </div>

                      {/* <div className="relative w-full mb-3">
                        <label
                          className="block uppercase text-gray-700 text-xs font-bold mb-2"
                          htmlFor="grid-password"
                        >
                          Gender
                        </label>
                        <div style={{display:'flex'}} className="justify-around">
                        <input
                          type="radio"
                          name="gender"
                          className=""
                          placeholder=""
                        /> Male
                        <input
                          type="radio"
                          name="gender"
                          className=""
                          placeholder=""
                        /> Female
                        <input
                          type="radio"
                          name="gender"
                          className=""
                          placeholder=""
                        /> Other
                        </div>
                      </div> */}

                      <div className="text-center mt-6">
                        <button
                          className="bg-blue-800 text-white active:bg-blue-900 hover:bg-blue-400 text-sm font-bold uppercase px-6 py-3 rounded shadow hover:shadow-lg outline-none focus:outline-none mr-1 mb-1 w-full"
                          type="submit"
                          style={{ transition: "all .15s ease" }}
                        >
                          Continue
                        </button>
                      </div>
                      <div className="w-1/2">
                        <a
                          onClick={() => Navigate("/login")}
                          className={`text-white cursor-pointer ${
                            isHovered ? "hover:underline" : ""
                          }`}
                          onMouseEnter={() => setIsHovered(true)}
                          onMouseLeave={() => setIsHovered(false)}
                        >
                          <small>Already have an account?</small>
                        </a>
                      </div>
                    </form>
                  </div>
                </div>
                <div className="flex flex-wrap mt-6"></div>
              </div>
            </div>
          </div>
        </section>
      </main>
    </>
  );
}
