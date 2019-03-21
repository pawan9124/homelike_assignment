import React from "react";
/**
 * Loader component
 */
export default () => {
  return (
    <div id="loading">
      <img
        id="loading-image"
        src={require("../../../public/img/Preloader.gif")}
      />
    </div>
  );
};
