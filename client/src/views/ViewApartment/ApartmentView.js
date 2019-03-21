import React from "react";
import { fetchApartment } from "./../../actions/apartmentActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import Card from "antd/lib/card";
import TabPaneComponent from "./../Common/TabPane";
import Gallery from "./../utils/Gallery";
import Loader from "./../utils/Loader";

/**
 * Display Apartment View
 * @child of App.js on routes
 */

export class ApartmentView extends React.Component {
  componentWillMount() {
    const {
      match: { params }
    } = this.props;
    const { apartmentId } = params;
    this.props.fetchApartment(apartmentId);
  }

  render() {
    const { apartment } = this.props;
    if (!Object.keys(apartment).length) {
      return <Loader />;
    }
    return (
      <Card title={<div className="filterTitle">{apartment.title}</div>}>
        <div className="container-fl clearfix">
          <div className="col-12">
            <div className="view-apartment">
              <div className="view-apartment-item">
                <div className="_3im4pDXrDfzNRT2AlvLfD6">
                  <Gallery images={apartment.images} />
                  <div className="_3Ts2_4uirKsrlm2Qb57Avw" />
                  <div className="Ok22VaqPDW9x1uaR46cRO _3ORDzmMDnpzTXIIXjJsRw7 apartment-view-price">
                    <span>{apartment.price} €</span>
                    <span className="_17Hci6D5EewOTY42eIXhPy">
                      <span className="_2GcdOjvYR400SpIsNOxzGK">/</span>
                      <span> Monat</span>
                    </span>
                  </div>
                  <div className="listing-details-container title-display">
                    <div className="listing-details">
                      <div className="_3-hUUH6d0vGND3vUzaybD0 Lsdn2hC-tehVod76x4HzK">
                        <span className="text-truncate text-first-capitalize _1NES5HH5UNUjUVK5_-d-AG">
                          {apartment.title}
                        </span>
                      </div>
                    </div>
                  </div>
                  <TabPaneComponent apartment={apartment} />
                </div>
              </div>
            </div>
          </div>
        </div>
      </Card>
    );
  }
}

ApartmentView.propTypes = {
  apartment: PropTypes.object.isRequired
};

const mapStateToProps = state => ({
  apartment: state.apartmentItem.apartment
});

export default connect(
  mapStateToProps,
  { fetchApartment }
)(ApartmentView);
