import React, { useState, useEffect } from "react";
import axios from "axios";
import "./Home.css";
import { deleteTask, fetchTasks } from "../services/Api";
import { Link } from "react-router-dom";

function Home() {
  const [taskInput, setTaskInput] = useState(""); // State for the task input
  const [tasks, setTasks] = useState([]); // State for the task list


  useEffect(() => {
    console.log("useEffect Home");
  fetchTasks()
    .then((data) => setTasks(data))
    .catch((error) => console.error("Error fetching tasks:", error));
  }, []);

  const handleInputChange = (e) => {
    setTaskInput(e.target.value); // Update task input state
  };

  const handleAddTask = () => {
    console.log("====>", taskInput.trim());
    if (taskInput.trim()) {
      const newTask = { text: taskInput }; // Task object to be added
      // Add new task to JSON server
      axios
        .post("http://localhost:3000/todos", newTask)
        .then((response) => {
          setTasks([...tasks,response.data]); // Add new task to state
          setTaskInput(""); // Clear the input field
        })
        .catch((error) => console.error("Error adding task:", error));
    }
  };
  const handleDeleteTask = async (taskId) => {
    try {
      await deleteTask(taskId);
      setTasks(tasks.filter((task) => task.id !== taskId)); // Remove task from state
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="containeri">
      <h3>TODO APP</h3>

      <div className="add-task">
        <input
          type="text"
          placeholder="What is the task today?"
          className="input"
          value={taskInput} // Bind input value to state
          onChange={(e) => {
            handleInputChange(e);
          }} // Handle input change
        />
        <button className="button" onClick={handleAddTask}>
          Add Task
        </button>
      </div>

      <div className="task-list">
        {tasks.map((task) => (
          <div className="task-item" key={task.id}>
            <span>{task.text}</span>
            <div>
              {/* ivde button ayrnn indayrnne...for routing nu vendi Link akki */}
              <Link
                to={`/update/${task.id}`}
                className="button edit"
              >
                <i className="fas fa-edit"></i>
              </Link>
              <button
                className="button delete"
                onClick={() => handleDeleteTask(task.id)}
              >
                <i className="fas fa-trash-alt"></i>
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default Home;


//  <div className="task-item">
//    <span>hello</span>
//    <div>
//      <button className="button edit">
//        <i className="fas fa-edit"></i>
//      </button>
//      <button className="button delete">
//        <i className="fas fa-trash-alt"></i>
//      </button>
//    </div>
//  </div>;
