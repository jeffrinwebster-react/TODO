import React, { useState } from "react";
import { Checkbox, Col, Divider, Drawer, Row, Button, Tooltip, Modal } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { FaStar, FaEdit, FaTrash } from "react-icons/fa"; // Import edit and delete icons
import styled from "styled-components";
import {
  toggleBookmark,
  toggleCompleted,
  deleteTask,
  editTask,
} from "./NewTaskSlice";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddNewTask from "./AddNewTask";

const NewTaskCardStyle = styled.div`
  cursor: pointer;
  margin: 10px;
  background: white;
  box-shadow: 4px 4px 20px 0px #0000001f;

  /* Styles for completed tasks */
  &.completed {
    p {
      text-decoration: line-through; /* Strike-through text */
      color: gray; /* Change text color for completed tasks */
    }
  }

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

  .taskcard_contents {
    padding: 15px;
    display: flex;
    justify-content: center;
    align-items: center;

    .checkbox_style {
      text-align: center;
    }

    .star {
      display: flex;
      justify-content: center;
      gap: 5px;
      /* text-align: center; */
      font-size: 25px;

      .not_fill {
        color: lightgray;
      }

      .fill {
        color: gold;
      }
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
`;

const NewTaskCard = () => {
  const [isDrawerVisible, setDrawerVisible] = useState(false);
  const [currentTask, setCurrentTask] = useState(null); // State to hold the current task for editing

   // Usestate
   const [isModalOpen, setIsModalOpen] = useState(false);
   const [modalTitle, setModalTitle] = useState("");
   const [modalContent, setModalContent] = useState(null);
   const [modalWidth, setModalWidth] = useState(0);
   const [trigger, setTrigger] = useState(0);
 
   // ----------- Modal - Start ----------
 
   const showModal = () => {
     setIsModalOpen(true);
   };
 
   const handleOk = () => {
     setIsModalOpen(false);
   };
 
   // ----------- Modal - End ----------
 

  const getnewtaskData = useSelector((state) => state.newtask.newtask);
  const bookmarkedTasks = useSelector((state) => state.newtask.bookmarkedTasks);
  const completedTasks = useSelector((state) => state.newtask.completedTasks);

  const dispatch = useDispatch();


  const handleCheckboxChange = (item) => {
    dispatch(toggleCompleted(item)); // Toggle the completed status
  };

  const handleDeleteTask = (task) => {
    dispatch(deleteTask(task.key)); // Dispatch delete action with task key
  };

  const EditTask = (item) => {
    setModalWidth(800)
    setCurrentTask(item);
    setModalTitle("Edit Task");
    setModalContent(<AddNewTask updateRecord={item} formClose={handleOk} />);
    setIsModalOpen(true);
  };

  return (
    <>
      {/* Active Tasks Section */}
      {getnewtaskData
        .filter((item) => !completedTasks.some((task) => task.key === item.key)) // Exclude completed tasks from the active list
        .map((item, index) => (
          <div key={index}>
            <NewTaskCardStyle>
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
                <Col span={24} md={2} className="checkbox_style">
                  <Checkbox
                    checked={completedTasks.some(
                      (task) => task.key === item.key
                    )} // Check if the task is completed
                    onChange={() => handleCheckboxChange(item)} // Handle checkbox change
                  />
                </Col>
                <Col span={24} md={18} onClick={() => showDrawer(item)}>
                  <p>{item.newTask}</p>
                </Col>
                <Col span={24} md={4} className="star">
                  <Tooltip title="Important">
                    <FaStar
                      className={
                        bookmarkedTasks.find((task) => task.key === item.key)
                          ? "fill"
                          : "not_fill"
                      }
                      onClick={() => dispatch(toggleBookmark(item))}
                    />
                  </Tooltip>
                  <Tooltip title="Edit">
                    <MdOutlineEdit
                      className="edit"
                      onClick={() => EditTask(item)}
                    />
                  </Tooltip>
                  <Tooltip title="Delete">
                    <RiDeleteBin6Line
                      className="delete"
                      onClick={() => handleDeleteTask(item)}
                    />
                  </Tooltip>
                </Col>
              </Row>
            </NewTaskCardStyle>
          </div>
        ))}

      {completedTasks.length > 0 && (
        <Divider orientation="center" style={{ color: "blue" }}>
          Completed
        </Divider>
      )}

      {/* Completed Tasks Section */}
      {completedTasks.map((completedTask, index) => (
        <div key={index}>
          <NewTaskCardStyle className="completed">
            {" "}
            {/* Apply completed class here */}
            <Row className="taskcard_contents">
              <Col span={24} md={12}>
                <div className="head_content">
                  <h4>Category: {completedTask.category}</h4>
                </div>
              </Col>
              <Col span={24} md={12}>
                <div className="head_content">
                  <h4>Due Date: {completedTask.date}</h4>
                </div>
              </Col>
              <Col span={24} md={2} className="checkbox_style">
                <Checkbox
                  checked={true} // Indicates it's currently completed
                  onChange={() => handleCheckboxChange(completedTask)} // Toggle it back to active when unchecked
                />
              </Col>
              <Col span={24} md={22}>
                <p>{completedTask.newTask}</p>{" "}
                {/* Strike-through style applied via CSS */}
              </Col>
              {/* <Col span={24} md={4} className="star">
                <FaStar
                  className={
                    bookmarkedTasks.find(
                      (task) => task.key === completedTask.key
                    )
                      ? "fill"
                      : "not_fill"
                  }
                  onClick={() => dispatch(toggleBookmark(completedTask))}
                />
                <FaEdit
                  className="icon_style"
                  onClick={() => showDrawer(completedTask)}
                />
                <FaTrash
                  className="icon_style"
                  onClick={() => handleDeleteTask(completedTask)}
                />
              </Col> */}
            </Row>
          </NewTaskCardStyle>
        </div>
      ))}
        <Modal
        title={modalTitle}
        open={isModalOpen}
        width={modalWidth}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        {modalContent}
      </Modal>
    </>
  );
};

export default NewTaskCard;
