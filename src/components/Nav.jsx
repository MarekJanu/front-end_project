import { Link } from "react-router-dom";
import "../App.css";
import { Switch } from "@mui/material";
import { useState } from "react";

export const Nav = ({ mode, setMode }) => {
  const [switchOnOff, setSwitch] = useState(true);
  const handleChange = (e) => {
    // e.preventDefault();
    if (mode === "App") {
      setSwitch(false);
      setMode("darkMode");
    } else {
      setSwitch(true);
      setMode("App");
    }
  };
  return (
    <>
      <section className="navbar">
        <Link to="/" className="active">
          Home
        </Link>
        <Link to="/topics/coding">coding</Link>
        <Link to="/topics/football">football</Link>
        <Link to="/topics/cooking">cooking</Link>
      </section>
      <Switch checked={switchOnOff} onChange={handleChange} />
    </>
  );
};
