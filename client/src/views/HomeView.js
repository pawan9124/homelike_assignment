import React from "react";
import { connect } from "react-redux";
import { fetchApartmentsList } from "./../actions/apartmentsListActions";
import ApartmentTileView from "./ApartmentTileView";
import SearchPage from "./SearchPage";

class HomeView extends React.Component {
  componentWillMount() {
    this.props.fetchApartmentsList();
  }

  render() {
    let { apartmentsList } = this.props;
    console.log("apartmentsList", apartmentsList);
    if (!Object.keys(apartmentsList).length) {
      return <div>Loading...</div>;
    }

    return (
      <div className="container-list container-lg clearfix">
        <SearchPage />
        <div className="col-12 float-left">
          <div className="view-apartment-list">
            {apartmentsList.items.map((item, index) => (
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
