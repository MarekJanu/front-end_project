import { Link } from "react-router-dom";
import "../App.css";
import { Switch } from "@mui/material";
import { useState } from "react";

export const Nav = ({ mode, setMode }) => {
  const [switchOnOff, setSwitch] = useState(true);
  const themeMatrix = { false: "light", true: "dark" };
  const handleChange = (e) => {
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
      <span className="darkSpan">
        &nbsp;{"go "}
        {themeMatrix[switchOnOff]}
        <Switch checked={switchOnOff} onChange={handleChange} />
        &nbsp;
      </span>
    </>
  );
};
