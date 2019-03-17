import React from "react";

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
    this.closeModal = this.closeModal.bind(this);
    this.handleClick = this.handleClick.bind(this);
  }

  closeModal() {
    const element = document.getElementById("dropDownMenu");
    element.classList.remove("show");
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
    const element = document.getElementById("dropDownMenu");
    element.classList.remove("show");
    this.props.modifyApartmentList(finalList);
  }
  handleClick(e, type) {
    const element = document.getElementById("dropDownMenu");
    element.classList.add("show");
    let value = this.state[e.target.name];
    console.log("VALUE", value);
    if (type === "add") {
      value++;
    }
    if (type === "dec") {
      value--;
    }
    console.log("taret", [e.target.name], type, value);

    this.setState({ [e.target.name]: value });
  }
  handleChange(e) {
    const element = document.getElementById("dropDownMenu");
    element.classList.add("show");
    console.log("E", [e.target.name], e.target.value);

    this.setState({ [e.target.name]: !this.state[e.target.name] });
  }
  render() {
    return (
      <React.Fragment>
        <li className="nav-item dropdown">
          <a
            className="nav-link dropdown-toggle"
            href="#"
            id="navbarDropdown"
            role="button"
            data-toggle="dropdown"
            aria-haspopup="true"
            aria-expanded="false"
          >
            Details
          </a>
          <div
            className="dropdown-menu drop-down-size"
            aria-labelledby="navbarDropdown"
            id="dropDownMenu"
          >
            <div className="col">
              <label htmlFor="customRange2">Select Details</label>
              <div className="col-sm-4 pull-right">
                <label>Bedrooms:</label>
                <div className="input-spinner pull-right">
                  <button
                    className="btn btn-sm btn-info"
                    type="button"
                    onClick={e => this.handleClick(e, "dec")}
                    name="bedrooms"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    data-max="5"
                    maxLength="2"
                    data-min="0"
                    value={this.state.bedrooms}
                    className="form-control  input-sm size-1 cat"
                    id="historySize"
                    name="bedrooms"
                    onChange={this.handleChange}
                  />
                  <button
                    className="btn btn-sm btn-info"
                    type="button"
                    onClick={e => this.handleClick(e, "add")}
                    name="bedrooms"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-sm-4 pull-right">
                <label>Bathrooms:</label>
                <div className="input-spinner pull-right">
                  <button
                    className="btn btn-sm btn-info"
                    type="button"
                    onClick={e => this.handleClick(e, "dec")}
                    name="bathrooms"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    data-max="5"
                    maxLength="2"
                    data-min="0"
                    value={this.state.bathrooms}
                    className="form-control  input-sm size-1 cat"
                    id="historySize"
                    name="bathrooms"
                    onChange={this.handleChange}
                  />
                  <button
                    className="btn btn-sm btn-info"
                    type="button"
                    onClick={e => this.handleClick(e, "add")}
                    name="bathrooms"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-sm-4 pull-right">
                <label>Rooms:</label>
                <div className="input-spinner pull-right">
                  <button
                    className="btn btn-sm btn-info"
                    type="button"
                    onClick={e => this.handleClick(e, "dec")}
                    name="rooms"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    data-max="5"
                    maxLength="2"
                    data-min="0"
                    value={this.state.rooms}
                    className="form-control  input-sm size-1 cat"
                    id="historySize"
                    name="rooms"
                    onChange={this.handleChange}
                  />
                  <button
                    className="btn btn-sm btn-info"
                    type="button"
                    onClick={e => this.handleClick(e, "add")}
                    name="rooms"
                  >
                    +
                  </button>
                </div>
              </div>
              <div className="col-sm-4 pull-right">
                <label>Floor:</label>
                <div className="input-spinner pull-right">
                  <button
                    className="btn btn-sm btn-info"
                    type="button"
                    onClick={e => this.handleClick(e, "dec")}
                    name="floor"
                  >
                    -
                  </button>
                  <input
                    type="text"
                    data-max="5"
                    maxLength="2"
                    data-min="0"
                    value={this.state.floor}
                    className="form-control  input-sm size-1 cat"
                    id="historySize"
                    name="floor"
                    onChange={this.handleChange}
                  />
                  <button
                    className="btn btn-sm btn-info"
                    type="button"
                    onClick={e => this.handleClick(e, "add")}
                    name="floor"
                  >
                    +
                  </button>
                </div>
              </div>
            </div>
            <div className="modal-footer modal-filters-buttons">
              <button
                type="button"
                className="btn btn-secondary"
                data-dismiss="modal"
                onClick={this.closeModal}
              >
                Close
              </button>
              <button
                type="button"
                className="btn btn-primary"
                onClick={this.handleSubmit}
              >
                Save changes
              </button>
            </div>
          </div>
        </li>
      </React.Fragment>
    );
  }
}

export default FitlerByDetails;
