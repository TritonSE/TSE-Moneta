/**
 * If no groups exist, show the user a message saying
 * that no groups have been made yet and allow the user
 * to create their first group.
 * 
 * @summary No groups component
 * @author Elias Fang
 */

import React from "react";
import CreateGroup from "./CreateGroup";
import AddIcon from "../images/AddIcon.svg";

import "../css/NoGroups.css";

/**
 * Renders no groups component
 * 
 * @return jsx for no groups component
 */
function NoGroups() {
    const [groupCreationVisible, setGroupCreationVisible] = useState(false);

    return (
        <>
            <h1>Start building your dashboard!</h1>
            <p>Click "Create new" to begin adding data to your table.</p>
            <p>Have previous databases? No worries! You can upload your CSV file as well.</p>
            <button
                className="create-group clickable"
                type="button"
            >
                <img src={AddIcon} className="add-icon-svg" alt="plus icon on add button" />
                Add row
            </button>

            {groupCreationVisible && (
                <CreateGroup onConfirm={submitNewGroup} onCancel={() => setGroupCreationVisible(false)} />
            )}
        </>
    );
}

export default NoGroups;