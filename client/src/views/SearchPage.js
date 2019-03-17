import React, { Component } from "react";
import {
  fetchLocationsList,
  fetchApartmentByLocation
} from "../actions/locationActions";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import FilterBySize from "./filtersComponents/FilterBySize";
import FilterByPrice from "./filtersComponents/FilterByPrice";
import FitlerByAmenities from "./filtersComponents/FitlerByAmenities";
import FilterByServices from "./filtersComponents/FilterByServices";
import FilterByDetails from "./filtersComponents/FilterByDetails";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationSuggestion: [],
      searchQuery: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.modifyApartmentList = this.modifyApartmentList.bind(this);
  }
  componentWillMount() {
    this.props.fetchLocationsList();
  }

  modifyApartmentList(filteredApartment) {
    console.log("filteredApartment", filteredApartment);
    this.props.filterApartment(filteredApartment);
  }

  handleSubmit(e) {
    e.preventDefault();
    let locationName = "NA";
    let locationId = "NA";
    const searchData = this.props.locations.location.filter(data => {
      if (data.title === this.state.searchQuery) return true;
    });
    if (searchData.length > 0) {
      locationName = searchData[0].title;
      locationId = searchData[0]._id;
    }
    this.props.history.push(`search/${locationName}/${locationId}`);
  }

  handleOnChange(e) {
    if (this.props.locations.location.length > 0) {
      let locationSuggestionHolder = this.props.locations.location.map(
        (data, index) => {
          return <option key={"options" + index} value={data.title} />;
        }
      );
      this.setState({
        locationSuggestion: locationSuggestionHolder,
        searchQuery: e.target.value
      });
    }
  }

  render() {
    return (
      <nav className="navbar navbar-expand-lg navbar-light bg-light">
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <FilterBySize
              min="10"
              max="100"
              step="10"
              apartmentList={this.props.apartmentList}
              modifyApartmentList={this.modifyApartmentList}
            />
            <FilterByPrice
              min="100"
              max="10000"
              step="100"
              apartmentList={this.props.apartmentList}
              modifyApartmentList={this.modifyApartmentList}
            />
            <FitlerByAmenities
              apartmentList={this.props.apartmentList}
              modifyApartmentList={this.modifyApartmentList}
            />
            <FilterByServices
              apartmentList={this.props.apartmentList}
              modifyApartmentList={this.modifyApartmentList}
            />
            <FilterByDetails
              apartmentList={this.props.apartmentList}
              modifyApartmentList={this.modifyApartmentList}
            />
          </ul>
          <form
            className="form-inline my-2 my-lg-0"
            onSubmit={this.handleSubmit}
          >
            <input
              className="form-control mr-sm-2"
              type="text"
              id="searchInput"
              placeholder="Search Location"
              style={{ outline: "none" }}
              onChange={this.handleOnChange}
              list="searchbox"
              name="searchbox"
            />
            <datalist id="searchbox">{this.state.locationSuggestion}</datalist>
            <button
              className="btn btn-outline-success my-2 my-sm-0"
              type="submit"
            >
              Search
            </button>
          </form>
        </div>
      </nav>
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
)(withRouter(SearchPage));
