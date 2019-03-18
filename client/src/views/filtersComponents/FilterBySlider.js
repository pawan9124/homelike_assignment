import React from "react";
import { Slider, Popover } from "antd";
import PropTypes from "prop-types";

class FilterBySlider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { value: [this.props.min, this.props.max], visible: false };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterFunction = this.filterFunction.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hidePopOver = this.hidePopOver.bind(this);
  }
  /**
   * Filter the object
   */
  filterFunction() {
    const apartmentList = this.props.apartmentList;
    const range = this.state.value;
    const type = this.props.type;
    const filteredList = apartmentList.filter(data => {
      if (data[type] >= range[0] && data[type] <= range[1]) {
        return true;
      }
      return false;
    });
    return filteredList;
  }
  /**
   * Handle the apply filter function
   */
  handleSubmit() {
    const finalList = this.filterFunction();
    this.hidePopOver();
    this.props.modifyApartmentList(finalList);
  }

  /**
   *
   * Set the value to the state
   */
  handleChange(value) {
    this.setState({ value });
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
  render() {
    const { value } = this.state;
    let symbol = "";

    //Check condition Symbol for the component
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

    //Slider over the popover
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
            onClick={this.hidePopOver}
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
            visible={this.state.visible}
            onVisibleChange={this.handleVisibleChange}
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
FilterBySlider.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  apartmentList: PropTypes.array.isRequired,
  modifyApartmentList: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  step: PropTypes.number.isRequired
};
export default FilterBySlider;
