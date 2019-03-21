import React from "react";
import PropTypes from "prop-types";

/**
 * Checkbox component
 * @child of FiltersByCheckbox
 */
const Checkbox = props => {
  return (
    <div className="custom-control custom-checkbox">
      <input
        type="checkbox"
        className="custom-control-input check-checkbox"
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
