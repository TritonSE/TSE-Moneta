import "../css/CreateGroup.css";
import React from "react";
import AddFieldIcon from "../images/AddFieldIcon.svg";

function CreateGroup() {
  return (
    <div id="newGroupModal" className="modal">
      <div className="modal-content">
        <h1>Create New Group</h1>
        <div className="name-form">
          <h2>Group Name</h2>
          <form>
            <input className="name-field" />
          </form>
        </div>
        <div className="fields-form-div">
          <h2>Fields</h2>
          <h3>List the fields you want associated with this group.....</h3>
          <button className="add" type="button">
            <img src={AddFieldIcon} className="add-svg" />
            Add new field
          </button>
          <form id="field-form">
            <input className="field" />
            <select>
              <option value="Email">Email</option>
              <option value="Text">Text</option>
              <option value="Number">Number</option>
            </select>
            <br />
            <input className="field" />
            <select>
              <option value="Email">Email</option>
              <option value="Text">Text</option>
              <option value="Number">Number</option>
            </select>
            <br />
            <input className="field" />
            <select>
              <option value="Email">Email</option>
              <option value="Text">Text</option>
              <option value="Number">Number</option>
            </select>
            <br />
            <input className="field" />
            <select>
              <option value="Email">Email</option>
              <option value="Text">Text</option>
              <option value="Number">Number</option>
            </select>
          </form>
          <div className="submit-div">
            <button className="submit" type="button">
              Create
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default CreateGroup;
