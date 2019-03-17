import React from "react";
import { connect } from "react-redux";
import { fetchApartmentsList } from "./../actions/apartmentsListActions";
import ApartmentTileView from "./ApartmentTileView";
import SearchPage from "./SearchPage";

class HomeView extends React.Component {
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

  componentWillMount() {
    this.props.fetchApartmentsList();
  }

  filterBySize(apartmentList, start, end) {
    const filteredList = apartmentList.filter(data => {
      if (data.size >= start && data.size <= end) {
        return true;
      }
      return false;
    });
    console.log("FilteredSize", filteredList);
  }

  filterByPrice(apartmentList, start, end) {
    const filteredList = apartmentList.filter(data => {
      if (data.price >= start && data.price <= end) {
        return true;
      }
      return false;
    });
    console.log("FilteredPrice", filteredList);
  }

  filterByAmenities(apartmentList, selectedAmenities) {
    let filteredList = apartmentList.filter(data => {
      for (let i = 0; i < selectedAmenities.length; i++) {
        if (data.amenities.indexOf(selectedAmenities[i]) > -1) {
          return true;
        }
      }
      return false;
    });
    console.log("FilteredAmenities", filteredList);
  }

  filterByServices(apartmentList, selectedServices) {
    let filteredList = apartmentList.filter(data => {
      for (let i = 0; i < selectedServices.length; i++) {
        if (data.services.indexOf(selectedServices[i]) > -1) {
          return true;
        }
      }
      return false;
    });
    console.log("FilteredServices", filteredList);
  }

  filterByDetails(apartmentList, bedrooms, bathrooms, floor, rooms) {
    let filteredList = apartmentList.filter(data => {
      const details = data.details;
      if (
        details.bedrooms === bedrooms ||
        details.bathrooms === bathrooms ||
        details.floor === floor ||
        details.rooms === rooms
      ) {
        return true;
      }
      return false;
    });
    console.log("FilteredDetails", filteredList);
  }
  render() {
    let { apartmentsList } = this.props;
    let { filteredApartmentList } = this.state;

    if (!Object.keys(apartmentsList).length) {
      return <div>Loading...</div>;
    }

    let showApartmentList = apartmentsList.items;
    const sendApartmentList = apartmentsList.items;
    if (filteredApartmentList.length > 0) {
      showApartmentList = filteredApartmentList;
    }
    console.log("apartmentsList", showApartmentList);

    // this.filterBySize(apartmentsList.items, 0, 34);
    // this.filterByPrice(apartmentsList.items, 400, 700);
    // this.filterByAmenities(apartmentsList.items, ["cooker"]);
    // this.filterByServices(apartmentsList.items, ["fullFridge"]);
    // this.filterByDetails(apartmentsList.items, 0, 0, 7, 0);
    return (
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
    );
  }
}

const mapStateToProps = state => ({
  apartmentsList: state.apartmentsList.apartments
});

export default connect(
  mapStateToProps,
  { fetchApartmentsList }
)(HomeView);
