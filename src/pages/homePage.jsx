import React, { useState, useEffect, Suspense } from "react";
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faAngleUp, faAngleDown } from '@fortawesome/free-solid-svg-icons';
import Header from "../components/header/header";
import Sidebar from "../components/sidebar/sidebar";
const Posts = React.lazy(() => import("../components/posts/posts"));
const People = React.lazy(() => import("../components/posts/people"));
import Loading from "../components/loading/Loading";
import Waiting from "../components/loading/waiting";
import Error1 from "../components/error/error1";

export default function HomePage() {
  const [loading, setLoading] = useState(true);
  const [peopleHidden, setPeopleHidden] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => {
      const loader = async () => {
        setLoading(false);
      };
      loader();
    }, 1000);
    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Sidebar />
      <Header />
      <div className="flex flex-row justify-between items-center py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5">
        <h1 className="font-bold text-4xl text-gray-800 mb-12 mt-12">
          People you may know..
        </h1>
        {peopleHidden ? (
          <h3 className="cursor-pointer" onClick={() => setPeopleHidden(false)}>
            <FontAwesomeIcon icon={faAngleDown} size="2xl"/>
          </h3>
        ) : (
          <h3 className="cursor-pointer" onClick={() => setPeopleHidden(true)}>
             <FontAwesomeIcon icon={faAngleUp} size="2xl" />
          </h3>
        )}
      </div>
      {peopleHidden === false && (
        <Suspense fallback={<Waiting />}>
          <People />
        </Suspense>
      )}

      <h1 className="flex py-5 lg:px-20 md:px-10 px-5 lg:mx-40 md:mx-20 mx-5 font-bold text-4xl text-gray-800 mb-12 mt-12">
        Discover..
      </h1>

      {/* <Error1> */}
      <Suspense fallback={<Waiting />}>
        <Posts />
      </Suspense>
      {/* </Error1> */}
    </>
  );
}
