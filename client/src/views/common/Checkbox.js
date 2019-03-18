import React from "react";
import PropTypes from "prop-types";
const Checkbox = props => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input"
        onClick={e => props.handleChange(e)}
        defaultChecked={props.checked}
        id={props.checkboxId}
        name={props.name}
      />
      <label className="custom-control-label" htmlFor={props.checkboxId}>
        {props.name}
      </label>
    </div>
  );
};

Checkbox.propTypes = {
  handleChange: PropTypes.func.isRequired,
  checked: PropTypes.bool.isRequired,
  checkboxId: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired
};
export default Checkbox;
