/**
 * Dashboard page with table and sidenav.
 *
 * @summary Dashboard page.
 */

import React, { useState } from "react";
import Select, { components } from "react-select";
import SideNavigation from "../components/SideNavigation";
import Table from "../components/Table";
import AddIcon from "../images/AddIcon.svg";
import Plus from "../images/Plus";
import Pencil from "../images/Pencil";
import MenuToggle from "../images/MenuToggle.svg";
import "../css/Dashboard.css";
import CSVParser from "../components/CSVParser";

const options = [
  { value: "create-row", label: "Create Row", isCreate: true },
  { value: "group1", label: "Group 1", isCreate: false },
  { value: "group2", label: "Group 2", isCreate: false },
  { value: "group3", label: "Group 3", isCreate: false },
  { value: "group4", label: "Group 4", isCreate: false },
  { value: "group5", label: "Group 5", isCreate: false },
  { value: "group6", label: "Group 6", isCreate: false },
  { value: "group7", label: "Group 7", isCreate: false },
  { value: "group8", label: "Group 8", isCreate: false },
];

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
/**
 * Renders the dashboard page
 *
 * @returns Contents of the dashboard page
 */
function Dashboard() {
  const [visible, setVisibility] = useState(false);
  return (
    <>
      <SideNavigation />
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
        <button className="add-row" type="button">
          <img src={AddIcon} className="dashboard add-icon-svg" alt="plus icon on add button" />
          Add row
        </button>
        <Table />
        <button
          type="button"
          className="toggle-csv-menu"
          onClick={() => {
            setVisibility(!visible);
          }}
        >
          <img src={MenuToggle} className="menu-toggle-svg" alt="csv menu toggle button" />
        </button>
        {visible ? <CSVParser /> : null}
      </div>
    </>
  );
}

export default Dashboard;
