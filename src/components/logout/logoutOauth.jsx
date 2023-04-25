import React from "react";
import animationStore from "../../store/animationStore";
import userStore from "../../store/userStore";
import useWindowSize from "../../customHook/useWindowSize";

export default function LogoutOauth() {
  const { isHovered, setIsHovered } = animationStore();
  const { setLoginMethod } = userStore();
  const { height } = useWindowSize();

  const logout = () => {
    localStorage.removeItem("userToken");
    localStorage.removeItem("loginName");
    localStorage.removeItem("loginMethod");
    localStorage.removeItem("isLogged");
    setLoginMethod("none");
    window.location.reload(false);
    window.open(import.meta.env.VITE_PASSPORTLOGOUT_URL, "_self");
  };
  return (
    <>
      {height > 999 ? (
        <>
          <h3
            className={`mt-20 text-4xl font-semibold text-white cursor-pointer inline-block duration-300 ease-in-out ${
              isHovered ? "hover:underline" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={logout}
          >
            Logout Oauth
          </h3>
        </>
      ) : (
        <>
          <h3
            className={`mt-20 text-3xl font-semibold text-white cursor-pointer inline-block duration-300 ease-in-out ${
              isHovered ? "hover:underline" : ""
            }`}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
            onClick={logout}
          >
            Logout Oauth
          </h3>
        </>
      )}
    </>
  );
}
