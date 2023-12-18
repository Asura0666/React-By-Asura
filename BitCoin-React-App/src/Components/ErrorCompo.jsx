import React from "react";

const ErrorCompo = ({ message }) => {
  return (
    <div>
      <div className="error">404</div>
      {/* <br />
      <br /> */}
      <span className="info text-xl">{message}</span>
      <img
        src="http://images2.layoutsparks.com/1/160030/too-much-tv-static.gif"
        className="static"
      />
    </div>
  );
};

export default ErrorCompo;
