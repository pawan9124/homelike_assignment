import React from "react";

class FilterByPrice extends React.Component {
  constructor(props) {
    super(props);
    this.state = { minPrice: "", maxPrice: "" };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterByPricefunction = this.filterByPricefunction.bind(this);
  }

  filterByPricefunction(minPrice, maxPrice) {
    const apartmentList = this.props.apartmentList;
    const filteredList = apartmentList.filter(data => {
      if (data.price >= minPrice && data.price <= maxPrice) {
        return true;
      }
      return false;
    });
    console.log("FilteredSize", filteredList);
    return filteredList;
  }

  handleSubmit() {
    const finalList = this.filterByPricefunction(
      this.state.minPrice,
      this.state.maxPrice
    );
    this.props.modifyApartmentList(finalList);
  }
  handleChange(e) {
    console.log("E", [e.target.name], e.target.value);
    this.setState({ [e.target.name]: e.target.value });
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
            Price
          </a>
          <div
            className="dropdown-menu drop-down-size"
            aria-labelledby="navbarDropdown"
          >
            <div className="col">
              <label htmlFor="customRange2">Price Range</label>
              <input
                type="range"
                className="custom-range"
                min={this.props.min}
                max={this.props.max}
                name="minPrice"
                id="customRange2"
                step={this.props.step}
                onChange={this.handleChange}
              />
              <input
                type="range"
                className="custom-range"
                min={this.props.min}
                max={this.props.max}
                name="maxPrice"
                id="customRange2"
                step={this.props.step}
                onChange={this.handleChange}
              />
            </div>
            <div className="modal-footer modal-filters-buttons">
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
                Save changes
              </button>
            </div>
          </div>
        </li>
      </React.Fragment>
    );
  }
}

export default FilterByPrice;
