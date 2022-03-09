/**
 * Row in the group creation modal with a field's name input and type selection.
 *
 * @summary A field row for creating/editing a group
 * @author William Wu
 */

import React from "react";
import "../css/CreateGroupFieldRow.css";

/**
 * Renders create group module field row
 *
 * @return jsx for create group module field row
 */
function CreateGroupFieldRow({ index, fieldName, fieldType, changeDispatch }) {
  return (
    <div className="group-field-row">
      <input
        className="group-field-name-input"
        placeholder="Field name"
        value={fieldName}
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
        <option value="Email">Email</option>
        <option value="Text">Text</option>
        <option value="Number">Number</option>
      </select>
    </div>
  );
}

export default CreateGroupFieldRow;
