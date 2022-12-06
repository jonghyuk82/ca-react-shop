import React from "react";
import { Outlet } from "react-router-dom";

function Event() {
  return (
    <div>
      <h4>Event</h4>
      <Outlet></Outlet>
    </div>
  );
}

export default Event;
