import { Button, Col, DatePicker, Row } from "antd";
import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import { addNewTask, editTask } from "./NewTaskSlice"; // Make sure to import editTask
import NewTaskCard from "./NewTaskCard";
import dayjs from "dayjs";

const NewTaskHead = styled.div`
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

  .date_style {
    margin-top: 20px;
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

const AddNewTask = ({ updateRecord, formClose, importantRecord }) => {
  const { register, handleSubmit, reset } = useForm();
  const dispatch = useDispatch();

  const [dates, setDates] = useState(dayjs().format("YYYY-MM-DD"));

  // UseEffect to set form fields when updateRecord changes
  useEffect(() => {
    if (updateRecord) {
      // Reset the form with the values from the updateRecord
      reset({
        newTask: updateRecord.newTask,
        category: updateRecord.category,
      });
      setDates(updateRecord.date); // Set the date field
    } else if (importantRecord) {
      reset({
        newTask: importantRecord.newTask,
        category: importantRecord.category,
      });
      setDates(importantRecord.date); // Set the date field
    }
  }, [updateRecord, reset,importantRecord]);

  const dateChange = (date, dateString) => {
    setDates(dateString); // Set the formatted date string directly
  };

  const onSubmit = (data) => {
    const newValues = { ...data, date: dates };

    if (updateRecord) {
      // Dispatch edit action if updateRecord is present
      dispatch(editTask({ key: updateRecord.key, updatedTask: newValues }));
      formClose();
    } else if (importantRecord) {
      dispatch(editTask({ key: updateRecord.key, updatedTask: newValues }));
      formClose();
    } else {
      // Otherwise, add a new task
      dispatch(addNewTask(newValues));
    }

    // Optionally reset fields after submission
    reset();
  };

  return (
    <>
      <NewTaskHead>
        <form onSubmit={handleSubmit(onSubmit)}>
          <Row gutter={[24, 24]}>
            <Col span={24} md={10}>
              <label>Enter New Task</label>
              <input {...register("newTask",{ required: true })} placeholder="Enter new task" />
            </Col>
            <Col span={24} md={8}>
              <label>Category</label>
              <input {...register("category",{ required: true })} placeholder="Enter category" />
            </Col>
            <Col span={24} md={6}>
              <DatePicker
                placeholder="Due Date"
                required
                onChange={dateChange}
                className="date_style"
                value={dates ? dayjs(dates) : null} // Set the date value for the DatePicker
                format="YYYY-MM-DD" // Ensure the date is formatted correctly
              />
            </Col>
            <Col span={24} md={24} style={{ textAlign: "center" }}>
              <SubmitButton type="primary" htmlType="submit">
                {updateRecord ? "Update Task" : importantRecord ? "Update Task" : "Add Task"}
              </SubmitButton>
            </Col>
          </Row>
        </form>
      </NewTaskHead>
      {updateRecord || importantRecord ? null : <NewTaskCard />}
    </>
  );
};

export default AddNewTask;
