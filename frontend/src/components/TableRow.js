/**
 * 
 * 
 */
import React from "react";
import Pencil from "../images/Pencil.svg";
import TextField from "@material-ui/core";

export default function TableRow({ columnData, groupFields }) {
    const [editActivated, setEditActivated] = React.useState(false);

    return (
        <tr className="table-body-row" key={columnData.email}>
            {groupFields.map((field) => (
                <td className="table-body-cell">
                    {
                        editActivated ? 
                        (
                            <TextField />
                        )
                        :
                        columnData[field]
                    }
                </td>
            ))}

            <img src={Pencil} onClick={()=>setEditActivated(!editActivated)} className="pencil-svg" alt="edit icon on table row" />
        </tr>
    )
}