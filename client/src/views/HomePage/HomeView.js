import React from "react";
import { connect } from "react-redux";
import { fetchApartmentsList } from "./../../actions/apartmentsListActions";
import PropTypes from "prop-types";
import DisplayApartments from "./../Common/DisplayApartments";
import Loader from "./../utils/Loader";
/**
 * Landing page of apartments and filters
 * @child of App.js
 */
class HomeView extends React.Component {
  /**
   * Refactored to component did mount
   */
  componentDidMount() {
    this.props.fetchApartmentsList();
  }

  render() {
    let { apartmentsList } = this.props;

    //loading the apartments
    if (!Object.keys(apartmentsList).length) {
      return <Loader />;
    }

    return (
      <div>
        <DisplayApartments apartments={apartmentsList.items} type="home" />
      </div>
    );
  }
}
/**
 * Refactored:- added prop types
 */
HomeView.propTypes = {
  fetchApartmentsList: PropTypes.func.isRequired
};

const mapStateToProps = state => ({
  apartmentsList: state.apartmentsList.apartments
});

export default connect(
  mapStateToProps,
  { fetchApartmentsList }
)(HomeView);
