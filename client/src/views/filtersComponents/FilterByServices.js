import React from "react";

class FitlerByServices extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      concierge: false,
      cleaning: false,
      fullFridge: false,
      laundry: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterByDetails = this.filterByDetails.bind(this);
    this.closeModal = this.closeModal.bind(this);
  }

  closeModal() {
    const element = document.getElementById("dropDownMenu");
    element.classList.remove("show");
  }

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
    const element = document.getElementById("dropDownMenu");
    element.classList.remove("show");
    this.props.modifyApartmentList(finalList);
  }

  handleChange(e) {
    const element = document.getElementById("dropDownMenu");
    element.classList.add("show");
    console.log("E", [e.target.name], this.state[e.target.name]);
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
            Services
          </a>
          <div
            className="dropdown-menu drop-down-size"
            aria-labelledby="navbarDropdown"
            id="dropDownMenu"
          >
            <div className="col">
              <label htmlFor="detailsMirage">Select Services</label>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  onClick={e => this.handleChange(e)}
                  defaultChecked={this.state.television}
                  id="deatailsCheck1"
                  name="concierge"
                />
                <label
                  className="custom-control-label"
                  htmlFor="deatailsCheck1"
                >
                  concierge
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  onClick={e => this.handleChange(e)}
                  id="deatailsCheck2"
                  defaultChecked={this.state.elevator}
                  name="cleaning"
                />
                <label
                  className="custom-control-label"
                  htmlFor="deatailsCheck2"
                >
                  cleaning
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="deatailsCheck3"
                  onClick={e => this.handleChange(e)}
                  defaultChecked={this.state.fridge}
                  name="fullFridge"
                />
                <label
                  className="custom-control-label"
                  htmlFor="deatailsCheck3"
                >
                  fullFridge
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="deatailsCheck4"
                  onClick={e => this.handleChange(e)}
                  defaultChecked={this.state.fridge}
                  name="laundry"
                />
                <label
                  className="custom-control-label"
                  htmlFor="deatailsCheck4"
                >
                  laundry
                </label>
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

export default FitlerByServices;
