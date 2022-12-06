import React from "react";
import { Outlet } from "react-router-dom";

function About() {
  return (
    <div>
      <h4>About</h4>
      <Outlet></Outlet>
    </div>
  );
}

export default About;
