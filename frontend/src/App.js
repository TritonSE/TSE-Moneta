import React from "react";
import logo from './logo.svg';
import './App.css';
import SideNavigation from "./components/SideNavigation";

function App(props, state) {
  return (
    <div className="container">
      <SideNavigation></SideNavigation>
    </div>
  );
}

export default App;
