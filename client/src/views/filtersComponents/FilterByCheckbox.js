import React from "react";
import { Popover } from "antd";
import Checkbox from "../common/Checkbox";

const servicesState = {
  concierge: false,
  cleaning: false,
  fullFridge: false,
  laundry: false
};

const amenitiesState = {
  television: false,
  elevator: false,
  fridge: false,
  heating: false,
  cooker: false,
  microwave: false
};

class FilterByCheckbox extends React.Component {
  constructor(props) {
    super(props);
    this.state =
      this.props.type === "services" ? servicesState : amenitiesState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterByDetails = this.filterByDetails.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {}

  filterByDetails(selectedServices) {
    const apartmentList = this.props.apartmentList;

    let filteredList = apartmentList.filter(data => {
      let returnCheck = false;
      for (let i = 0; i < selectedServices.length; i++) {
        if (data.services.indexOf(selectedServices[i]) > -1) {
          returnCheck = true;
        } else {
          returnCheck = false;
          break;
        }
      }
      return returnCheck;
    });
    console.log("FilteredAmenities===>", filteredList);
    return filteredList;
  }

  handleSubmit() {
    var obj = this.state;

    var keys = Object.keys(obj);

    var filtered = keys.filter(function(key) {
      return obj[key];
    });

    const finalList = this.filterByDetails(filtered);
    this.props.modifyApartmentList(finalList);
  }

  handleChange(e) {
    console.log("E", [e.target.name], this.state[e.target.name]);
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  }
  render() {
    const content = (
      <div className="col">
        <label htmlFor="customRange2">Select Services</label>
        {this.props.checkboxes.map((data, index) => {
          return (
            <Checkbox
              key={"index" + index}
              name={data}
              checkboxId={`${data}Check1`}
              handleChange={this.handleChange}
              checked={this.state[data]}
            />
          );
        })}
        <div className="btn-popover">
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
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
          >
            <a
              className="nav-link dropdown-toggle"
              href="#"
              id="navbarDropdown"
              role="button"
            >
              {this.props.title}
            </a>
          </Popover>
        </li>
      </React.Fragment>
    );
  }
}

export default FilterByCheckbox;
