import React, { Component } from "react";
import {
  fetchLocationsList,
  fetchApartmentByLocation
} from "../actions/locationActions";
import { connect } from "react-redux";
import ApartmentTileView from "./ApartmentTileView";
import SearchPage from "./SearchPage";
import NotFound from "./common/NotFound";

class Locations extends Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredApartmentList: []
    };
    this.filterApartment = this.filterApartment.bind(this);
  }

  filterApartment(filteredApartments) {
    this.setState({ filteredApartmentList: filteredApartments });
  }

  componentDidMount() {
    if (this.props.match.params.locationId != "NA") {
      this.props.fetchApartmentByLocation(this.props.match.params.locationId);
    }
  }

  render() {
    const apartments = this.props.apartments.items;
    let { filteredApartmentList } = this.state;

    if (this.props.match.params.locationId === "NA") {
      return <NotFound />;
    }
    if (apartments === undefined) {
      return <div>Loading...</div>;
    }

    let showApartmentList = apartments;
    const sendApartmentList = apartments;
    if (filteredApartmentList.length > 0) {
      showApartmentList = filteredApartmentList;
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
          <SearchPage
            apartmentList={sendApartmentList}
            filterApartment={this.filterApartment}
          />
          <div className="col-12 float-left">
            <div className="view-apartment-list">
              {showApartmentList.map((item, index) => (
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
