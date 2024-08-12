import React from "react";
import { useSelector } from "react-redux";
import dayjs from "dayjs";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import { Col, Row, Tooltip } from "antd";
import styled from "styled-components";
import { FaStar } from "react-icons/fa";


const ImportantCardStyle = styled.div`
  cursor: pointer;
  margin: 10px;
  background: white;
  box-shadow: 4px 4px 20px 0px #0000001f;

  &.completed {
    p {
      text-decoration: line-through;
      color: gray;
    }
  }

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

    .edit {
      font-size: 25px;
      margin-left: 10px;
      cursor: pointer;
      color: blue;
    }

    .delete {
      font-size: 25px;
      margin-left: 10px;
      cursor: pointer;
      color: red;
    }
  }
`;

const Deadline = () => {
  // Get all tasks from the Redux store
  const allTasks = useSelector((state) => state.newtask.newtask);
  const bookmarkedTasks = useSelector((state) => state.newtask.bookmarkedTasks);


  // Get today's date and the date two days from now
  const today = dayjs();
  const twoDaysFromNow = today.add(10, "day").endOf("day");

  // Filter tasks that are due within the next two days
  const tasksDueInTwoDays = allTasks.filter((task) => {
    const taskDueDate = dayjs(task.date); // Assuming task.date is in a format recognized by dayjs
    return taskDueDate.isAfter(today) && taskDueDate.isBefore(twoDaysFromNow);
  });

  return (
    <>

      {tasksDueInTwoDays.length === 0 ? (
          <p style={{textAlign:'center'}}>No tasks are due in the next two days.</p>
        ) : (
            <>
      {tasksDueInTwoDays.map((task, index) => (
        <>
          <div key={index}>
            <ImportantCardStyle>
              <Row className="taskcard_contents">
                <Col span={24} md={12}>
                  <div className="head_content">
                    <h4>Category: {task.category}</h4>
                  </div>
                </Col>
                <Col span={24} md={12}>
                  <div className="head_content">
                    <h4>Due Date: {task.date}</h4>
                  </div>
                </Col>
                <Col span={24} md={2} className="checkbox_style">
                  {/* <Checkbox
                    checked={completedTasks.some(
                      (task) => task.key === task.key
                    )}
                    onChange={() => handleCheckboxChange(task)}
                  /> */}
                </Col>
                <Col span={24} md={18}>
                  <p>{task.newTask}</p>
                </Col>
                <Col span={24} md={4} className="star">
                  {/* <Tooltip title="Important">
                    <FaStar
                      className={
                        bookmarkedTasks.find((task) => task.key === task.key)
                          ? "fill"
                          : "not_fill"
                      }
                      onClick={() => handleStarClick(task)}
                    />
                  </Tooltip>
                  <Tooltip title="Edit">
                    <MdOutlineEdit
                      className="edit"
                      onClick={() => EditTask(task)}
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <RiDeleteBin6Line
                      className="delete"
                      onClick={() => handleDeleteTask(task)}
                    />
                  </Tooltip> */}
                </Col>
              </Row>
            </ImportantCardStyle>
          </div>
        </>
      ))}
      </> )}
    </>
  );
};

export default Deadline;
