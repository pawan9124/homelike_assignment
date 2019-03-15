import React, { Component } from "react";
import {
  fetchLocationsList,
  fetchApartmentByLocation
} from "../actions/locationActions";
import { connect } from "react-redux";
import ApartmentTileView from "./ApartmentTileView";

class Locations extends Component {
  componentWillMount() {
    if (this.props.match.params.locationId != "NA") {
      this.props.fetchApartmentByLocation(this.props.match.params.locationId);
    }
  }
  render() {
    console.log("Locations===>", this.props.apartments);
    const apartments = this.props.apartments.items;
    if (apartments === undefined) {
      return <div>Loading...</div>;
    }
    return (
      <div>
        <div className="apartment-header">
          <span className="apartment-count">{apartments.length}</span>&nbsp;
          <label>apartments available in </label> &nbsp;
          <span className="location-name">
            {this.props.match.params.location}
          </span>
        </div>
        <div className="container-list container-lg clearfix">
          <div className="col-12 float-left">
            <div className="view-apartment-list">
              {apartments.map((item, index) => (
                <ApartmentTileView key={index} apartment={item} />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }
}
const mapStateToProps = state => {
  return {
    locations: state.locationsList,
    apartments: state.apartmentsList.apartments
  };
};

export default connect(
  mapStateToProps,
  { fetchLocationsList, fetchApartmentByLocation }
)(Locations);
