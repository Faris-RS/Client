import React from "react";
import { useEffect, useState } from "react";
import userStore from "../../store/userStore";

export default function Header() {
  const { userName } = userStore();
  const [loginName, setLoginName] = useState();

  // Responsible for displaying locally authenticated userName
  // oath display name is handled by passport and zustand
  // local login had a bit of issue, so this is the temporary workaround.
  useEffect(() => {
    const ameen = () => {
      setLoginName(userName);
    };
    ameen();
  }, []);

  return (
    <>
      <div className="relative pt-16 pb-32 flex content-center items-center justify-center min-h-screen-75">
        <div
          className="absolute top-0 w-full h-full bg-center bg-cover -mt-1 h-full"
          style={{
            backgroundImage:
              "url('https://images.unsplash.com/photo-1513279922550-250c2129b13a?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1170&q=80')",
          }}
        >
          <span
            id="blackOverlay"
            className="w-full h-full absolute opacity-75 bg-black"
          ></span>
        </div>
        <div className="container relative mx-auto">
          <div className="items-center flex flex-wrap">
            <div className="w-full lg:w-6/12 px-4 ml-auto mr-auto text-center">
              <div className="pr-12">
                <h1 className="text-white font-semibold text-5xl">
                  Hello {loginName ? loginName : userName ? userName : null}
                </h1>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
