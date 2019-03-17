import React, { Component } from "react";
import {
  fetchLocationsList,
  fetchApartmentByLocation
} from "../actions/locationActions";
import { withRouter } from "react-router";
import { connect } from "react-redux";
import FilterBySlider from "./filtersComponents/FilterBySlider";
import FilterByCheckbox from "./filtersComponents/FilterByCheckbox";
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
    console.log("SearchQuer", this.state.searchQuery);

    const searchData = this.props.locations.location.filter(data => {
      if (data.title === this.state.searchQuery) return true;
    });
    console.log("QueryTime", searchData);
    if (searchData.length > 0) {
      locationName = searchData[0].title;
      locationId = searchData[0]._id;
    }
    this.props.history.push("/");
    setTimeout(() => {
      console.log("HOLA");
      this.props.history.push(`search/${locationName}/${locationId}`);
    });
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
            <FilterBySlider
              min={1}
              max={300}
              step={1}
              apartmentList={this.props.apartmentList}
              modifyApartmentList={this.modifyApartmentList}
              type="size"
              title="Size Range"
            />
            <FilterBySlider
              min={100}
              max={10000}
              step={100}
              type="price"
              apartmentList={this.props.apartmentList}
              modifyApartmentList={this.modifyApartmentList}
              title="Price Range"
            />
            <FilterByCheckbox
              type="amenities"
              checkboxes={[
                "television",
                "elevator",
                "fridge",
                "heating",
                "cooker",
                "microwave"
              ]}
              title="Amenities"
              apartmentList={this.props.apartmentList}
              modifyApartmentList={this.modifyApartmentList}
            />
            <FilterByCheckbox
              type="services"
              checkboxes={["concierge", "cleaning", "fullFridge", "laundry"]}
              title="Services"
              apartmentList={this.props.apartmentList}
              modifyApartmentList={this.modifyApartmentList}
            />
            <FilterByDetails
              details={["rooms", "bedrooms", "floor", "bathrooms"]}
              apartmentList={this.props.apartmentList}
              modifyApartmentList={this.modifyApartmentList}
            />
          </ul>
          <form className="form-inline my-2 my-lg-0">
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
              onClick={this.handleSubmit}
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
