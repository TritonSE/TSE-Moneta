/**
 * Dashboard page with table and sidenav.
 *
 * @summary Dashboard page.
 */

import React from "react";
import SideNavigation from "../components/SideNavigation";
import Table from "../components/Table";
import "../css/Dashboard.css";
import AddIcon from "../images/AddIcon.svg";

/**
 * Renders the dashboard page
 *
 * @returns Contents of the dashboard page
 */
function Dashboard() {
  return (
    <>
      <SideNavigation />
      <div className="dashboard-div">
        <h1 className="dashboard-header">Name of Nonprofit</h1>
        <button className="add-row" type="button">
          <img src={AddIcon} className="dashboard add-icon-svg" alt="plus icon on add button" />
          Add row
        </button>
        <Table />
      </div>
    </>
  );
}

export default Dashboard;
