/**
 * 
 * 
 */
import React from "react";

import Pencil from "../images/Pencil.svg";
import CheckMark from "../images/CheckMark.svg";

import "../css/TableRow.css";

export default function TableRow({ cellData, groupFields }) {
    const inputFields = React.useRef([]);

    const [editActivated, setEditActivated] = React.useState(false);
    const [cellDatas, setCellDatas] = React.useState({});
    const [isLoading, setIsLoading] = React.useState(false);

    React.useEffect(() => {
        setIsLoading(true);
        setCellDatas(cellData);
        setIsLoading(false);
    }, [])

    React.useEffect(() => {
        inputFields.current.map(field => {
            console.log(field.parentNode)
            field.parentNode.dataset.value = field.value;
        })

        console.log(inputFields.current);
    }, [editActivated])

    if(isLoading)
        return <></>

    return (
        <tr className="table-body-row" key={cellData.email}>
            {groupFields.map((field, index) => (
                <td className="table-body-cell">
                    {
                        editActivated ? 
                        (
                            <div className="input-resizer">
                                <input
                                    ref={element => inputFields.current[index] = element}
                                    type="text"
                                    size={1}
                                    className="edit-cell-input"
                                    value={cellDatas[field]}
                                    variant="outlined"
                                    onChange={event => {
                                        event.target.parentNode.dataset.value=event.target.value;
                                        setCellDatas({...cellDatas, [field]: event.target.value})
                                    }}
                                />
                            </div>
                        )
                        :
                        cellData[field]
                    }
                </td>
            ))}

            {
                editActivated ? 
                <img src={CheckMark} onClick={()=>setEditActivated(!editActivated)} className="checkmark-svg clickable" alt="edit icon on table row" />
                :
                <img src={Pencil} onClick={()=>setEditActivated(!editActivated)} className="pencil-svg clickable" alt="edit icon on table row" />
            }  
        </tr>
    )
}