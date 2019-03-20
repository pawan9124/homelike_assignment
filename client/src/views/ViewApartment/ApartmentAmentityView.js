import React from "react";
import PropTypes from "prop-types";
import { IconMapping } from "./../utils/IconMapping";
import { Card } from "antd";

const gridStyle = {
  width: "25%",
  textAlign: "center"
};

export default class ApartmentAmentityView extends React.Component {
  render() {
    let { apartment, limit = 3, type } = this.props;
    let amentities = [];
    if (type === "display") {
      apartment.amenities.map((item, index) => {
        if (index < limit) {
          amentities.push(
            <Card.Grid style={gridStyle} key={"display:" + index}>
              <i className={IconMapping[item]} />
              <span>{item}</span>
            </Card.Grid>
          );
        }
      });
    } else {
      apartment.amenities.map((item, index) => {
        if (index < limit) {
          amentities.push(
            <span className="_1h9l4w0vvX6d56ZnJ3NLod" key={"others:" + index}>
              <i className={IconMapping[item]} />
              <span>{item}</span>
            </span>
          );
        }
      });
    }
    return amentities;
  }
}

PropTypes.ApartmentAmentityView = {
  apartment: PropTypes.array.isRequired,
  limit: PropTypes.array.isRequireds
};
