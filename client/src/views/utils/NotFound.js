import React from "react";
import { Link } from "react-router-dom";
/**
 * Display message of no apartment in filter
 */
export default () => {
  return (
    <div className="loc-not-found">
      <center>
        <h1 className="display-4">Location Not Found</h1>
        <h6>Sorry, We don't have apartments in this location.</h6>
        <Link to="/">
          <button className="btn btn-info">Home</button>
        </Link>
      </center>
    </div>
  );
};
