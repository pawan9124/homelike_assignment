import React, { Component } from "react";
import { fetchApartmentByLocation } from "./../../actions/locationActions";
import { connect } from "react-redux";
import NotFound from "./../utils/NotFound";
import DisplayApartments from "./../Common/DisplayApartments";
import PropTypes from "prop-types";
import Loader from "./../utils/Loader";
/**
 * Locations Provide list of apartments according to location search
 * @child of App.js as route
 */
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
      return <Loader />;
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
