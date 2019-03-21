import React, { Component } from "react";
import PropTypes from "prop-types";
import SearchPage from "./SearchPage";
import ApartmentTileView from "./../ViewApartment/ApartmentTileView";

/**
 * Display apartment component
 * @child of HomePage and SearchLocation
 */

class DisplayApartments extends Component {
  state = {
    size: { list: [], isActive: false },
    price: { list: [], isActive: false },
    amenities: { list: [], isActive: false },
    services: { list: [], isActive: false },
    details: { list: [], isActive: false },
    filterType: ""
  };

  /**
   *This function return apartments based on filtering
   */
  filterApartment = (filteredApartmentList, type, isActive, setCurrentType) => {
    this.setState({
      [type]: { list: filteredApartmentList, isActive: isActive },
      filterType: setCurrentType
    });
  };
  render() {
    let filterState = this.state;
    let keys = Object.keys(filterState);
    let { filterType } = this.state;
    let filteredApartmentList = this.props.apartments; //initialize the apartment
    let isActive = false;
    let filter = "";

    //check if any filter is active then show data
    for (let i = 0; i < keys.length; i++) {
      if (keys[i] !== "filterType") {
        if (filterState[keys[i]].isActive) {
          //Check the current filter is active of type
          if (filterType !== "") {
            filteredApartmentList = filterState[filterType].list;
            isActive = filterState[filterType].isActive;
            filter = filterType;
          } else {
            //fallback to the previous filters
            filteredApartmentList = filterState[keys[i]].list;
            isActive = filterState[keys[i]].isActive;
            filter = keys[i];
          }
        }
      }
    }
    //According to filter result show apartment
    let returnApartment = (
      <div className="row">
        {filteredApartmentList.map((item, index) => (
          <ApartmentTileView key={index} apartment={item} type="home" />
        ))}
      </div>
    );
    //If filters don't show result
    if (filteredApartmentList.length === 0 && isActive) {
      returnApartment = <h3>Sorry, no apartments under your filter.</h3>;
    }
    return (
      <div className="container-list container-lg clearfix">
        <SearchPage
          apartmentList={filteredApartmentList}
          filterApartment={this.filterApartment}
        />
        <div className="col-12 float-left">
          <div className="apartment-header mt-4" id="apartment-header">
            {this.props.match != undefined && this.props.type === "location" ? (
              <div>
                {isActive === false && (
                  <h6>
                    <span className="apartment-count">
                      {filteredApartmentList.length}
                    </span>
                    &nbsp;
                    <label>apartments available in </label> &nbsp;
                    <span className="location-name">
                      {this.props.match.params.location}
                    </span>
                  </h6>
                )}
                <span className="show-location-name pull-right">
                  <i className="fas fa-globe-europe tab-icon" />
                  {this.props.match.params.location}
                </span>
              </div>
            ) : null}
          </div>
          <div className="filter-apartmentList">
            {isActive === true && (
              <div>
                <h6>
                  Showing &nbsp;
                  <span className="apartment-count">
                    {filteredApartmentList.length}
                  </span>
                  <span> of </span>
                  {this.props.apartments.length} apartments based on filter{" "}
                  <span className="filter-type">{filter}</span>
                </h6>
              </div>
            )}
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
