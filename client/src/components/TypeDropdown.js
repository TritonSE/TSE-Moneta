/**
 * Dropdown menu to manage and select custom types.
 * Allows to select the current type, edit types, add new types, and delete types.
 *
 * @summary Custom type dropdown menu.
 * @author Alex Zhang
 */

import React, { useState } from "react";
import AddIcon from "../images/AddIcon.svg";
import Pencil from "../images/Pencil";
import TypeDropdownOption from "./TypeDropdownOption";
import "../css/TypeDropdown.css";

/**
 * Renders the type dropdown.
 * @returns
 */
function TypeDropdown() {
  const [typeField, setTypeField] = useState(false);
  const [typeFieldValue, setTypeFieldValue] = useState("");
  const [dropdownItems, setDropdownItems] = useState([]);
  const onKeyDown = (event) => {
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      setDropdownItems((items) => [...items, event.target.value]);
      setTypeField(false);
      setTypeFieldValue("");
    }
  };
  const deleteType = (option) => {
    setDropdownItems(
      dropdownItems.filter((item) => {
        return item !== option;
      })
    );
  };
  return (
    <div className="type-dropdown-div-wrapper">
      <div className="type-dropdown-div">
        <button
          className="add-type-dropdown-button"
          type="button"
          onClick={() => setTypeField(true)}
        >
          <img src={AddIcon} className="type-dropdown-add-icon-svg" alt="plus icon on add button" />
          Add Type
        </button>
        {dropdownItems.map((item) => (
          <TypeDropdownOption value={item} deleteType={deleteType} />
        ))}
        {typeField ? (
          <div className="type-dropdown-option">
            <input
              className="type-dropdown-field empty"
              value={typeFieldValue}
              placeholder="Type here..."
              onKeyDown={onKeyDown}
              onChange={(event) => setTypeFieldValue(event.target.value)}
              autoFocus="autofocus"
            />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default TypeDropdown;
