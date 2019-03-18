import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchPage from "./SearchPage";
import ApartmentTileView from "./ApartmentTileView";

class DisplayApartments extends Component {
  state = {
    filteredApartmentList: [],
    isFiltered: false
  };

  /**
   *This function return apartments based on filtering
   */
  filterApartment = filteredApartmentList => {
    this.setState({ filteredApartmentList, isFiltered: true });
  };
  render() {
    let showApartmentList = this.props.apartments; // to display apartments
    const sendApartmentList = this.props.apartments; // to send copy of the apartment for filtering
    const { filteredApartmentList, isFiltered } = this.state;

    //to check if filtered apartment list have apartments
    if (filteredApartmentList.length > 0 && isFiltered) {
      showApartmentList = filteredApartmentList;
    }

    //According to filter result show apartment
    let returnApartment = (
      <div className="row">
        {showApartmentList.map((item, index) => (
          <ApartmentTileView key={index} apartment={item} />
        ))}
      </div>
    );
    //If filters don't show result
    if (filteredApartmentList.length === 0 && isFiltered) {
      returnApartment = <h3>Sorry, no apartments under your filter.</h3>;
    }
    return (
      <div className="container-list container-lg clearfix">
        <SearchPage
          apartmentList={sendApartmentList}
          filterApartment={this.filterApartment}
        />
        <div className="col-12 float-left">
          <div className="apartment-header mt-4">
            {showApartmentList.length != 0 &&
            isFiltered === false &&
            this.props.type === "location" ? (
              <h4>
                <span className="apartment-count">
                  {showApartmentList.length}
                </span>
                &nbsp;
                <label>apartments available in </label> &nbsp;
                <span className="location-name">
                  {this.props.match.params.location}
                </span>
              </h4>
            ) : null}
          </div>
          {returnApartment}
        </div>
      </div>
    );
  }
}

DisplayApartments.propTypes = {
  apartments: PropTypes.array.isRequired
};

export default DisplayApartments;
