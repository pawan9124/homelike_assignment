import React, { Component } from "react";
import { fetchApartmentByLocation } from "../actions/locationActions";
import { connect } from "react-redux";
import NotFound from "./common/NotFound";
import DisplayApartments from "./DisplayApartments";
import PropTypes from "prop-types";

class Locations extends Component {
  /**
   * Match if location id is not present
   */
  componentDidMount() {
    if (this.props.match.params.locationId != "NA") {
      this.props.fetchApartmentByLocation(this.props.match.params.locationId);
    }
  }

  render() {
    const apartments = this.props.apartments.items;
    const props = this.props;

    if (this.props.match.params.locationId === "NA") {
      return <NotFound />; //if no id found display notfound page
    }
    if (apartments === undefined) {
      return <div>Loading...</div>;
    }

    return (
      <div>
        <DisplayApartments {...props} apartments={apartments} type="location" />
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    apartments: state.apartmentsList.apartments
  };
};
Locations.propTypes = {
  fetchApartmentByLocation: PropTypes.func.isRequired
};
export default connect(
  mapStateToProps,
  { fetchApartmentByLocation }
)(Locations);
