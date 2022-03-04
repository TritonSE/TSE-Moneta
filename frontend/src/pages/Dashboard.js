/**
 * Dashboard page with table and sidenav.
 *
 * @summary Dashboard page.
 * @author Alex Zhang
 */

import React, { useState } from "react";
import Select, { components } from "react-select";
import { Snackbar, Alert } from "@mui/material";
import SideNavigation from "../components/SideNavigation";
import Table from "../components/Table";
import AddIcon from "../images/AddIcon.svg";
import Plus from "../images/Plus";
import Pencil from "../images/Pencil";
import MenuToggle from "../images/MenuToggle.svg";
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
  const [CSVUploaded, setCSVUploaded] = useState(false);
  const [addingRow, setAddingRow] = useState(false);
  const [snackbar, setSnackbar] = React.useState({
    open: false,
    message: "",
    severity: "",
  });

  /** Dropdown options for the Select Group dropdown menu */
  const options = [
    { value: "create-new", label: "Create New", isCreate: true },
    { value: "group1", label: "Group 1", isCreate: false },
    { value: "group2", label: "Group 2", isCreate: false },
    { value: "group3", label: "Group 3", isCreate: false },
    { value: "group4", label: "Group 4", isCreate: false },
    { value: "group5", label: "Group 5", isCreate: false },
    { value: "group6", label: "Group 6", isCreate: false },
    { value: "group7", label: "Group 7", isCreate: false },
    { value: "group8", label: "Group 8", isCreate: false },
  ];

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
          options={options}
          placeholder="Select Group"
          styles={selectStyles}
          components={{ Option: iconOption }}
        />
        <button className="add-row clickable" type="button" onClick={()=>setAddingRow(!addingRow)}>
          <img src={AddIcon} className="dashboard add-icon-svg" alt="plus icon on add button" />
          Add row
        </button>
        <Table CSVUploaded={CSVUploaded} setSnackbar={setSnackbar} addingRow={addingRow} />
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
      <CreateGroup />
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
