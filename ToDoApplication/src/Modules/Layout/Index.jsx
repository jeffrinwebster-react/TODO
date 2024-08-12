import React from "react";
import { Row, Col } from "antd";
import HeaderMenu from "./HeaderMenu/Partials/HeaderMenu";
import SideMenu from "./SideMenu/Partials/SideMenu";
import BodyMenu from "./BodyMenu/Partials/BodyMenu";
import AddNewTask from "../NewTask/Partials/AddNewTask";
import NewTaskCard from "../NewTask/Partials/NewTaskCard";
import FooterMenu from "./FooterMenu/Partials/FooterMenu";

const Layout = ({ children }) => {
  return (
    <>
      <HeaderMenu />
      <Row>
        <Col span={24} md={5}>
          <SideMenu />
        </Col>
        <Col span={24} md={19}>
        {/* <AddNewTask />
        <NewTaskCard/> */}
          <BodyMenu> {children} </BodyMenu>
        </Col>
      </Row>
      <FooterMenu />
    </>
  );
};

export default Layout;
