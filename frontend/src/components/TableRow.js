/**
 *
 *
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
      setFieldDefaultSize(5);
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

  return (
    <tr className="table-body-row" key={cellData.email}>
      {groupFields.map((field, index) => (
        <td className="table-body-cell">
          {editActivated ? (
            <div className="input-resizer">
              <input
                ref={(element) => {inputFields.current[index] = element; return element}}
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
                  className="checkmark-svg clickable"
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
