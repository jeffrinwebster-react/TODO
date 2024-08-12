import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Checkbox, Col, Divider, Drawer, Row } from "antd";
import { useForm } from "react-hook-form";

const CompletedHead = styled.div`
  padding: 20px;

  & input {
    width: 100%;
    padding: 10px;
    border: 1px solid #d9d9d9;
    border-radius: 4px;
    font-size: 16px;
    margin-top: 5px;

    &:focus {
      outline: none;
      border-color: #1890ff;
      box-shadow: 0 0 8px rgba(24, 144, 255, 0.6);
    }
  }
`;

const ImportantCardStyle = styled.div`
  cursor: pointer;
  margin: 10px;
  background: white;
  box-shadow: 4px 4px 20px 0px #0000001f;

  .taskcard_contents {
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;

    .head_content {
      display: flex;
      justify-content: space-around;
      margin: 10px;

      h4 {
        background: blue;
        color: white;
        padding: 10px;
      }
    }

    .checkbox_style {
      text-align: center;
    }

    .star {
      text-align: center;
      font-size: 30px;

      .not_fill {
        color: lightgray;
      }

      .fill {
        color: gold;
      }
    }
  }
`;

const DrawerStyle = styled(Drawer)`
  p {
    color: blue;
    text-align: center;
    border: 1px solid #f6e6e6;
    padding: 10px;
    cursor: pointer;
  }

  .ant-drawer-body {
    margin: 10px;
  }
`;

const Completed = () => {
  const { register } = useForm();
  const completedTasks = useSelector((state) => state.newtask.completedTasks);
  const bookmarkedTasks = useSelector((state) => state.newtask.bookmarkedTasks);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [searchQuery, setSearchQuery] = useState(""); // State to track search query

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  // Filter completed tasks based on search query
  const filteredTasks = completedTasks.filter(
    (task) =>
      task.newTask.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <CompletedHead>
      <Row>
        <Col span={24} md={12}>
          {completedTasks.length > 0 && (
            <h1 style={{ padding: "10px", textAlign: "start" }}>
              Completed Tasks
            </h1>
          )}
        </Col>

        <Col span={24} md={6}>
        {completedTasks.length > 0 && (
          <input
            {...register("search")}
            placeholder="Search..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)} // Update search query state
          />
        )}
        </Col>
      </Row>
      <br />
      {filteredTasks.map((item, index) => (
        <div key={index}>
          <ImportantCardStyle>
            <Row className="taskcard_contents">
              <Col span={24} md={12}>
                <div className="head_content">
                  <h4>Category: {item.category}</h4>
                </div>
              </Col>
              <Col span={24} md={12}>
                <div className="head_content">
                  <h4>Due Date: {item.date}</h4>
                </div>
              </Col>
              <Col span={24} md={22} onClick={showDrawer}>
                <p>{item.newTask}</p>
              </Col>
            </Row>
          </ImportantCardStyle>
        </div>
      ))}
    </CompletedHead>
  );
};

export default Completed;
