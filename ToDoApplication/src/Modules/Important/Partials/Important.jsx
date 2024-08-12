import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { Checkbox, Col, Divider, Modal, Row, Tooltip } from "antd";
import { FaStar } from "react-icons/fa";
import {
  deleteTask,
  toggleBookmark,
  toggleCompleted,
} from "../../NewTask/Partials/NewTaskSlice";
import { MdOutlineEdit } from "react-icons/md";
import { RiDeleteBin6Line } from "react-icons/ri";
import AddNewTask from "../../NewTask/Partials/AddNewTask";
import { useForm } from "react-hook-form";

const ImportantHead = styled.div`
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

const Important = () => {
  const { register } = useForm();
  const bookmarkedTasks = useSelector((state) => state.newtask.bookmarkedTasks);
  const completedTasks = useSelector((state) => state.newtask.completedTasks);
  const dispatch = useDispatch();

  const [open, setOpen] = useState(false);
  const [placement, setPlacement] = useState("right");
  const [currentTask, setCurrentTask] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [modalWidth, setModalWidth] = useState(0);

  const showDrawer = () => {
    setOpen(true);
  };

  const onClose = () => {
    setOpen(false);
  };

  const handleCheckboxChange = (item) => {
    dispatch(toggleCompleted(item));
  };

  const handleStarClick = (task) => {
    dispatch(toggleBookmark(task));
  };

  const handleDeleteTask = (task) => {
    dispatch(deleteTask(task.key));
  };

  const EditTask = (item) => {
    setModalWidth(800);
    setCurrentTask(item);
    setModalTitle("Edit Important Task");
    setModalContent(
      <AddNewTask
        importantRecord={item}
        formClose={() => setIsModalOpen(false)}
      />
    );
    setIsModalOpen(true);
  };

  const filteredTasks = bookmarkedTasks.filter(
    (task) =>
      task.newTask.toLowerCase().includes(searchQuery.toLowerCase()) ||
      task.category.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <ImportantHead>
      <Row>
        <Col span={24} md={12}>
          {bookmarkedTasks.length > 0 && (
            <h1 style={{ padding: "10px", textAlign: "start" }}>
              Important Tasks
            </h1>
          )}
        </Col>

        <Col span={24} md={6}>
          {bookmarkedTasks.length > 0 && (
            <input
              {...register("search")}
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          )}
        </Col>
      </Row>
      <br />
      {filteredTasks
        .filter((item) => !completedTasks.some((task) => task.key === item.key))
        .map((item, index) => (
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
                <Col span={24} md={2} className="checkbox_style">
                  <Checkbox
                    checked={completedTasks.some(
                      (task) => task.key === item.key
                    )}
                    onChange={() => handleCheckboxChange(item)}
                  />
                </Col>
                <Col span={24} md={18} onClick={showDrawer}>
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
                      onClick={() => handleStarClick(item)}
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
            </ImportantCardStyle>
          </div>
        ))}

      {completedTasks.length > 0 && (
        <Divider orientation="center" style={{ color: "blue" }}>
          Completed
        </Divider>
      )}

      {completedTasks.map((completedTask, index) => (
        <div key={index}>
          <ImportantCardStyle className="completed">
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
                  checked={true}
                  onChange={() => handleCheckboxChange(completedTask)}
                />
              </Col>
              <Col span={24} md={18}>
                <p>{completedTask.newTask}</p>
              </Col>
              <Col span={24} md={4} className="star">
                <FaStar
                  className={
                    bookmarkedTasks.find(
                      (task) => task.key === completedTask.key
                    )
                      ? "fill"
                      : "not_fill"
                  }
                  onClick={() => handleStarClick(completedTask)}
                />
              </Col>
            </Row>
          </ImportantCardStyle>
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
    </ImportantHead>
  );
};

export default Important;
