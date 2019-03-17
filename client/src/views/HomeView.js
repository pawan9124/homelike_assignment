import React from "react";
import { connect } from "react-redux";
import { fetchApartmentsList } from "./../actions/apartmentsListActions";
import ApartmentTileView from "./ApartmentTileView";
import SearchPage from "./SearchPage";

class HomeView extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      filteredApartmentList: [],
      isFiltered: false
    };
    this.filterApartment = this.filterApartment.bind(this);
  }

  filterApartment(filteredApartments) {
    this.setState({
      filteredApartmentList: filteredApartments,
      isFiltered: true
    });
  }

  componentWillMount() {
    this.props.fetchApartmentsList();
  }

  render() {
    let { apartmentsList } = this.props;
    let { filteredApartmentList, isFiltered } = this.state;

    if (!Object.keys(apartmentsList).length) {
      return <div>Loading...</div>;
    }

    let showApartmentList = apartmentsList.items;
    const sendApartmentList = apartmentsList.items;
    //Check if the data is filtered
    if (filteredApartmentList.length > 0 && isFiltered) {
      showApartmentList = filteredApartmentList;
    }
    let returnApartment = (
      <div className="view-apartment-list">
        {showApartmentList.map((item, index) => (
          <ApartmentTileView key={index} apartment={item} />
        ))}
      </div>
    );
    if (filteredApartmentList.length === 0 && isFiltered) {
      returnApartment = <h3>Sorry, no apartments under your filter.</h3>;
    }
    console.log("apartmentsList", showApartmentList);

    return (
      <div className="container-list container-lg clearfix">
        <SearchPage
          apartmentList={sendApartmentList}
          filterApartment={this.filterApartment}
        />
        <div className="col-12 float-left">{returnApartment}</div>
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
