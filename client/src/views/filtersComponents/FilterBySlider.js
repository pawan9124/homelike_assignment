import React from "react";
import { Slider, Popover } from "antd";

class FilterBySlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: [this.props.min, this.props.max] };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterBySizefunction = this.filterBySizefunction.bind(this);
  }

  filterBySizefunction() {
    const apartmentList = this.props.apartmentList;
    const range = this.state.value;
    const type = this.props.type;
    const filteredList = apartmentList.filter(data => {
      if (data[type] >= range[0] && data[type] <= range[1]) {
        return true;
      }
      return false;
    });
    console.log("FilteredSize", filteredList);
    return filteredList;
  }

  handleSubmit() {
    const finalList = this.filterBySizefunction();
    this.props.modifyApartmentList(finalList);
  }
  handleChange(value) {
    console.log("VALUE--", value);
    this.setState({ value });
  }
  render() {
    const { value } = this.state;
    let symbol = "";
    if (this.props.type === "size") {
      symbol = (
        <span>
          m<sup>2</sup>
        </span>
      );
    }
    if (this.props.type === "price") {
      symbol = <span>&euro;</span>;
    }
    const content = (
      <div className="col pop-over-size">
        <label htmlFor="customRange2">{this.props.title}</label>
        <div>
          <label>
            {value[0]} {symbol} - {value[1]} {symbol}
          </label>
        </div>
        <Slider
          range
          defaultValue={[this.props.min, this.props.max]}
          onChange={value => this.handleChange(value)}
          max={this.props.max}
          min={this.props.min}
          step={this.props.step}
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
              {this.props.type.charAt(0).toUpperCase() +
                this.props.type.slice(1)}
            </a>
          </Popover>
        </li>
      </React.Fragment>
    );
  }
}

export default FilterBySlider;
