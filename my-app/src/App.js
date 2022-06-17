import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./App.css";
import Join from "./components/Join/join";
import Login from "./components/login/login";

function App() {
  return (
    <>
      <Router>
        {/* <Join /> */}
        <Routes>
          <Route path="/" element={<Join />} />
          <Route path="/login" element={<Login />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
