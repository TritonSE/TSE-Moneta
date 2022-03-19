/**
 * Dashboard page with table and sidenav.
 *
 * @summary Dashboard page.
 * @author Alex Zhang
 */

import React, { useState, useEffect } from "react";
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
  const [displayCSVMenu, setDisplayCSVMenu] = useState(false);
  const [displayCreateGroup, setDisplayCreateGroup] = useState(false);
  const [CSVUploaded, setCSVUploaded] = useState(false);
  const [dropdownOptions, setDropdownOptions] = useState([]);
  const [currentGroup, setCurrentGroup] = useState({});
  const [tableData, setTableData] = useState([]);
  const [search, setSearch] = useState("");
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  useEffect(async () => {
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ group: currentGroup.GroupId, search }),
    };
    await fetch("http://localhost:8082/search", requestOptions).then(async (response) => {
      const json = await response.json();
      setTableData(json);
    });
    await fetch("http://localhost:8082/groups").then(async (response) => {
      const json = await response.json();
      const options = [{ value: "create-new", label: "Create New", isCreate: true }];
      if (Object.keys(currentGroup).length === 0 && json.listOfGroups.length > 0) {
        /** Set initial group to the first in the dropdown if no group set yet */
        setCurrentGroup(json.listOfGroups[0]);
      }
      json.listOfGroups.map((group) =>
        options.push({ value: group, label: group.Name, isCreate: false })
      );
      setDropdownOptions(options);
    });
  }, [search, CSVUploaded, currentGroup]);

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

  return (
    <>
      <SideNavigation currentPage="/" />
      <div className="dashboard-div">
        <h1 className="dashboard-header">Name of Nonprofit</h1>
        <Select
          className="group-select"
          classNamePrefix="select"
          options={dropdownOptions}
          placeholder="Select Group"
          styles={selectStyles}
          components={{ Option: iconOption }}
          onChange={(option) =>
            option.isCreate ? setDisplayCreateGroup(true) : setCurrentGroup(option.value)
          }
        />
        <button className="add-row" type="button">
          <img src={AddIcon} className="dashboard add-icon-svg" alt="plus icon on add button" />
          Add row
        </button>
        <Table data={tableData} group={currentGroup} elementsPerPage={20} />
        <input
          type="text"
          className="dashboard-search"
          placeholder="Search"
          value={search}
          onChange={(event) => setSearch(event.target.value)}
        />
        <img src={SearchIcon} className="dashboard-search-icon" alt="Search" />
        <button
          type="button"
          className="toggle-csv-menu"
          onClick={() => {
            setDisplayCSVMenu(!displayCSVMenu);
          }}
        >
          <img src={MenuToggle} className="menu-toggle-svg" alt="csv menu toggle button" />
        </button>
        {displayCSVMenu ? (
          <CSVParser
            CSVUploaded={CSVUploaded}
            setCSVUploaded={setCSVUploaded}
            snackbar={snackbar}
            setSnackbar={setSnackbar}
          />
        ) : null}
      </div>
      {displayCreateGroup ? <CreateGroup /> : null}
      <div className="snackbar">
        {snackbar.severity === "" ? (
          ""
        ) : (
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
        )}
      </div>
    </>
  );
}

export default Dashboard;
