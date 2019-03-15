import React, { Component } from "react";
import {
  fetchLocationsList,
  fetchApartmentByLocation
} from "../actions/locationActions";
import { withRouter } from "react-router";
import { connect } from "react-redux";

class SearchPage extends Component {
  constructor(props) {
    super(props);
    this.state = {
      locationSuggestion: [],
      searchQuery: ""
    };
    this.handleOnChange = this.handleOnChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
  }
  componentWillMount() {
    this.props.fetchLocationsList();
  }
  handleSubmit(e) {
    e.preventDefault();
    let locationName = "NA";
    let locationId = "NA";
    const searchData = this.props.locations.location.filter(data => {
      if (data.title === this.state.searchQuery) return true;
    });
    console.log("searchData", searchData);
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
        <a className="navbar-brand" href="#">
          Navbar
        </a>
        <button
          className="navbar-toggler"
          type="button"
          data-toggle="collapse"
          data-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>

        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="nav-item active">
              <a className="nav-link" href="#">
                Home <span className="sr-only">(current)</span>
              </a>
            </li>
            <li className="nav-item">
              <a className="nav-link" href="#">
                Link
              </a>
            </li>
            <li className="nav-item dropdown">
              <a
                className="nav-link dropdown-toggle"
                href="#"
                id="navbarDropdown"
                role="button"
                data-toggle="dropdown"
                aria-haspopup="true"
                aria-expanded="false"
              >
                Dropdown
              </a>
              <div className="dropdown-menu" aria-labelledby="navbarDropdown">
                <a className="dropdown-item" href="#">
                  Action
                </a>
                <a className="dropdown-item" href="#">
                  Another action
                </a>
                <div className="dropdown-divider" />
                <a className="dropdown-item" href="#">
                  Something else here
                </a>
              </div>
            </li>
            <li className="nav-item">
              <a
                className="nav-link disabled"
                href="#"
                tabIndex="-1"
                aria-disabled="true"
              >
                Disabled
              </a>
            </li>
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
