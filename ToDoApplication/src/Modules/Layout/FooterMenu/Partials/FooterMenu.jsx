import React from "react";
import styled from "styled-components";
import { useTheme } from "../../../ThemeProvider/ThemeProvider";
import { Col, Row, Switch } from "antd";
import { FaGithub } from "react-icons/fa";

const Headermenu = styled.div`
  width: 100%;
  height: 10vh;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  background: ${({ isDarkMode }) => (isDarkMode ? "#333" : "#a3c5f4")};

  p {
    color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#000")};
    margin: 0;
  }

  .follow {
    margin-top: 5px;
    display: flex;
    align-items: center;
    gap: 10px;

    a {
      color: ${({ isDarkMode }) => (isDarkMode ? "#fff" : "#000")};
      /* margin-left: 8px; */
      font-size: 1.2rem;
    }
  }
`;

const FooterMenu = () => {
  const { isDarkMode, toggleTheme } = useTheme();

  return (
    <Headermenu isDarkMode={isDarkMode}>
      <div className="follow">
      <p>Jeffrin Webster</p>
      <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a>
        {/* <p>Follow Me On : </p>
        <a href="https://github.com" target="_blank" rel="noopener noreferrer">
          <FaGithub />
        </a> */}
      </div>
      {/* <Switch onClick={toggleTheme} /> */}
    </Headermenu>
  );
};

export default FooterMenu;
