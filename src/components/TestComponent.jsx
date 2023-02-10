import React, { useState } from "react";

export const TestComponent = () => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };
  return (
    <div onMouseEnter={toggleVisibility} onMouseLeave={toggleVisibility}>
      <div
        style={{
          backgroundColor: "rgba(0, 0, 0, 0.5)",
          width: "200px",
          height: "100%",
          position: "fixed",
          right: isVisible ? "0" : "-200px",
          top: "0",
          transition: "right 0.5s ease-in-out",
        }}
      >
        <p>Menu content goes here</p>
      </div>
    </div>
  );
};
