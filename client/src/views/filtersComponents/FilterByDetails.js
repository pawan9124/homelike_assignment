import React from "react";
import { Button, Popover } from "antd";

const ButtonGroup = Button.Group;

class FitlerByDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: 1,
      bedrooms: 1,
      floor: 1,
      bathrooms: 1
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterByDetails = this.filterByDetails.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  filterByDetails() {
    const apartmentList = this.props.apartmentList;
    const details = this.state;
    console.log("DETAILS", details, apartmentList);

    let filteredList = apartmentList.filter(data => {
      let returnCheck = false;
      if (
        data.details.rooms === details.rooms &&
        data.details.bedrooms === details.bedrooms &&
        data.details.floor === details.floor &&
        data.details.bathrooms === details.bathrooms
      ) {
        returnCheck = true;
      }
      return returnCheck;
    });
    console.log("FilteredAmenities===>", filteredList);
    return filteredList;
  }

  handleSubmit() {
    const finalList = this.filterByDetails();
    this.props.modifyApartmentList(finalList);
  }
  handleClick(e, type) {
    let value = this.state[e.target.name];
    console.log("VALUE", value);

    if (type === "add") {
      value++;
    }
    if (type === "dec") {
      value--;
    }
    console.log("taret", [e.target.name], type, value);
    if (value > 0) {
      this.setState({ [e.target.name]: value });
    }
  }
  handleChange(e) {
    console.log("E", [e.target.name], e.target.value);

    this.setState({ [e.target.name]: !this.state[e.target.name] });
  }
  render() {
    const content = (
      <div className="col">
        <label htmlFor="customRange2">Details</label>
        {this.props.details.map((name, index) => {
          return (
            <div
              className="col-sm-4 pull-right"
              style={{ display: "flex", marginBottom: 15 }}
              keys={"index" + index}
            >
              <div className="row">
                <div className="col-sm-4">
                  <label>{name.charAt(0).toUpperCase() + name.slice(1)}:</label>
                </div>
                <div className="col-sm-8">
                  <div
                    className="input-spinner pull-right"
                    style={{
                      display: "-webkit-inline-box",
                      marginLeft: 35,
                      marginTop: -3
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={e => this.handleClick(e, "dec")}
                      icon="minus"
                      name={name}
                    />
                    <input
                      type="text"
                      maxLength="2"
                      value={this.state[name]}
                      className="form-control  input-sm size-1 cat"
                      id={name}
                      name={name}
                      style={{ border: "none", width: 30 }}
                      onChange={this.handleChange}
                    />
                    <Button
                      type="primary"
                      onClick={e => this.handleClick(e, "add")}
                      icon="plus"
                      name={name}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="btn-popover" style={{ marginLeft: 135 }}>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
            onClick={this.hide}
          >
            Close
          </button>
          <button
            type="button"
            className="btn btn-primary"
            onClick={this.handleSubmit}
          >
            Apply
          </button>
        </div>
      </div>
    );
    return (
      <React.Fragment>
        <li className="nav-item dropdown">
          <Popover
            placement="bottomLeft"
            title="Filter"
            content={content}
            trigger="click"
            id="popover-id"
          >
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
            >
              Details
            </a>
          </Popover>
        </li>
      </React.Fragment>
    );
  }
}

export default FitlerByDetails;
