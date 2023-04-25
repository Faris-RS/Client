import React from "react";
import animationStore from "../../store/animationStore";
import userStore from "../../store/userStore";
import { useNavigate } from "react-router-dom";

export default function LogoutLocal() {
  const Navigate = useNavigate();

  const { isHovered, setIsHovered } = animationStore();
  const { setLoginMethod } = userStore();
  const logoutLocal = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("loginName");
    localStorage.removeItem("loginMethod");
    localStorage.removeItem("isLogged");
    setLoginMethod("none");
    // document.cookie =
    //   "session =; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
    window.location.reload(false);
    Navigate("/login");
  };

  return (
    <>
      <h3
        className={`mt-10 text-3xl font-semibold text-white cursor-pointer inline-block duration-300 ease-in-out ${
          isHovered ? "hover:underline" : ""
        }`}
        onMouseEnter={() => setIsHovered(true)}
        onMouseLeave={() => setIsHovered(false)}
        onClick={logoutLocal}
      >
        Logout locally
      </h3>
    </>
  );
}
