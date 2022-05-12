/**
 * Table row component that displays information in table. Allows for editing, deleting, and row selection.
 *
 * @summary table row
 * @author  Navid Boloorian
 */
import React from "react";

import Pencil from "../images/Pencil.svg";
import CheckMark from "../images/CheckMark.svg";
import Trashcan from "../images/TrashCan.svg";

import "../css/TableRow.css";

export default function TableRow({
  id,
  newRow,
  createTableData,
  updateTableData,
  deleteTableData,
  selected,
  setSelected,
  cellData,
  groupFields,
}) {
  const inputFields = React.useRef([]);

  const [editActivated, setEditActivated] = React.useState(false);
  const [cellDatas, setCellDatas] = React.useState({});
  const [isLoading, setIsLoading] = React.useState(false);
  const [fieldDefaultSize, setFieldDefaultSize] = React.useState(1);

  React.useEffect(() => {
    setIsLoading(true);

    if (newRow) {
      setEditActivated(true);

      // sets the default width of input field to 5
      setFieldDefaultSize(5);

      // sets a blank default value for columns to allow for empty columns
      for (let i = 0; i < groupFields.length; i++) {
        cellData[groupFields[i].name] = "";
      }
    }

    setCellDatas(cellData);
    setIsLoading(false);
  }, [cellData]);

  React.useEffect(() => {
    if (editActivated) {
      inputFields.current.map((field) => {
        field.parentNode.dataset.value = field.value;
        return field;
      });
    }
  }, [editActivated]);

  if (isLoading) return <></>;

  /**
   * Removes or adds row id to selected set when checkbox is toggled
   * @param e - event
   */
  function handleCheckboxChange(e) {
    let selectedCopy = selected;
    if (!e.target.checked) {
      selectedCopy.delete(id);
    } else {
      selectedCopy.add(id);
    }
    setSelected(selectedCopy);
  }

  return (
    <tr className="table-body-row" key={cellData.email}>
      {!newRow ? (
        <td className="table-checkbox-cell">
          <input
            type="checkbox"
            name="row-selector"
            key={id}
            onChange={(e) => handleCheckboxChange(e)}
          />
        </td>
      ) : (
        <td></td>
      )}
      {groupFields.map((field, index) => (
        <td className="table-body-cell">
          {editActivated ? (
            // sets width of input fields when user types
            <div className="input-resizer">
              <input
                ref={(element) => {
                  inputFields.current[index] = element;
                  return element;
                }}
                type="text"
                size={fieldDefaultSize}
                className="edit-cell-input"
                value={cellDatas[field.name]}
                variant="outlined"
                onChange={(event) => {
                  event.target.parentNode.dataset.value = event.target.value;
                  setCellDatas({ ...cellDatas, [field.name]: event.target.value });
                }}
              />
            </div>
          ) : (
            cellDatas[field.name]
          )}
        </td>
      ))}
      <div
        className="cell-aligner"
        style={editActivated && !newRow ? { gridTemplateColumns: "1fr 1fr" } : {}}
      >
        {editActivated ? (
          <>
            {!newRow ? (
              <div className="icon-spacer">
                <img
                  src={Trashcan}
                  onClick={() => {
                    deleteTableData(id);
                    setEditActivated(!editActivated);
                  }}
                  className="table-delete-selected-svg clickable"
                  alt="confirm edit icon on table row"
                />
              </div>
            ) : (
              ""
            )}

            <div className={!newRow ? "icon-spacer" : ""} style={{ paddingRight: "22px" }}>
              <img
                src={CheckMark}
                onClick={() => {
                  /* eslint-disable */
                  newRow
                    ? createTableData(cellDatas)
                      ? setEditActivated(!editActivated)
                      : ""
                    : updateTableData(id, cellDatas)
                    ? setEditActivated(!editActivated)
                    : "";
                  /* eslint-enable */
                }}
                className="checkmark-svg clickable"
                alt="checkmark icon on table row"
              />
            </div>
          </>
        ) : (
          <img
            src={Pencil}
            onClick={() => setEditActivated(!editActivated)}
            className="pencil-svg clickable"
            alt="edit icon on table row"
          />
        )}
      </div>
    </tr>
  );
}
