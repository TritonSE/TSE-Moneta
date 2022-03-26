/**
 * The admin page displays a list of employees with access to the database.
 * Buttons are included to remove and add employees with access.
 *
 * @summary Admin page that allows users to view and edit employees with access.
 * @author Alex Zhang
 */

import React from "react";
import AddIcon from "../images/AddIcon.svg";
import SideNavigation from "../components/SideNavigation";
import AddUser from "../components/AddUser";
import "../css/Admin.css";

/**
 * Renders the admin page
 *
 * @returns Contents of the admin page
 */
function Admin() {
  const [orgInfo, setOrgInfo] = React.useState({});
  const [addUserVisible, setAddUserVisible] = React.useState(false);
  const [employees, setEmployees] = React.useState([]);

  React.useEffect(() => {
    setOrgInfo(JSON.parse(window.localStorage.getItem("orgInfo")));

  }, [window.localStorage.getItem("orgInfo")]);

  React.useEffect(async () => {
    getEmployees();
  }, [orgInfo]);

  const getEmployees = async () => {
    if(orgInfo) {
      const response = await fetch(`http://localhost:8082/users?organizationId=${orgInfo.id}`);
      const json = await response.json();

      setEmployees(json.getUser);
    }
  }

  const deleteEmployee = async (id) => {
    await fetch(`http://localhost:8082/users/${id}`, {
      method: "DELETE",
      mode: "cors",
    });

    getEmployees();
  }

  if(!orgInfo || !employees)
    return <>Loading</>

  return (
    <>
      <SideNavigation currentPage="/admin" />
      {addUserVisible && <AddUser orgId={orgInfo.id} setAddUserVisible={setAddUserVisible} />}
      <div>
        <div className="admin-div">
          <h1 className="admin-header">Employees with Access</h1>
          <table className="admin-table">
            {employees.map((entry) => (
              <tr className="admin-row" key={entry.email}>
                <td className="name">
                  {entry.fullName}
                </td>
                <td className="email">{entry.email}</td>
                <td className="remove">
                  <button onClick={() => {deleteEmployee(entry._id)}} className="remove-button" type="button">
                    Remove
                  </button>
                </td>
              </tr>
            ))}
          </table>
          <div className="add-div">
            <button onClick={() => setAddUserVisible(true)} className="add" type="button">
              <img src={AddIcon} className="admin add-icon-svg" alt="plus icon on add button" />
              Add
            </button>
          </div>
        </div>
      </div>
    </>
  );
}

export default Admin;
