import React from "react";
import { Link } from "react-router-dom";

export default () => {
  return (
    <div className="loc-not-found">
      <center>
        <h1 className="display-4">404 Not Found</h1>
        <h6>Sorry, url not found.</h6>
        <Link to="/">
          <span className="btn btn-info">Home</span>
        </Link>
      </center>
    </div>
  );
};
