import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./join.css";

function Join() {
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Trident</h1>
        <Link onClick to={`/login`}>
          <button className="button mt-20" type="submit">
            Get Started
          </button>
        </Link>
      </div>
    </div>
  );
}
export default Join;
