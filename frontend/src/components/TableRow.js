/**
 * 
 * 
 */
import React from "react";

import Pencil from "../images/Pencil.svg";
import CheckMark from "../images/checkMark.svg";
import Trashcan from "../images/trashCan.svg";

import "../css/TableRow.css";

export default function TableRow({ newRow, uploadTableData, deleteTableData, cellData, groupFields }) {
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
        if(editActivated) {
            inputFields.current.map(field => {
                field.parentNode.dataset.value = field.value;
            })
        }
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
                                    size="1"
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
                        cellDatas[field]
                    }
                </td>
            ))}
            <div 
                className="cell-aligner"
                style={editActivated ? {"gridTemplateColumns": "1fr 1fr"} : {}}
            >
                {
                    editActivated ? 
                    <>
                        <div className="icon-spacer">
                            <img src={Trashcan} onClick={()=>{
                                deleteTableData(cellDatas._id);
                                setEditActivated(!editActivated);
                            }} className="checkmark-svg clickable" alt="confirm edit icon on table row" />
                        </div>
                        <div className="icon-spacer">
                            <img src={CheckMark} onClick={()=>{
                                uploadTableData(cellDatas);
                                setEditActivated(!editActivated);
                            }} className="checkmark-svg clickable" alt="delete icon on table row" />
                        </div>
                    </>
                    :
                    <img src={Pencil} onClick={()=>setEditActivated(!editActivated)} className="pencil-svg clickable" alt="edit icon on table row" />
                }
            </div>
        </tr>
    )
}