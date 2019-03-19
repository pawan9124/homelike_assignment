import React, { Component } from "react";
import { Tabs, Card } from "antd";
import ApartmentAmentityView from "./ApartmentAmentityView";
import { IconMapping } from "./common/IconMapping";
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
      <Card>
        <Tabs defaultActiveKey="1">
          <TabPane
            tab={
              <span>
                <i class="fas fa-tv tab-icon" />
                Amenities
              </span>
            }
            key="1"
          >
            <div className="dVjtBg_ihJ63cZB8GwE0g text-truncate">
              <ApartmentAmentityView
                apartment={apartment}
                limit="20"
                type="display"
              />
            </div>
          </TabPane>
          <TabPane
            tab={
              <span>
                <i class="fas fa-ruler-combined tab-icon" />
                Size
              </span>
            }
            key="2"
          >
            <span>
              <i class="fas fa-ruler-combined tab-icon" />
              {apartment.size} m²
            </span>
          </TabPane>

          <TabPane
            tab={
              <span>
                <i class="fas fa-concierge-bell tab-icon" />
                Services
              </span>
            }
            key="3"
          >
            <ul>
              {apartment.services.map((data, index) => {
                return (
                  <Card.Grid keys={"index3" + index} style={gridStyle}>
                    <i className={IconMapping[data]} />
                    {data}
                  </Card.Grid>
                );
              })}
            </ul>
          </TabPane>
          <TabPane
            tab={
              <span>
                <i class="fas fa-info-circle tab-icon" />
                Details
              </span>
            }
            key="4"
          >
            {details.map((data, index) => {
              if (data !== "__typename") {
                return (
                  <Card.Grid keys={"index4" + index} style={gridStyle}>
                    <i className={IconMapping[data]} />
                    {data} {apartment.details[data]}
                  </Card.Grid>
                );
              }
            })}
          </TabPane>
          <TabPane
            tab={
              <span>
                <i class="fas fa-user tab-icon" />
                Owner
              </span>
            }
            key="5"
          >
            <div className="_17om8IEGFeu2W2TBOJ6xQs Lsdn2hC-tehVod76x4HzK text-truncate">
              <label>
                <i class="fas fa-user tab-icon" />
                Owner:
              </label>
              &nbsp;
              <span>{apartment.owner.profile.firstName}</span>
              &nbsp;
              <span>{apartment.owner.profile.lastName}</span>
              <div>
                <label>
                  {" "}
                  <i class="fas fa-at tab-icon" />
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
