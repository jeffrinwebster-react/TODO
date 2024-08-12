import { Button, Col, Row } from "antd";
import React, { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { FaStar } from "react-icons/fa";
import { toggleBookmark } from "../../NewTask/Partials/NewTaskSlice";

const HomeCardStyle = styled.div`
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
        /* border-radius: 5px; */
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

const HomeHead = styled.div`
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

  .all,
  .important,
  .completed {
    margin-top: 30px;
    height: 3vh;
    display: flex;
    justify-content: center;
    align-items: center;
    cursor: pointer;

    :hover {
      background: #bfa4a4;
      color: black;
    }

    p {
      background: #1890ff;
      padding: 6px;
      width: 90%;
      text-align: center;
      border-radius: 5px;
      color: white;
    }
  }
`;

const SubmitButton = styled(Button)`
  background-color: #1890ff;
  color: white;
  border: none;
  padding: 10px;
  font-size: 16px;
  border-radius: 4px;
  cursor: pointer;
  margin-top: 22px;

  &:hover {
    background-color: #40a9ff;
  }

  &:focus {
    background-color: #096dd9;
  }
`;

const Home = () => {
  const { register, handleSubmit, setValue, watch } = useForm();
  const dispatch = useDispatch();

  // Get tasks from the Redux store
  const allTasks = useSelector((state) => state.newtask.newtask);
  const bookmarkedTasks = useSelector((state) => state.newtask.bookmarkedTasks);
  const completedTasks = useSelector((state) => state.newtask.completedTasks);

  // State to manage the displayed tasks
  const [displayedTasks, setDisplayedTasks] = useState(allTasks);
  const [currentCategory, setCurrentCategory] = useState("all");

  const searchValue = watch("search"); // Watch the search input for real-time filtering

  useEffect(() => {
    // Update displayedTasks based on the current category and search query
    let tasksToDisplay = [];

    if (currentCategory === "important") {
      tasksToDisplay = bookmarkedTasks;
    } else if (currentCategory === "completed") {
      tasksToDisplay = completedTasks;
    } else {
      tasksToDisplay = allTasks;
    }

    if (searchValue) {
      tasksToDisplay = tasksToDisplay.filter((task) =>
        task.newTask.toLowerCase().includes(searchValue.toLowerCase())
      );
    }

    setDisplayedTasks(tasksToDisplay);
  }, [currentCategory, bookmarkedTasks, completedTasks, allTasks, searchValue]);

  const handleAllClick = () => {
    setCurrentCategory("all");
    setValue("search", ""); // Clear the search input
  };

  const handleImportantClick = () => {
    setCurrentCategory("important");
    setValue("search", ""); // Clear the search input
  };

  const handleCompletedClick = () => {
    setCurrentCategory("completed");
    setValue("search", ""); // Clear the search input
  };

  const handleStarClick = (task) => {
    dispatch(toggleBookmark(task));
  };

  return (
    <>
      <HomeHead>
        <form onSubmit={handleSubmit()}>
          <Row gutter={[24, 24]}>
            <Col span={24} md={12}>
              <label>Search</label>
              <input {...register("search")} placeholder="Search..." />
            </Col>
            {/* <Col span={24} md={4}>
              <SubmitButton type="primary" htmlType="submit">
                Add Task
              </SubmitButton>
            </Col> */}

            <Col span={24} md={4} className="all">
              <p onClick={handleAllClick}>All</p>
            </Col>

            <Col span={24} md={4} className="important">
              <p onClick={handleImportantClick}>Important</p>
            </Col>
            <Col span={24} md={4} className="completed">
              <p onClick={handleCompletedClick}>Completed</p>
            </Col>
          </Row>
        </form>
      </HomeHead>

      {displayedTasks.length > 0 ? (
        displayedTasks.map((item, index) => (
          <div key={index} >
            <HomeCardStyle>
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
                <Col span={24} md={2} className="checkbox_style"></Col>
                <Col span={24} md={18}>
                  <p>{item.newTask}</p>
                </Col>
                <Col span={24} md={4} className="star">
                  <FaStar
                    className={
                      bookmarkedTasks.find((task) => task.key === item.key)
                        ? "fill"
                        : "not_fill"
                    }
                    onClick={() => handleStarClick(item)}
                  />
                </Col>
              </Row>
            </HomeCardStyle>
          </div>
        ))
      ) : (
        <p style={{textAlign:'center',fontSize:'20px'}}>No tasks to display</p>
      )}
    </>
  );
};

export default Home;
