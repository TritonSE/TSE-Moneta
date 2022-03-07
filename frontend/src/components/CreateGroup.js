/**
 * Create group module that appears when the user wants to add a new group type.
 * Prompts user for name of group and its fields. Allows user to add more fields
 * if needed.
 *
 * @summary Module that displays form for adding group
 * @author Kevin Fu
 */

import React from "react";
import AddFieldIcon from "../images/AddFieldIcon.svg";
import "../css/CreateGroup.css";
/**
 * Renders create group module
 *
 * @return jsx for create group module
 */
function CreateGroup() {
  return (
    <div className="modal">
      <div className="modal-content">
        <span className="group-first-header">Create New Group</span>
        <div className="group-name-form">
          <span className="group-second-header">Group Name</span>
          <form>
            <input className="group-name-field" />
          </form>
        </div>
        <div className="fields-form-div">
          <span className="group-second-header">Fields</span>
          <br />
          <span className="group-third-header">
            List the fields you want associated with this group....
          </span>
          <button className="add-group-button" type="button">
            <img src={AddFieldIcon} className="add-field-svg" alt="add group button icon" />
            Add new field
          </button>
          <form id="field-form">
            <input className="create-group-field" />
            <select className="field-select">
              <option value="Email">Email</option>
              <option value="Text">Text</option>
              <option value="Number">Number</option>
            </select>
            <br />
            <input className="create-group-field" />
            <select className="field-select">
              <option value="Email">Email</option>
              <option value="Text">Text</option>
              <option value="Number">Number</option>
            </select>
            <br />
            <input className="create-group-field" />
            <select className="field-select">
              <option value="Email">Email</option>
              <option value="Text">Text</option>
              <option value="Number">Number</option>
            </select>
            <br />
            <input className="create-group-field" />
            <select className="field-select">
              <option value="Email">Email</option>
              <option value="Text">Text</option>
              <option value="Number">Number</option>
            </select>
          </form>
          <div className="group-submit-div">
            <button className="group-modal-submit" type="button">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;
