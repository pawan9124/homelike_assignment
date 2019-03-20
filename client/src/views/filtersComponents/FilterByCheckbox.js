import React from "react";
import Popover from "antd/lib/popover";
import Checkbox from "./../utils/Checkbox";
import PropTypes from "prop-types";

//State for the Service
const servicesState = {
  concierge: false,
  cleaning: false,
  fullFridge: false,
  laundry: false,
  visible: false
};

//State for the Amenities
const amenitiesState = {
  television: false,
  elevator: false,
  fridge: false,
  heating: false,
  cooker: false,
  microwave: false,
  visible: false
};

class FilterByCheckbox extends React.Component {
  //constructor to initialize the states
  constructor(props) {
    super(props);
    this.state =
      this.props.type === "services" ? servicesState : amenitiesState;
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterFunction = this.filterFunction.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hidePopOver = this.hidePopOver.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
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
      if (key !== "visible") {
        return obj[key];
      }
    });

    const finalList = this.filterFunction(filtered);
    this.hidePopOver();
    this.props.modifyApartmentList(finalList, finalList);
  }
  /**
   *
   * Handle the change of input
   */
  handleChange(e) {
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  }

  /**
   * Handling the close of modal
   */
  handleVisibleChange(visible) {
    this.setState({ visible });
  }

  /**
   * Hide PopUp
   */
  hidePopOver() {
    this.setState({
      visible: false
    });
  }

  /**
   * Reset Filter
   */
  resetFilter() {
    var x = document.getElementsByClassName("check-checkbox");
    for (let i = 0; i <= x.length; i++) {
      if (x[i] != undefined) {
        x[i].checked = false;
      }
    }
    this.hidePopOver();
    this.props.modifyApartmentList(this.props.apartmentList);
  }

  render() {
    //Content for the checkbox
    const content = (
      <div className="col">
        <label className="filterTitle" htmlFor="customRange2">
          Select Services
        </label>
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
          <a
            href="#"
            className="resetFilter-checkbox"
            onClick={this.resetFilter}
          >
            resetFilter
          </a>
          <button
            type="button"
            className="btn btn-secondary"
            onClick={this.hidePopOver}
          >
            Cancel
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
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
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
