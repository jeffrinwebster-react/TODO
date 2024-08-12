import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styled from 'styled-components';
import { Checkbox, Col, Divider, Modal, Row } from 'antd';
import { deleteTask, toggleBookmark, toggleCompleted } from '../../NewTask/Partials/NewTaskSlice';
import AddNewTask from '../../NewTask/Partials/AddNewTask';
import { MdOutlineEdit } from 'react-icons/md';
import { RiDeleteBin6Line } from 'react-icons/ri';

const CategoriesHead = styled.div`
  padding: 20px;

  & select {
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

const CategoriesCardStyle = styled.div`
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
        border-radius: 5px;
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
      /* margin-left: 10px; */
      cursor: pointer;
      color: blue;
    }

    .delete {
      font-size: 25px;
      /* margin-left: 10px; */
      cursor: pointer;
      color: red;
    }
  }
`;

const Categories = () => {
  const dispatch = useDispatch();

  const getnewtaskData = useSelector((state) => state.newtask.newtask);
  console.log(getnewtaskData,'getnewtaskData');
  const completedTasks = useSelector((state) => state.newtask.completedTasks);
  console.log(completedTasks,'completedTasks');

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalTitle, setModalTitle] = useState("");
  const [modalContent, setModalContent] = useState(null);
  const [modalWidth, setModalWidth] = useState(0);

  // Extract unique categories from the tasks
  const categories = [...new Set(getnewtaskData.map((task) => task.category))];
  console.log(categories,'categories');

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
    setModalTitle("Edit Category Task");
    setModalContent(
      <AddNewTask
        categoryRecord={item}
        formClose={() => setIsModalOpen(false)}
      />
    );
    setIsModalOpen(true);
  };

  return (
    <CategoriesHead>
      <h2>Task Categories</h2>

    {categories.length == 0 && (
        <p style={{ padding: "10px", textAlign: "center" }}>There is no Categories Found!!!</p>
      )}
      {/* Active Tasks */}
      {categories.map((category, index) => (
        <div key={index}>
          <Divider style={{color:'blue'}}>Category : {category}</Divider>
          {getnewtaskData
            .filter((task) => task.category === category && !completedTasks.some((completedTask) => completedTask.key === task.key))
            .map((item) => (
              <CategoriesCardStyle key={item.key}>
                <Row className="taskcard_contents">
                    <Col span={24} md={24}>
                    <div className="head_content">
                  <h4>Task</h4>
                </div>
                    </Col>
                  <Col span={24} md={2} className="checkbox_style">
                    <Checkbox
                      checked={completedTasks.some((task) => task.key === item.key)}
                      onChange={() => handleCheckboxChange(item)}
                    />
                  </Col>
                  <Col span={24} md={20}>
                    <p>{item.newTask}</p>
                  </Col>
                  <Col span={24} md={1} xs={4} className="edit" onClick={() => EditTask(item)}>
                    <MdOutlineEdit />
                  </Col>
                  <Col span={24} md={1} xs={4} className="delete" onClick={() => handleDeleteTask(item)}>
                    <RiDeleteBin6Line />
                  </Col>
                </Row>
              </CategoriesCardStyle>
            ))}
        </div>
      ))}

      {/* Divider for Completed Tasks */}
      {completedTasks.length > 0 && (
      <Divider orientation="center" style={{ color: "blue" }}>
        Completed
      </Divider>

      )}

      {/* Completed Tasks */}
      {completedTasks.map((task) => (
        <CategoriesCardStyle key={task.key} className="completed">

          <Row className="taskcard_contents">
          <Col span={24} md={24}>
                    <div className="head_content">
                  <h4>Category : {task.category}</h4>
                </div>
                    </Col>
            <Col span={24} md={2} className="checkbox_style">
              <Checkbox
                checked={completedTasks.some((completedTask) => completedTask.key === task.key)}
                onChange={() => handleCheckboxChange(task)}
              />
            </Col>
            <Col span={24} md={22}>
              <p>{task.newTask}</p>
            </Col>
          </Row>
        </CategoriesCardStyle>
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
    </CategoriesHead>
  );
};

export default Categories;
