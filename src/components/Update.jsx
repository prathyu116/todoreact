// import React, { useEffect, useState } from "react";

// import './Update.css'

// function Update() {
//    return (
//      <div className="update-container">
//        <h1>Edit Notes</h1>
//        <textarea />
//        <button className="update-btn">Update</button>
//        <button className="cancel-btn">Cancel</button>
//      </div>
//    );
// }

// export default Update;


import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "./Update.css";
import { fetchTaskById, updateTask } from "../services/Api";

function Update() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [task, setTask] = useState(null);
  const [taskText, setTaskText] = useState("");

  console.log("ifddddddd",id)

  useEffect(() => {
    console.log("useEffect Update")
    fetchTaskById(id)
      .then((data) => {
        console.log(data)
        setTask(data);
        setTaskText(data.text);
      })
      .catch((error) => console.error("Error fetching task:", error));
  }, []);

  const handleUpdateTask = async () => {
    try {
      if (taskText.trim()) {
        const updatedTask = { ...task, text: taskText };
        await updateTask(id, updatedTask);
        navigate("/");
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const handleCancel = () => {
    navigate("/");
  };


  return (
    <div className="update-container">
      <h1>Edit Notes</h1>
      <textarea
        value={taskText}
        onChange={(e) => setTaskText(e.target.value)}
      />
      <button className="update-btn" onClick={handleUpdateTask}>
        Update
      </button>
      <button className="cancel-btn" onClick={handleCancel}>
        Cancel
      </button>
    </div>
  );
}

export default Update;
