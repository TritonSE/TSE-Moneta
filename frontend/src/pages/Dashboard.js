/**
 * Dashboard page with table and sidenav.
 *
 * @summary Dashboard page.
 */

import React from "react";
import SideNavigation from "../components/SideNavigation";
import Table from "../components/Table";

/**
 * Renders the dashboard page
 *
 * @returns Contents of the dashboard page
 */
function Dashboard() {
  return (
    <>
      <SideNavigation />
      <Table />
    </>
  );
}

export default Dashboard;
