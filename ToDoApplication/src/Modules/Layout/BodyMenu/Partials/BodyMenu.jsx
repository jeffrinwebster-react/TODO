import React from "react";
import styled from "styled-components";

const BodymeuHead = styled.div`
  width: 100%;
  height: 80vh;
  overflow-y:scroll;

`;

const BodymenuSec = styled.div`
  margin: 20px;
  /* height: 73vh; */
  /* border: 2px solid #eef2f3; */
`;

const BodyMenu = ({children}) => {
  return (
    <BodymeuHead>
      <BodymenuSec>{children}</BodymenuSec>
    </BodymeuHead>
  );
};

export default BodyMenu;
