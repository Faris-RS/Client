import React from "react";
import { useNavigate } from "react-router-dom";
import Register from "../components/signup/register";
import Sidebar from "../components/sidebar/sidebar";

export default function RegisterPage() {
  // const Navigate = useNavigate();
  return (
    <>
      <Sidebar />
      <Register />
    </>
  );
}
