import React from "react";

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
            Amenities
          </a>
          <div
            className="dropdown-menu drop-down-size"
            aria-labelledby="navbarDropdown"
            id="dropDownMenu"
          >
            <div className="col">
              <label htmlFor="customRange2">Select Amenities</label>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  onClick={e => this.handleChange(e)}
                  defaultChecked={this.state.television}
                  id="customCheck1"
                  name="television"
                />
                <label className="custom-control-label" htmlFor="customCheck1">
                  television
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  onClick={e => this.handleChange(e)}
                  id="customCheck2"
                  defaultChecked={this.state.elevator}
                  name="elevator"
                />
                <label className="custom-control-label" htmlFor="customCheck2">
                  elevator
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck3"
                  onClick={e => this.handleChange(e)}
                  defaultChecked={this.state.fridge}
                  name="fridge"
                />
                <label className="custom-control-label" htmlFor="customCheck3">
                  fridge
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck4"
                  onClick={e => this.handleChange(e)}
                  defaultChecked={this.state.fridge}
                  name="heating"
                />
                <label className="custom-control-label" htmlFor="customCheck4">
                  heating
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck5"
                  onClick={e => this.handleChange(e)}
                  defaultChecked={this.state.cooker}
                  name="cooker"
                />
                <label className="custom-control-label" htmlFor="customCheck5">
                  cooker
                </label>
              </div>
              <div className="custom-control custom-checkbox">
                <input
                  type="checkbox"
                  className="custom-control-input"
                  id="customCheck6"
                  onClick={e => this.handleChange(e)}
                  defaultChecked={this.state.cooker}
                  name="microwave"
                />
                <label className="custom-control-label" htmlFor="customCheck6">
                  microwave
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

export default FitlerByAmenities;
