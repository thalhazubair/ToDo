import "./App.css";
import Todo from "./Components/Todo";
import Form from "./Components/Form";
import Button from "./Components/Button";
import { useState, useEffect } from "react";
import { nanoid } from "nanoid";

function App() {
  const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  const [tasks, setTasks] = useState(storedTasks);
  const [filter, setFilter] = useState("All");

  function TaskCompleted(id) {
    const updatedTask = tasks.map((task) => {
      if (id === task.id) {
        return { ...task, completed: !task.completed };
      }
      return task;
    });
    setTasks(updatedTask);
  }

  const filteredTasks = tasks.filter((task) => {
    if (filter === "All") {
      return true;
    } else if (filter === "Active") {
      return !task.completed;
    } else if (filter === "Completed") {
      return task.completed;
    }
    return false;
  });

  const taskList = filteredTasks.map((task) => (
    <Todo
      id={task.id}
      name={task.name}
      completed={task.completed}
      key={task.id}
      TaskCompleted={TaskCompleted}
      deleteTask={deleteTask}
    />
  ));

  const filterList = ["All", "Active", "Completed"].map((name) => (
    <Button
      key={name}
      name={name}
      setFilter={() => setFilter(name)}
      isPressed={name === filter}
    />
  ));

  function addTask(name) {
    const newTask = { id: `todo-${nanoid()}`, name, completed: false };
    setTasks([...tasks, newTask]);
  }

  function deleteTask(id) {
    const remainingTasks = tasks.filter((task) => id !== task.id);
    setTasks(remainingTasks);
  }

  const headingText = `${taskList.length} remaining`;

  useEffect(() => {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }, [tasks]);

  return (
    <div className="todoapp stack-large">
      <h1>Todo</h1>
      <Form addTask={addTask} />
      <div className="filters btn-group stack-exception">{filterList}</div>
      <h2 id="list-heading" tabIndex="-1">
        {headingText}
      </h2>
      <ul
        role="list"
        className="todo-list stack-large stack-exception"
        aria-labelledby="list-heading"
      >
        {taskList}
      </ul>
    </div>
  );
}

export default App;
