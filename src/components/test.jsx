import React from "react";
import useWindowSize from "../customHook/useWindowSize";

function Test() {
  const { height } = useWindowSize();

  return (
    <div>
      {/* visible only when window greater than 500px */}
      {height > 1000 && (
        <>
          <div role="button">
            <span>Testimonials</span>
          </div>
          <div role="button">
            <span>Price</span>
          </div>
          <div>
            <span role="button">
              Question?
            </span>
          </div>
        </>
      )}
      {/* visible at any window size */}
      <div>
        <span className="primary-button" role="button">
          Join Now
        </span>
      </div>
    </div>
  );
}

export default Test;
