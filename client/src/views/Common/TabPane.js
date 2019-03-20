import React, { Component } from "react";
import Tabs from "antd/lib/tabs";
import Card from "antd/lib/card";
import ApartmentAmentityView from "./../ViewApartment/ApartmentAmentityView";
import { IconMapping } from "./../utils/IconMapping";
import PropTypes from "prop-types";
const gridStyle = {
  width: "25%",
  textAlign: "center"
};

class TabPane extends Component {
  render() {
    const TabPane = Tabs.TabPane;
    const { apartment } = this.props;
    const details = Object.keys(apartment.details);
    return (
      <Card key={"HOLd" + new Date().getSeconds()}>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span className="icon-text">
                <i className="fas fa-tv tab-icon" />
                Amenities
              </span>
            }
            key="1"
          >
            <div className="dVjtBg_ihJ63cZB8GwE0g text-truncate icon-text">
              <ApartmentAmentityView
                apartment={apartment}
                limit="20"
                type="display"
              />
            </div>
          </TabPane>
          <TabPane
            tab={
              <span className="icon-text">
                <i class="far fa-money-bill-alt tab-icon" /> Price
              </span>
            }
            key="2"
          >
            <Card.Grid style={gridStyle}>
              <i className="fas fa-euro-sign tab-icon" />
              {apartment.price} / Month
            </Card.Grid>
          </TabPane>
          <TabPane
            tab={
              <span className="icon-text">
                <i className="fas fa-ruler-combined tab-icon" />
                Size
              </span>
            }
            key="3"
          >
            <Card.Grid style={gridStyle}>
              <i className="fas fa-ruler-combined tab-icon" />
              {apartment.size} m²
            </Card.Grid>
          </TabPane>

          <TabPane
            tab={
              <span className="icon-text">
                <i className="fas fa-concierge-bell tab-icon" />
                Services
              </span>
            }
            key="4"
          >
            <ul>
              {apartment.services.map((data, index) => {
                return (
                  <div
                    key={"index1" + index + new Date().getSeconds()}
                    className="icon-text"
                  >
                    <Card.Grid style={gridStyle}>
                      <i className={IconMapping[data]} />
                      {data}
                    </Card.Grid>
                  </div>
                );
              })}
            </ul>
          </TabPane>
          <TabPane
            tab={
              <span className="icon-text">
                <i className="fas fa-info-circle tab-icon" />
                Details
              </span>
            }
            key="5"
          >
            {details.map((data, index) => {
              if (data !== "__typename") {
                return (
                  <div
                    key={"index2" + index + new Date().getSeconds()}
                    className="icon-text"
                  >
                    <Card.Grid style={gridStyle}>
                      <i className={IconMapping[data]} />
                      {data}{" "}
                      <span className="detail-count">
                        = {apartment.details[data]}
                      </span>
                    </Card.Grid>
                  </div>
                );
              }
            })}
          </TabPane>
          <TabPane
            tab={
              <span className="icon-text">
                <i className="fas fa-user tab-icon" />
                Owner
              </span>
            }
            key="6"
          >
            <div className="_17om8IEGFeu2W2TBOJ6xQs Lsdn2hC-tehVod76x4HzK text-truncate">
              <label>
                <i className="fas fa-user tab-icon" />
                Owner:
              </label>
              &nbsp;
              <span>{apartment.owner.profile.firstName}</span>
              &nbsp;
              <span>{apartment.owner.profile.lastName}</span>
              <div>
                <label>
                  {" "}
                  <i className="fas fa-at tab-icon" />
                  Contact:
                </label>
                &nbsp;
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
          </TabPane>
        </Tabs>
      </Card>
    );
  }
}
TabPane.propTypes = {
  apartment: PropTypes.object.isRequired
};
export default TabPane;
