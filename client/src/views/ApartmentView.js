import React from "react";
import { fetchApartment } from "../actions/apartmentActions";
import { connect } from "react-redux";
import PropTypes from "prop-types";
import ApartmentAmentityView from "./ApartmentAmentityView";

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
      return <div>Loading...</div>;
    }
    let image = "http://localhost:9000/images/apartments/";
    return (
      <div className="container-fl clearfix">
        <div className="col-12">
          <div className="view-apartment">
            <div className="view-apartment-item">
              <div className="view-apartment-item-content">
                <div className="_3im4pDXrDfzNRT2AlvLfD6">
                  <div className="listing-image">
                    <div className="row">
                      {apartment.images.map((data, index) => {
                        return (
                          <div className="col-md-6" keys={"index" + index}>
                            <img className="media-cover" src={image + data} />
                          </div>
                        );
                      })}
                    </div>
                    <div className="_3Ts2_4uirKsrlm2Qb57Avw" />
                    <div className="Ok22VaqPDW9x1uaR46cRO _3ORDzmMDnpzTXIIXjJsRw7 apartment-view-price">
                      <span>{apartment.price} €</span>
                      <span className="_17Hci6D5EewOTY42eIXhPy">
                        <span className="_2GcdOjvYR400SpIsNOxzGK">/</span>
                        <span>Monat</span>
                      </span>
                    </div>
                  </div>
                  <div className="listing-details-container title-display">
                    <div className="listing-details">
                      <div className="_3-hUUH6d0vGND3vUzaybD0 Lsdn2hC-tehVod76x4HzK">
                        <span className="text-truncate text-first-capitalize _1NES5HH5UNUjUVK5_-d-AG">
                          {apartment.title}
                        </span>
                      </div>
                      <div className="_17om8IEGFeu2W2TBOJ6xQs Lsdn2hC-tehVod76x4HzK text-truncate">
                        <span>{apartment.size} m²</span>
                      </div>
                      <div className="f9YmKwMaSOdtYnk_Qz-iT">
                        <div className="dVjtBg_ihJ63cZB8GwE0g text-truncate">
                          <ApartmentAmentityView
                            apartment={apartment}
                            limit="20"
                          />
                        </div>
                      </div>
                      <div className="_17om8IEGFeu2W2TBOJ6xQs Lsdn2hC-tehVod76x4HzK text-truncate">
                        <label>Owner:</label>&nbsp;
                        <span>{apartment.owner.profile.firstName}</span>&nbsp;
                        <span>{apartment.owner.profile.lastName}</span>
                        <div>
                          <label>Contact:</label>&nbsp;
                          <a
                            href={`mailto:${
                              apartment.owner.email
                            }?Subject=Hello,%20request%20for%20apartment`}
                            target="_top"
                          >
                            {apartment.owner.email}
                          </a>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

ApartmentView.propTypes = {
  fetchApartment: PropTypes.func.isRquired,
  apartment: PropTypes.array.isRequired
};

const mapStateToProps = state => ({
  apartment: state.apartmentItem.apartment
});

export default connect(
  mapStateToProps,
  { fetchApartment }
)(ApartmentView);
