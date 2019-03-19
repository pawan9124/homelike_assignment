import React from "react";
import { Spin } from "antd";

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
