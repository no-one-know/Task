import React, { useState, useEffect } from "react";
import "./App.css";
import Header from "./components/Header";
import Todo from "./components/Todo";
import TaskContext from "./components/TaskContext";
import Navbar from "./components/Navbar";

export default function App() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks"));
  const [tasks, setTasks] = useState(storedTasks ? storedTasks : []);

  const handleAddTask = (newTask) => {
    setTasks([...tasks, newTask]);
  };

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div>
      <Navbar />
      <TaskContext.Provider
        value={{
          tasks, setTasks,
          onAddTask: handleAddTask,
        }}
      >
        <Header />
        <Todo />
      </TaskContext.Provider>
    </div>
  );
}