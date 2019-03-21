import React from "react";
import { Link } from "react-router-dom";

/**
 * 404 message if url not found
 * @child of App.js as route
 */
export default () => {
  return (
    <div className="loc-not-found">
      <center>
        <h1 className="display-4">404 Not Found</h1>
        <h6>Sorry, url not found.</h6>
        <Link to="/">
          <button className="btn btn-info">Home</button>
        </Link>
      </center>
    </div>
  );
};
