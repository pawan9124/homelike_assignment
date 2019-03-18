import React from "react";
import { Popover } from "antd";
import Checkbox from "../common/Checkbox";
import PropTypes from "prop-types";

//State for the Service
const servicesState = {
  concierge: false,
  cleaning: false,
  fullFridge: false,
  laundry: false
};

//State for the Amenities
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
    this.filterFunction = this.filterFunction.bind(this);
  }

  /**
   * Handle the filter function
   *
   */
  filterFunction(selectedServices) {
    const apartmentList = this.props.apartmentList;
    let filteredList = apartmentList.filter(data => {
      let returnCheck = false;
      for (let i = 0; i < selectedServices.length; i++) {
        if (data[this.props.type].indexOf(selectedServices[i]) > -1) {
          returnCheck = true;
        } else {
          returnCheck = false;
          break;
        }
      }
      return returnCheck;
    });
    return filteredList;
  }
  /**
   * Handle the submit function
   */
  handleSubmit() {
    var obj = this.state;

    var keys = Object.keys(obj);

    var filtered = keys.filter(function(key) {
      return obj[key];
    });
    const finalList = this.filterFunction(filtered);
    this.props.modifyApartmentList(finalList, finalList);
  }
  /**
   *
   * Handle the change of input
   */
  handleChange(e) {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  }
  render() {
    //Content for the checkbox
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

FilterByCheckbox.propTypes = {
  type: PropTypes.string.isRequired,
  apartmentList: PropTypes.array.isRequired,
  modifyApartmentList: PropTypes.func.isRequired,
  checkboxes: PropTypes.array.isRequired,
  title: PropTypes.string.isRequired
};
export default FilterByCheckbox;
