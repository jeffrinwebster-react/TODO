import React, { useEffect } from 'react';
import Layout from './Modules/Layout/Index';
import NewTaskCard from './Modules/NewTask/Partials/NewTaskCard';
import { Routes, Route, useNavigate } from "react-router-dom";
import AddNewTask from './Modules/NewTask/Partials/AddNewTask';
import Home from './Modules/Home/Partials/Home';
import Important from './Modules/Important/Partials/Important';
import Completed from './Modules/Completed/Partials/Completed';
import Deadline from './Modules/Deadline/Partials/Deadline';
import Categories from './Modules/Categories/Partials/Categories';

const App = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleKeyDown = (event) => {
      if (event.ctrlKey && event.key === 'n') { // Detect Ctrl + N
        event.preventDefault(); // Prevent any default behavior (if necessary)
        navigate('/newtask'); // Navigate to /newtask route
      }
    };

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [navigate]);

  return (
    <div>
      <Layout>
        <Routes>
          <Route path="/newtask" element={<AddNewTask />} />
          <Route path="/importanttask" element={<Important />} />
          <Route path="/taskcompleted" element={<Completed />} />
          <Route path="/deadline" element={<Deadline />} />
          <Route path="/categories" element={<Categories />} />
          <Route path="/" element={<Home />} />
        </Routes>
      </Layout>
    </div>
  );
}

export default App;
