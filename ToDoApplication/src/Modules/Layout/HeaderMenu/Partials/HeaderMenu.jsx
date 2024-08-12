import React, { useEffect } from "react";
import styled from "styled-components";
import { useTheme } from "../../../ThemeProvider/ThemeProvider";
import { Switch } from "antd";

const Headermenu = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  justify-content: center; /* Center the content */
  align-items: center;
  position: relative; /* Enable absolute positioning of the switch */
  background: ${({ isDarkMode }) => (isDarkMode ? "#333" : "#a3c5f4")};

  h1 {
    color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#000")};
    position: absolute; /* Position the heading absolutely */
    left: 50%; /* Center horizontally */
    transform: translateX(-50%); /* Adjust for the width of the heading */
  }

  .switch-container {
    position: absolute; /* Position the switch absolutely */
    right: 20px; /* Add some space from the right */
  }
`;

const HeaderMenu = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 't') {
        console.log("T key pressed"); // Debugging: Check if the keypress is detected
        toggleTheme();
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [toggleTheme]);

  return (
    <Headermenu isDarkMode={isDarkMode}>
      <h1>To Do</h1>
      <div className="switch-container">
        <Switch onClick={toggleTheme} checked={isDarkMode} />
      </div>
    </Headermenu>
  );
};

export default HeaderMenu;
