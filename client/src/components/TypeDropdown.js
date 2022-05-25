/**
 * Table display for the dashboard page.
 * Displays data depending on selected schema.
 *
 * @summary Table display for dashboard page.
 * @author Alex Zhang
 * @author Elias Fang
 */

import React, { useState } from "react";
import AddIcon from "../images/AddIcon.svg";
import Pencil from "../images/Pencil";
import "../css/TypeDropdown.css";

/**
 * Renders the table display.
 *
 * @returns Table display for dashboard.
 */
function TypeDropdown() {
  const [typeField, setTypeField] = useState(false);
  const [typeFieldValue, setTypeFieldValue] = useState("");
  const [dropdownItems, setDropdownItems] = useState([]);
  const onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      setDropdownItems((items) => [...items, event.target.value]);
      setTypeField(false);
      setTypeFieldValue("");
    }
  };
  return (
    <div className="type-dropdown-div">
      <button className="add-type-dropdown-button" type="button" onClick={() => setTypeField(true)}>
        <img src={AddIcon} className="type-dropdown-add-icon-svg" alt="plus icon on add button" />
        Add Type
      </button>
      {dropdownItems.map((item) => (
        <div className="type-dropdown-option">
          <button className="type-dropdown-field">{item}</button>
          <Pencil className="type-dropdown-pencil" />
        </div>
      ))}
      {typeField ? (
        <div className="type-dropdown-option">
          <input
            className="type-dropdown-field"
            value={typeFieldValue}
            placeholder="Type here..."
            onKeyDown={onKeyDown}
            onChange={(event) => setTypeFieldValue(event.target.value)}
            autoFocus="autofocus"
          />
          <Pencil className="type-dropdown-pencil" />
        </div>
      ) : null}
    </div>
  );
}

export default TypeDropdown;
