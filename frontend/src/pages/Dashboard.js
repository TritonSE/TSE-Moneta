/**
 * Dashboard page with table and sidenav.
 *
 * @summary Dashboard page.
 * @author Alex Zhang
 * @author William Wu
 */

import React, { useState, useEffect, useCallback } from "react";
import Select, { components } from "react-select";
import { Snackbar, Alert } from "@mui/material";
import SideNavigation from "../components/SideNavigation";
import Table from "../components/Table";
import AddIcon from "../images/AddIcon.svg";
import Plus from "../images/Plus";
import Pencil from "../images/Pencil";
import MenuToggle from "../images/MenuToggle.svg";
import SearchIcon from "../images/SearchIcon.svg";
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
  const [CSVUploaded, setCSVUploaded] = useState(false);
  const [tableData, setTableData] = useState([]);
  const [Search, setSearch] = useState("");
  const [orgInfo, setOrgInfo] = useState({});
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  const [groupOptions, setGroupOptions] = useState([]);
  const [selectedGroup, setSelectedGroup] = useState(null);
  const [groupCreationVisible, setGroupCreationVisible] = useState(false);

  /**
   * Fetches the list of groups and populates the options in the group selection dropdown.
   * @returns The new list of options
   */
  const fetchGroups = useCallback(async () => {
    try {
      const response = await fetch("http://localhost:8082/groups");
      const { listOfGroups } = await response.json();
      const options = [{ value: "create-new", values: [], label: "Create New", isCreate: true }];
      for (const group of listOfGroups) {
        const { Name, GroupId, Values } = group;
        options.push({ value: GroupId, values: Values, label: Name, isCreate: false });
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
  }, []);

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
      const response = await fetch("http://localhost:8082/search", requestOptions);
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
      try {
        const response = await fetch("http://localhost:8082/groups", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ Name: groupName, Values: groupFields }),
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
        for (const option of options) {
          if (option.value === newGroupID) {
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

  useEffect(() => {
    setIsLoading(true);
    setOrgInfo(JSON.parse(window.localStorage.getItem("orgInfo")));
    setIsLoading(false);
  }, [window.localStorage])

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
      fetchRows(selectedGroup.value, Search);
    }
  }, [selectedGroup, Search, CSVUploaded]);

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
        <components.Option {...props}>
          {props.data.label}
          <Plus className="Plus" />
        </components.Option>
      );
    }
    return (
      <components.Option {...props}>
        {props.data.label}
        <Pencil className="Pencil" />
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

  if(isLoading)
    return <>Loading</>;

  return (
    <>
      <SideNavigation currentPage="/" />
      <div className="dashboard-div">
        <h1 className="dashboard-header">{orgInfo.name}</h1>
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
        <button className="add-row" type="button">
          <img src={AddIcon} className="dashboard add-icon-svg" alt="plus icon on add button" />
          Add row
        </button>
        <Table group={selectedGroup} data={tableData} elementsPerPage={25} />
        <input
          type="text"
          className="dashboard-search"
          placeholder="Search"
          value={Search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <img src={SearchIcon} className="dashboard-search-icon" alt="Search" />
        <button
          type="button"
          className="toggle-csv-menu"
          onClick={() => {
            setVisibility(!visible);
          }}
        >
          <img src={MenuToggle} className="menu-toggle-svg" alt="csv menu toggle button" />
        </button>
        {visible ? (
          <CSVParser
            CSVUploaded={CSVUploaded}
            setCSVUploaded={setCSVUploaded}
            snackbar={snackbar}
            setSnackbar={setSnackbar}
          />
        ) : null}
      </div>
      {groupCreationVisible && (
        <CreateGroup onConfirm={submitNewGroup} onCancel={() => setGroupCreationVisible(false)} />
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

export default Dashboard;
