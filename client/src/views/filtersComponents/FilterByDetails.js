import React from "react";
import Button from "antd/lib/button";
import Popover from "antd/lib/popover";
import PropTypes from "prop-types";

/**
 * FiltebyDetails show details filter increment/decrement
 * @child of SearchPage
 */
class FilterByDetails extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      rooms: 1,
      bedrooms: 1,
      floor: 1,
      bathrooms: 1,
      visible: false
    };
    this.handleChange = this.handleChange.bind(this);
    this.handleSubmit = this.handleSubmit.bind(this);
    this.filterFunction = this.filterFunction.bind(this);
    this.handleClick = this.handleClick.bind(this);
    this.handleVisibleChange = this.handleVisibleChange.bind(this);
    this.hidePopOver = this.hidePopOver.bind(this);
    this.resetFilter = this.resetFilter.bind(this);
  }

  /**
   * Filter the details
   */
  filterFunction() {
    const apartmentList = this.props.apartmentList;
    const details = this.state;

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
    return filteredList;
  }
  /**
   * Apply the filter
   */
  handleSubmit() {
    const finalList = this.filterFunction();
    this.hidePopOver();
    this.props.modifyApartmentList(finalList, "details", true, "details");
  }

  /**
   * Handle the increment decrement button
   */
  handleClick(e, type) {
    let value = this.state[e.target.name];

    if (type === "add") {
      value++;
    }
    if (type === "dec") {
      value--;
    }
    if (value > 0 && value < 9) {
      this.setState({ [e.target.name]: value });
    }
  }

  /**
   *
   * Handle the target
   */
  handleChange(e) {
    this.setState({ [e.target.name]: e.target.value });
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
    const resetData = {
      rooms: 1,
      bedrooms: 1,
      floor: 1,
      bathrooms: 1,
      visible: false
    };
    this.setState(resetData);
    this.props.modifyApartmentList([], "details", false, "");
  }
  render() {
    const content = (
      <div className="col">
        <label className="filterTitle" htmlFor="customRange2">
          Details
        </label>
        {this.props.details.map((name, index) => {
          return (
            <div
              className="col-sm-4 pull-right"
              style={{ display: "flex", marginBottom: 15 }}
              key={"index" + index}
            >
              <div className="row">
                <div className="col-sm-4">
                  <label>{name.charAt(0).toUpperCase() + name.slice(1)}:</label>
                </div>
                <div className="col-sm-8">
                  <div
                    className="input-spinner pull-right"
                    style={{
                      display: "-webkit-inline-box",
                      marginLeft: 35,
                      marginTop: -3
                    }}
                  >
                    <Button
                      type="primary"
                      onClick={e => this.handleClick(e, "dec")}
                      icon="minus"
                      name={name}
                    />
                    <input
                      type="text"
                      maxLength="2"
                      value={this.state[name]}
                      className="form-control  input-sm size-1 cat"
                      id={name}
                      name={name}
                      style={{ border: "none", width: 30 }}
                      onChange={this.handleChange}
                    />
                    <Button
                      type="primary"
                      onClick={e => this.handleClick(e, "add")}
                      icon="plus"
                      name={name}
                    />
                  </div>
                </div>
              </div>
            </div>
          );
        })}
        <div className="btn-popover" style={{ marginLeft: 135 }}>
          <a href="###" className="resetFilter" onClick={this.resetFilter}>
            resetFilter
          </a>
          <button
            type="button"
            className="btn btn-secondary"
            data-dismiss="modal"
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
              Details
            </a>
          </Popover>
        </li>
      </React.Fragment>
    );
  }
}
FilterByDetails.propTypes = {
  apartmentList: PropTypes.array.isRequired,
  modifyApartmentList: PropTypes.func.isRequired,
  details: PropTypes.array.isRequired
};
export default FilterByDetails;
