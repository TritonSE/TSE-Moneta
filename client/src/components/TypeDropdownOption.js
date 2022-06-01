/**
 * Components representing rows in the TypeDropdown menu.
 *
 * @summary Table display for dashboard page.
 * @author Alex Zhang
 */

import React, { useState, useRef, useEffect } from "react";
import Pencil from "../images/Pencil";
import TrashCan from "../images/TrashCan.svg";

/**
 * Renders the dropdown option for the custom type menu.
 * @param {string} value The string value of the type option
 * @param {function} deleteType Function to remove the type option from the dropdown.
 * @returns
 */
function TypeDropdownOption({ value, deleteType }) {
  const [fieldValue, setFieldValue] = useState(value);
  const [editOption, setEditOption] = useState(false);
  const [editFieldValue, setEditFieldValue] = useState(value);
  // This useEffect hook manages clicks outside the menu and minimizes the window.
  const editOptionRef = useRef(null);
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (editOption && editOptionRef.current && !editOptionRef.current.contains(event.target)) {
        setEditFieldValue(fieldValue);
        setEditOption(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  });

  const onKeyDown = (event) => {
    // 'keypress' event misbehaves on mobile so we track 'Enter' key via 'keydown' event
    if (event.key === "Enter") {
      event.preventDefault();
      event.stopPropagation();
      setFieldValue(editFieldValue);
      setEditOption(false);
    }
  };
  return (
    <div className="type-dropdown-option">
      <button className="type-dropdown-field">{fieldValue}</button>
      <button
        className="pencil-button"
        onClick={() => {
          setEditOption(true);
          setEditFieldValue(fieldValue);
        }}
      >
        <Pencil className="type-dropdown-pencil" />
      </button>
      {editOption ? (
        <div className="type-dropdown-edit-div" ref={editOptionRef}>
          <h1 className="type-dropdown-edit-header">Edit Option</h1>
          <hr className="type-dropdown-edit-divider" />
          <input
            className="type-dropdown-edit-field"
            value={editFieldValue}
            onKeyDown={onKeyDown}
            onChange={(event) => setEditFieldValue(event.target.value)}
            autoFocus="autofocus"
          />
          <button className="type-dropdown-delete-option" onClick={() => deleteType(value)}>
            <img src={TrashCan} className="type-dropdown-trash-can-svg" alt="Delete Option" />
            <p className="type-dropdown-delete-option-text">Delete Option</p>
          </button>
        </div>
      ) : null}
    </div>
  );
}

export default TypeDropdownOption;
