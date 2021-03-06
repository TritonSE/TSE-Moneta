/**
 * Dashboard page with table and sidenav.
 *
 * @summary Dashboard page.
 * @author Alex Zhang
 * @author William Wu
 * @author Navid Boloorian
 * @author Elias Fang
 */

import React, { useState, useEffect, useCallback } from "react";
import Select, { components } from "react-select";
import { Snackbar, Alert } from "@mui/material";
import ReactLoading from "react-loading";
import SideNavigation from "../components/SideNavigation";
import Table from "../components/Table";
import AddIcon from "../images/AddIcon.svg";
import Plus from "../images/Plus";
import Pencil from "../images/Pencil";
import MenuToggle from "../images/MenuToggle.svg";
import SearchIcon from "../images/SearchIcon.svg";
import CreateIcon from "../images/CreateIcon.svg";
import AddIconBlue from "../images/AddIconBlue.svg";
import CSVParser from "../components/CSVParser";
import CreateGroup from "../components/CreateGroup";

import "../css/Dashboard.css";

/**
 * Renders the dashboard page
 *
 * @returns Contents of the dashboard page
 */
function Dashboard() {
  /**
   * State stores if the csv menu options should be displayed or not
   * Toggles if the three dots in the top left is clicked.
   */
  const [visible, setVisibility] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [dataLoading, setDataLoading] = useState(false);
  const [CSVUploaded, setCSVUploaded] = useState(false);
  const [addingRow, setAddingRow] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [Search, setSearch] = useState("");
  const [tableChanged, setTableChanged] = useState(false);
  const [orgInfo, setOrgInfo] = useState({});
  const [orgId, setOrgId] = useState();
  const [userInfo, setUserInfo] = useState({});
  const [CSVFlowVisible, setCSVFlowVisible] = useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const [groupOptions, setGroupOptions] = useState([]);
  let [selectedGroup, setSelectedGroup] = useState(null);
  const [editGroup, setEditGroup] = useState(null);
  const [groupCreationVisible, setGroupCreationVisible] = useState(false);
  const [groupEditVisible, setGroupEditVisible] = useState(false);
  const [CSVFields, setCSVFields] = useState(null); // stores fields from uploaded csv
  const [CSVData, setCSVData] = useState(null); // tracks if csv for group creation was uploaded

  /**
   * Fetches the list of groups and populates the options in the group selection dropdown.
   * @returns The new list of options
   */
  const fetchGroups = useCallback(async () => {
    try {
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/groups/${orgId}`);
      const { listOfGroups } = await response.json();
      const options = [
        { id: "", value: "create-new", values: [], label: "Create New", isCreate: true },
      ];

      if (listOfGroups) {
        for (const group of listOfGroups) {
          const { Name, _id, GroupId, Values } = group;
          options.push({ id: _id, value: GroupId, values: Values, label: Name, isCreate: false });
        }
      }

      setGroupOptions(options);
      if (selectedGroup === null && options.length > 1) {
        setSelectedGroup(options[1]);
      }
      return options;
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
      return [];
    }
  }, [orgId, selectedGroup]);

  /**
   * Fetches the rows in the given group which contain the given search string
   */
  const fetchRows = useCallback(async (groupID, searchString = "") => {
    try {
      const requestOptions = {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ group: groupID, search: searchString }),
      };
      const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/search`, requestOptions);
      const json = await response.json();

      setTableData(json);
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.message,
        severity: "error",
      });
    }
  }, []);

  /**
   * Callback which receives new group info from the create group module and sends a request to the
   * backend to create the group. If the creation succeeds, then the newly created group gets
   * displayed and the module gets closed.
   */
  const submitNewGroup = useCallback(
    async (groupName, groupFields) => {
      setCSVFields(null);
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/groups/${orgId}`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Name: groupName, Values: groupFields, OrganizationId: orgId }),
        });

        const json = await response.json();
        if (!response.ok) {
          throw new Error(json.msg ?? json.Error ?? json.message.message);
        }
        setGroupCreationVisible(false);

        // display the newly created group
        const {
          addGroup: { GroupId: newGroupID },
        } = json;
        const options = await fetchGroups();
        let group = null;
        for (const option of options) {
          if (option.value === newGroupID) {
            setSelectedGroup(option);
            group = option;
          }
        }

        // import CSV data if using
        if (CSVData != null) {
          setDataLoading(true);
          for (const row of CSVData) {
            const data = {
              group: group.id,
              data: row,
              organizationId: orgId,
            };
            await fetch(`${process.env.REACT_APP_BACKEND_URI}/rows`, {
              method: "POST",
              headers: {
                "Content-Type": "application/json",
              },
              body: JSON.stringify(data),
              mode: "cors",
            });
          }
          setDataLoading(false);
          setCSVUploaded(!CSVUploaded); // tell table to reload
          setSnackbar({
            open: true,
            message: "CSV uploaded!",
            severity: "success",
          });
          setCSVData(null);
          setCSVFields(null);
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.message,
          severity: "error",
        });
      }
    },
    [fetchGroups, orgId, CSVData, CSVUploaded]
  );

  /**
   * Callback for editing groups.
   */
  const submitEditGroup = useCallback(
    async (groupName, groupFields, editGroupId) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/groups/${editGroupId}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Name: groupName, Values: groupFields }),
          type: "cors",
        });

        setGroupEditVisible(false);

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.msg ?? json.Error ?? json.message.message);
        }

        setSnackbar({
          open: true,
          message: "Group updated!",
          severity: "success",
        });

        const options = await fetchGroups();
        for (const option of options) {
          if (option.id === editGroupId) {
            setSelectedGroup(option);
            return;
          }
        }
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.message,
          severity: "error",
        });
      }
    },
    [fetchGroups]
  );

  /**
   * Callback for deleting groups.
   */
  const submitDeleteGroup = useCallback(
    async (editGroupId) => {
      try {
        const response = await fetch(`${process.env.REACT_APP_BACKEND_URI}/groups/${editGroupId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          type: "cors",
        });

        const json = await response.json();

        if (!response.ok) {
          throw new Error(json.msg ?? json.Error ?? json.message.message);
        }

        await fetch(`${process.env.REACT_APP_BACKEND_URI}/rows?group=${editGroupId}`, {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
          },
          type: "cors",
        });

        setGroupEditVisible(false);
        const options = await fetchGroups();

        options.length > 1 ? setSelectedGroup(options[1]) : setSelectedGroup(groupOptions[0]);

        setSnackbar({
          open: true,
          message: "Group deleted!",
          severity: "success",
        });
      } catch (error) {
        setSnackbar({
          open: true,
          message: error.message,
          severity: "error",
        });
      }
    },
    [fetchGroups, groupOptions]
  );

  /**
   * Load information, finds out if user or org
   */
  const loadInfo = () => {
    setIsLoading(true);
    setUserInfo(JSON.parse(window.localStorage.getItem("userInfo")));
    setOrgInfo(JSON.parse(window.localStorage.getItem("orgInfo")));
    setIsLoading(false);
  };

  useEffect(() => {
    loadInfo();
  }, [window.localStorage.getItem("orgInfo"), window.localStorage.getItem("userInfo")]);

  /**
   * If user use user obj, otherwise use org obj
   */
  useEffect(() => {
    setOrgId(orgInfo ? orgInfo.id : userInfo.orgId);
  }, [orgInfo, userInfo]);

  /**
   * Initial group retrieval to populate group selection dropdown
   */
  useEffect(() => {
    fetchGroups();
  }, [fetchGroups]);

  /**
   * Update the table whenever a group is selected, the search string is changed, or
   * some CSV is uploaded
   */
  useEffect(() => {
    if (selectedGroup) {
      fetchRows(selectedGroup.id, Search);
      setAddingRow(false);
    }
  }, [fetchRows, selectedGroup, Search, CSVUploaded, tableChanged]);

  const handleSelectGroup = useCallback((option) => {
    if (option.isCreate) {
      setGroupCreationVisible(true);
    } else {
      setSelectedGroup(option);
    }
  }, []);

  const handleSnackClose = () => {
    setSnackbar({
      open: false,
      message: "",
      severity: "",
    });
  };

  /**
   * Custom option component for the Select Group dropdown menu
   * Includes an icon alongside the labeled dropdown row.
   */
  const iconOption = (props) => {
    if (props.data.isCreate) {
      return (
        <components.Option {...props} className="clickable">
          {props.data.label}
          <Plus className="Plus" />
        </components.Option>
      );
    }
    return (
      <components.Option {...props} className="clickable">
        {props.data.label}
        <button
          type="button"
          className="pencil-button"
          onClick={() => {
            setGroupEditVisible(true);
            setEditGroup(props.data);
          }}
        >
          <Pencil className="Pencil" />
        </button>
      </components.Option>
    );
  };

  /** Styling for the react-select Select Group dropdown menu. */
  const selectStyles = {
    control: (base, state) => ({
      ...base,
      border: "0px",
      background: "#F3F3F3",
      boxShadow: state.isFocused ? null : null,
      color: state.isSelected ? "#949494" : "#949494",
      cursor: "pointer",
    }),
    menu: (base) => ({
      ...base,
      overflow: 0,
      background: "#F3F3F3",
      borderRadius: 5,
      marginTop: 7,
      border: 0,
    }),
    option: (provided, state) => ({
      height: 36,
      paddingLeft: 15,
      paddingTop: 9,
      color: state.isFocused ? "#4B6A9B" : "#949494",
      background: state.isFocused ? "#F3F3F3" : "#F3F3F3",
      stroke: state.isFocused ? "#4B6A9B" : "#949494",
      fill: state.isFocused ? "#4B6A9B" : "#949494",
      cursor: "pointer",
    }),
    menuList: (base) => ({
      ...base,
      "::-webkit-scrollbar": {
        width: "6px",
        height: "0px",
      },
      "::-webkit-scrollbar-thumb": {
        background: "#888",
      },
    }),
    indicatorSeparator: () => null,
    closeMenuOnSelect: false,
  };

  /**
   * Hide csv dropdown when click outside of it
   */
  document.addEventListener("mouseup", function (e) {
    var dropdown = document.getElementById("csv-parser-dropdown");
    if (!dropdown.contains(e.target)) {
      setVisibility(false);
    }
  });

  if (isLoading || (!orgInfo && !userInfo)) {
    return (
      <div className="loading">
        <ReactLoading type="spin" color="#05204a" height={100} width={100} />
      </div>
    );
  }

  // When no groups exist, show no groups page
  if (groupOptions.length === 1) {
    return (
      <>
        <CSVParser
          CSVUploaded={CSVUploaded}
          setCSVUploaded={setCSVUploaded}
          snackbar={snackbar}
          setSnackbar={setSnackbar}
          orgId={orgId}
          setDataLoading={setDataLoading}
          setVisiblity={setVisibility}
          groupCreationVisible={groupCreationVisible}
          setGroupCreationVisible={setGroupCreationVisible}
          setCSVFields={setCSVFields}
          CSVData={CSVData}
          setCSVData={setCSVData}
          setCSVFlowVisible={setCSVFlowVisible}
          CSVFlowVisible={CSVFlowVisible}
          forceNewGroup={true}
        />
        <SideNavigation currentPage="/" userInfo={userInfo} />
        <div className="no-groups-div">
          <div className="no-groups-info-wrapper">
            <img src={CreateIcon} className="no-groups create-icon-svg" alt="create icon" />
            <br />
            <h1 className="no-groups-header">Start building your dashboard!</h1>
            <p className="no-groups-text">
              Click "Create new" to begin adding data to your table.
              <br />
              Have previous databases? No worries! You can upload your CSV file as well.
            </p>
            <button
              className="create-group clickable"
              type="button"
              onClick={() => {
                setGroupCreationVisible(true);
              }}
            >
              <img
                src={AddIconBlue}
                className="no-groups add-icon-svg"
                alt="plus icon on add button"
              />
              Create new
            </button>
            <button
              className="csv-create-group clickable"
              type="button"
              onClick={() => {
                setCSVFlowVisible(true);
              }}
            >
              <img src={AddIcon} className="no-groups add-icon-svg" alt="plus icon on add button" />
              Create from CSV
            </button>
            {groupCreationVisible && !CSVFields && (
              <CreateGroup
                onConfirm={submitNewGroup}
                onCancel={() => setGroupCreationVisible(false)}
              />
            )}

            {groupCreationVisible && CSVFields && (
              <CreateGroup
                onConfirm={submitNewGroup}
                onCancel={() => {
                  setGroupCreationVisible(false);
                  setCSVFields(null);
                  setCSVData(null);
                }}
                CSVFields={CSVFields}
              />
            )}
          </div>
        </div>
      </>
    );
  } else {
    return (
      <>
        <SideNavigation currentPage="/" userInfo={userInfo} />
        <div className="dashboard-div">
          <h1 className="dashboard-header">{orgInfo ? orgInfo.name : userInfo.orgName}</h1>
          <div className="dashboard-top-bar">
            <Select
              className="group-select"
              classNamePrefix="select"
              options={groupOptions}
              placeholder="Select Group"
              styles={selectStyles}
              components={{ Option: iconOption }}
              value={selectedGroup}
              onChange={handleSelectGroup}
            />
            {selectedGroup && (
              <button
                className="add-row clickable"
                type="button"
                onClick={() => setAddingRow(!addingRow)}
              >
                <img
                  src={AddIcon}
                  className="dashboard add-icon-svg"
                  alt="plus icon on add button"
                />
                Add row
              </button>
            )}
            <div className="toggle-csv-menu">
              <button
                type="button"
                onClick={() => {
                  setVisibility(!visible);
                }}
              >
                <img src={MenuToggle} className="menu-toggle-svg" alt="csv menu toggle button" />
              </button>
              <div id="csv-parser-dropdown" className="csv-parser-dropdown">
                {visible ? (
                  <CSVParser
                    CSVUploaded={CSVUploaded}
                    setCSVUploaded={setCSVUploaded}
                    snackbar={snackbar}
                    setSnackbar={setSnackbar}
                    selectedGroup={selectedGroup}
                    orgId={orgId}
                    setDataLoading={setDataLoading}
                    setVisiblity={setVisibility}
                    groupCreationVisible={groupCreationVisible}
                    setGroupCreationVisible={setGroupCreationVisible}
                    setCSVFields={setCSVFields}
                    CSVData={CSVData}
                    setCSVData={setCSVData}
                    setCSVFlowVisible={setCSVFlowVisible}
                    CSVFlowVisible={CSVFlowVisible}
                  />
                ) : null}
              </div>
            </div>
            <div className="dashboard-search-box">
              <input
                type="text"
                className="dashboard-search"
                placeholder="Search"
                value={Search}
                onChange={(event) => setSearch(event.target.value)}
              />
              <img src={SearchIcon} className="dashboard-search-icon" alt="Search" />
            </div>
          </div>
          {dataLoading ? (
            <div className="data-loading">
              <ReactLoading type="spin" color="#05204a" height={100} width={100} />
            </div>
          ) : (
            <Table
              CSVUploaded={CSVUploaded}
              setSnackbar={setSnackbar}
              addingRow={addingRow}
              group={selectedGroup}
              data={tableData}
              elementsPerPage={25}
              setTableChanged={setTableChanged}
              rerender={tableChanged}
            />
          )}
        </div>
        {groupCreationVisible && (
          <CreateGroup
            onConfirm={submitNewGroup}
            onCancel={() => {
              setGroupCreationVisible(false);
              setCSVFields(null);
              setCSVData(null);
            }}
            CSVFields={CSVFields}
          />
        )}
        {groupEditVisible && (
          <CreateGroup
            onConfirm={submitEditGroup}
            editGroup={editGroup}
            onDelete={submitDeleteGroup}
            onCancel={() => setGroupEditVisible(false)}
            CSVFields={null}
          />
        )}
        <div className="snackbar">
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
        </div>
      </>
    );
  }
}

export default Dashboard;
