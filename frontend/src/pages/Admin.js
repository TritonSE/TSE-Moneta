/**
 * The admin page displays a list of employees with access to the database.
 * Buttons are included to remove and add employees with access.
 *
 * @summary Admin page that allows users to view and edit employees with access.
 * @author Alex Zhang
 * @author Navid Boloorian
 */

import React from "react";
import { Snackbar, Alert } from "@mui/material";
import ReactLoading from "react-loading";
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
  const [isLoading, setIsLoading] = React.useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const handleSnackClose = () => {
    setSnackbar({
      open: false,
      message: "",
      severity: "",
    });
  };

  React.useEffect(() => {
    setIsLoading(true);
    setOrgInfo(JSON.parse(window.localStorage.getItem("orgInfo")));
    setIsLoading(false);
  }, [window.localStorage.getItem("orgInfo")]);

  const getEmployees = async () => {
    setIsLoading(true);
    if (orgInfo) {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/users?organizationId=${orgInfo.id}`);
      const json = await response.json();

      setEmployees(json.getUser);
    }
    setIsLoading(false);
  };

  React.useEffect(async () => {
    getEmployees();
  }, [orgInfo, addUserVisible]);

  const deleteEmployee = async (id) => {
    setIsLoading(true);
    const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/users/${id}`, {
      method: "DELETE",
      mode: "cors",
    });
    setIsLoading(false);

    if (response.ok)
      setSnackbar({
        open: true,
        message: "User deleted!",
        severity: "success",
      });
    else
      setSnackbar({
        open: true,
        message: "Something went wrong",
        severity: "error",
      });

    getEmployees();
  };

  if (isLoading || !orgInfo)
    return (
      <div className="loading">
        <ReactLoading type="spin" color="#05204a" height={100} width={100} />
      </div>
    );

  return (
    <>
      <SideNavigation currentPage="/admin" />
      {addUserVisible && (
        <AddUser
          setSnackbar={setSnackbar}
          orgId={orgInfo.id}
          setAddUserVisible={setAddUserVisible}
        />
      )}
      <div>
        <div className="admin-div">
          <h1 className="admin-header">Employees with Access</h1>
          <table className="admin-table">
            {employees &&
              employees.map((entry) => (
                <tr className="admin-row" key={entry.email}>
                  <td className="name">{entry.fullName}</td>
                  <td className="email">{entry.email}</td>
                  <td className="remove">
                    <button
                      onClick={() => {
                        deleteEmployee(entry._id);
                      }}
                      className="remove-button"
                      type="button"
                    >
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
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={handleSnackClose}
        anchorOrigin={{ horizontal: "center", vertical: "bottom" }}
      >
        <Alert
          onClose={handleSnackClose}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
          variant="filled"
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </>
  );
}

export default Admin;
