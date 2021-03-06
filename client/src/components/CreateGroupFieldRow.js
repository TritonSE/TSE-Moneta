/**
 * Row in the group creation modal with a field's name input and type selection.
 *
 * @summary A field row for creating/editing a group
 * @author William Wu
 */

import React from "react";
import TrashCan from "../images/TrashCan.svg";
import "../css/CreateGroupFieldRow.css";

/**
 * Renders create group module field row
 *
 * @return jsx for create group module field row
 */
function CreateGroupFieldRow({ index, fieldName, fieldType, invalid, changeDispatch, CSVFields }) {
  const fieldNameInputClass = "group-field-name-input" + (invalid ? " invalid" : "");
  return (
    <div className="group-field-row">
      <input
        className={fieldNameInputClass}
        placeholder="Field name"
        value={fieldName}
        disabled={CSVFields ? true : false}
        onChange={(event) =>
          changeDispatch({ type: "SET_NAME", payload: { index, value: event.target.value } })
        }
      />
      <select
        className="group-field-type-select"
        value={fieldType}
        onChange={(event) =>
          changeDispatch({ type: "SET_TYPE", payload: { index, value: event.target.value } })
        }
      >
        <option value="Text">Text</option>
        <option value="Number">Number</option>
        <option value="Email">Email</option>
      </select>
      {index !== 0 && !CSVFields && (
        <button
          className="group-field-delete"
          type="button"
          onClick={() => changeDispatch({ type: "DELETE_ROW", payload: { index } })}
        >
          <img src={TrashCan} alt="Delete row" />
        </button>
      )}
    </div>
  );
}

export default CreateGroupFieldRow;
