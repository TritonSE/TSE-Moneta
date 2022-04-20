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

import CreateIcon from "../images/CreateIcon.svg";
import AddIconBlue from "../images/AddIconBlue.svg";

import "../css/NoGroups.css";

/**
 * Renders no groups component
 * 
 * @return jsx for no groups component
 */
function NoGroups() {
    // const [groupCreationVisible, setGroupCreationVisible] = useState(false);

    return (
        <>
            <div className="no-groups-div">
                <img src={CreateIcon} className="no-groups create-icon-svg" alt="create icon" />
                <h1 className="no-groups-header">Start building your dashboard!</h1>
                <p className="no-groups-text">Click "Create new" to begin adding data to your table.<br />
                Have previous databases? No worries! You can upload your CSV file as well.</p>
                <button
                    className="create-group clickable"
                    type="button"
                >
                    <img src={AddIconBlue} className="no-groups add-icon-svg" alt="plus icon on add button" />
                    Create new
                </button>

                {/* {groupCreationVisible && (
                    <CreateGroup onConfirm={submitNewGroup} onCancel={() => setGroupCreationVisible(false)} />
                )} */}
            </div>
        </>
    );
}

export default NoGroups;