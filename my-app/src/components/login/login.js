import React, { useState } from "react";
import { Link } from "react-router-dom";
import "./login.css";

function Login() {
  return (
    <div className="joinOuterContainer">
      <div className="joinInnerContainer">
        <h1 className="heading">Login</h1>
        {/* <Link onClick={(event) => event.preventDefault()} to={"/login"}> */}
        <button className="button mt-20" type="submit">
          Login
        </button>
        {/* </Link> */}
      </div>
    </div>
  );
}
export default Login;
