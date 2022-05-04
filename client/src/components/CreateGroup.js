/**
 * Create group module that appears when the user wants to add a new group type.
 * Prompts user for name of group and its fields. Allows user to add more fields
 * if needed.
 *
 * @summary Module that displays form for adding group
 * @author Kevin Fu
 * @author William Wu
 */

import React, { useCallback, useEffect, useReducer, useState, useRef } from "react";
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
 * - `"SET_VALID"` or `"SET_INVALID"` - the `payload` should be an object containing the `index` to
 * update.
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
      value
        ? newFields.push({ name: value.name, type: value.type })
        : newFields.push({ name: "", type: "Text" });
      break;
    case "DELETE_ROW":
      newFields.splice(index, 1);
      break;
    case "SET_VALID":
      delete newFields[index].invalid;
      break;
    case "SET_INVALID":
      newFields[index].invalid = true;
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
function CreateGroup({ onConfirm, onCancel, editGroup, onDelete }) {
  const [groupName, setGroupName] = useState("");
  const [groupNameInvalid, setGroupNameInvalid] = useState(false);
  const fieldsListDiv = useRef(null);

  /**
   * `fields` is an array of objects representing the group's fields. Each object has a `name` and
   * a `type`, both strings. Each object may also have a boolean `invalid` field, denoting whether
   * there is a problem with the user-given values. Upon calling `onConfirm`, every `invalid` field
   * should be removed.
   * To update this state, call `dispatch` and pass in an object with the action's `type` and
   * `payload` as described for the `fieldsReducer` function above.
   */
  const [fields, dispatch] = useReducer(
    fieldsReducer,
    !editGroup ? [{ name: "", type: "Text" }] : []
  );

  useEffect(() => {
    if (editGroup) {
      setGroupName(editGroup.label);

      editGroup.values.map((value) => {
        dispatch({ type: "ADD_ROW", payload: { value } });
        return value;
      });
    } else {
      setGroupName("");
    }
  }, [editGroup]);

  const scrollToIndex = useCallback(
    (index) => {
      fieldsListDiv.current.children[index].scrollIntoView({ behavior: "smooth" });
    },
    [fieldsListDiv]
  );

  const tryConfirm = useCallback(
    (groupName_, fields_) => {
      let valid = true;
      setGroupNameInvalid(false);

      if (groupName_.length === 0) {
        setGroupNameInvalid(true);
        valid = false;
      }
      let firstErrorIndex = -1;
      for (let i = 0; i < fields_.length; i++) {
        const fieldInfo = fields_[i];
        if (fieldInfo.name.length === 0) {
          dispatch({ type: "SET_INVALID", payload: { index: i } });
          if (firstErrorIndex === -1) {
            firstErrorIndex = i;
          }
          valid = false;
        } else {
          dispatch({ type: "SET_VALID", payload: { index: i } });
        }
      }

      if (valid) {
        !editGroup ? onConfirm(groupName_, fields_) : onConfirm(groupName_, fields_, editGroup.id);
      } else {
        scrollToIndex(firstErrorIndex);
      }
    },
    [editGroup, onConfirm, scrollToIndex]
  );

  const nameInputClass = "group-name-input" + (groupNameInvalid ? " invalid" : "");

  return (
    <div className="modal-background">
      <div className="modal-view">
        <form
          className="group-form"
          onSubmit={(event) => {
            tryConfirm(groupName, fields);
            event.preventDefault();
          }}
        >
          <h1 className="group-first-header">{!editGroup ? "Create New Group" : "Edit Group"}</h1>
          <h2 className="group-second-header">Group Name</h2>
          <input
            className={nameInputClass}
            value={groupName}
            onChange={(event) => setGroupName(event.target.value)}
          />
          <h2 className="group-second-header">Fields</h2>
          <h3 className="group-third-header">
            List the fields you want associated with this group...
          </h3>
          <div className="group-fields-list" ref={fieldsListDiv}>
            {fields.map(({ name, type, invalid }, index) => (
              <CreateGroupFieldRow
                key={index}
                index={index}
                fieldName={name}
                fieldType={type}
                invalid={invalid}
                changeDispatch={dispatch}
              />
            ))}
          </div>
          <button
            className="add-field-button"
            type="button"
            onClick={() => {
              dispatch({ type: "ADD_ROW" });
              setTimeout(() => scrollToIndex(fields.length), 100);
            }}
          >
            <img src={AddFieldIcon} className="add-field-svg" alt="add field button icon" />
            Add new field
          </button>
          <div className="group-submit-div">
            <button className="modal-blue" type="submit">
              {editGroup ? "Save" : "Create"}
            </button>
            {editGroup && (
              <button
                className="modal-white"
                type="button"
                onClick={() => onDelete(editGroup.id)}
                style={{ marginLeft: "20px" }}
              >
                Delete
              </button>
            )}
            <button className="modal-white" type="button" onClick={onCancel}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default CreateGroup;
