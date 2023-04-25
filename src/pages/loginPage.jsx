import React, { useEffect } from "react";
import Sidebar from "../components/sidebar/sidebar";
import Login from "../components/login/login";
import ForgotPasswordMail from "../components/forgotPassword/forgotPasswordMail";
import ForgotPasswordOtp from "../components/forgotPassword/forgotPasswordOtp";
import NewPassword from "../components/forgotPassword/resetPassword";
import signinStore from "../store/signinStore";

export default function LoginPage() {
  const { forgotPasswordForm } = signinStore();

  return (
    <>
      {/* <Sidebar /> */}
      {forgotPasswordForm === "none" && <Login />}
      {forgotPasswordForm === "mailPrompt" && <ForgotPasswordMail />}
      {forgotPasswordForm === "otpPrompt" && <ForgotPasswordOtp />}
      {forgotPasswordForm === "pwReset" && <NewPassword />}
    </>
  );
}
