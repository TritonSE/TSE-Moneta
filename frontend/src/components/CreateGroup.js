/**
 * Create group module that appears when the user wants to add a new group type.
 * Prompts user for name of group and its fields. Allows user to add more fields
 * if needed.
 *
 * @summary Module that displays form for adding group
 * @author Kevin Fu
 * @author William Wu
 */

import React, { useReducer, useState } from "react";
import AddFieldIcon from "../images/AddFieldIcon.svg";
import CreateGroupFieldRow from "./CreateGroupFieldRow";
import "../css/CreateGroup.css";

/**
 * Reducer for the module's list of field names and types. The action `type` can be one of the
 * following:
 * - `"SET_NAME"` or `"SET_TYPE"` - the `payload` should be an object containing both the `index`
 * and the new `value`.
 * - `"ADD_ROW"` - no `payload`.
 * - `"DELETE_ROW"` - the `payload` should be an object containing the `index` to delete.
 */
const fieldsReducer = (prevFields, { type, payload }) => {
  const { index, value } = payload ?? {};
  const newFields = [...prevFields];
  newFields[index] = { ...prevFields[index] };
  switch (type) {
    case "SET_NAME":
      newFields[index].name = value;
      break;
    case "SET_TYPE":
      newFields[index].type = value;
      break;
    case "ADD_ROW":
      newFields.push({ name: "", type: "" });
      break;
    case "DELETE_ROW":
      newFields.splice(index, 1);
      break;
    default:
      throw new Error(`Unrecognized action type: ${type}`);
  }
  return newFields;
};

/**
 * Renders create group module
 *
 * @return jsx for create group module
 */
function CreateGroup({ onConfirm, onCancel }) {
  const [groupName, setGroupName] = useState("");
  /**
   * `fields` is an array of objects representing the group's fields. Each object has a `name` and
   * a `type`.
   * To update this state, call `dispatch` and pass in an object with the action's `type` and
   * `payload` as described for the `fieldsReducer` function above.
   */
  const [fields, dispatch] = useReducer(fieldsReducer, [{ name: "", type: "" }]);

  return (
    <div className="modal-background">
      <div className="modal-view">
        <form className="group-form" onSubmit={() => console.log("submit")}>
          <h1 className="group-first-header">Create New Group</h1>
          <h2 className="group-second-header">Group Name</h2>
          <input
            className="group-name-field"
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
          />
          <h2 className="group-second-header">Fields</h2>
          <h3 className="group-third-header">
            List the fields you want associated with this group...
          </h3>
          <div className="group-fields-list">
            {fields.map(({ name, type }, index) => (
              <CreateGroupFieldRow
                key={index}
                index={index}
                fieldName={name}
                fieldType={type}
                changeDispatch={dispatch}
              />
            ))}
          </div>
          <button
            className="add-field-button"
            type="button"
            onClick={() => dispatch({ type: "ADD_ROW" })}
          >
            <img src={AddFieldIcon} className="add-field-svg" alt="add field button icon" />
            Add new field
          </button>
          <div className="group-submit-div">
            <button className="group-modal-submit" type="button">
              Create
            </button>
            <button className="group-modal-cancel" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGroup;
