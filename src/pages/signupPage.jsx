import React from "react";
import Signup from "../components/signup/signupDetails";
import Sidebar from "../components/sidebar/sidebar";
import SignupOtp from "../components/signup/signupOtp";
import signinStore from "../store/signinStore";

export default function SignupPage() {
  const { signupForm } = signinStore();

  return (
    <>
      {/* <Header /> */}
      {/* <Sidebar /> */}
      <div>
        {signupForm === "contactDetails" && <Signup />}
        {signupForm === "otpVerification" && <SignupOtp />}
      </div>
    </>
  );
}
