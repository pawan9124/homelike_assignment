import React from "react";
import { Popover } from "antd";
import Checkbox from "./common/Checkbox";

class FitlerByAmenities extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      television: false,
      elevator: false,
      fridge: false,
      heating: false,
      cooker: false,
      microwave: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterByAmenities = this.filterByAmenities.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  componentDidMount() {
    $(".dropdown-menu").on("click", function(e) {
      console.log("HEEH");
      e.stopPropagation();
    });
  }

  closeModal() {
    const element = document.getElementById("dropDownMenu");
    element.classList.remove("show");
  }

  filterByAmenities(selectedAmenities) {
    const apartmentList = this.props.apartmentList;

    let filteredList = apartmentList.filter(data => {
      let returnCheck = false;
      for (let i = 0; i < selectedAmenities.length; i++) {
        if (data.amenities.indexOf(selectedAmenities[i]) > -1) {
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

    const finalList = this.filterByAmenities(filtered);
    const element = document.getElementById("dropDownMenu");
    element.classList.remove("show");
    this.props.modifyApartmentList(finalList);
  }

  handleChange(e) {
    // const element = document.getElementById("dropDownMenu");
    // element.classList.add("show");
    if (
      e.target.matches(".dropDownMenu") ||
      e.target.matches(".dropdown-content *")
    ) {
      e.stopPropagation();
    }
    console.log("E", [e.target.name], this.state[e.target.name]);
    this.setState({ [e.target.name]: !this.state[e.target.name] });
  }
  render() {
    const content = (
      <div className="col">
        <label htmlFor="customRange2">Select Amenities</label>
        <Checkbox
          name="television"
          checkboxId="amenitiesCheck1"
          handleChange={this.handleChange}
          checked={this.state.television}
        />
        <Checkbox
          name="elevator"
          checkboxId="amenitiesCheck2"
          handleChange={this.handleChange}
          checked={this.state.elevator}
        />
        <Checkbox
          name="fridge"
          checkboxId="amenitiesCheck3"
          handleChange={this.handleChange}
          checked={this.state.fridge}
        />
        <Checkbox
          name="heating"
          checkboxId="amenitiesCheck4"
          handleChange={this.handleChange}
          checked={this.state.heating}
        />
        <Checkbox
          name="cooker"
          checkboxId="amenitiesCheck5"
          handleChange={this.handleChange}
          checked={this.state.cooker}
        />
        <Checkbox
          name="microwave"
          checkboxId="amenitiesCheck6"
          handleChange={this.handleChange}
          checked={this.state.microwave}
        />
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
              Amenities
            </a>
          </Popover>
        </li>
      </React.Fragment>
    );
  }
}

export default FitlerByAmenities;
