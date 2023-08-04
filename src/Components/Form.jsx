import React, { useState } from "react";

function Form(props) {
  const [name, setName] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = (e) => {
    e.preventDefault();
    if (name == "") {
      setError("please enter a task");
      return;
    }
    setError("");
    props.addTask(name);
    setName("");
  };

  const handleChange = (e) => {
    setName(e.target.value);
    setError("");
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2 className="label-wrapper">
        <label htmlFor="new-todo-input" className="label__lg">
          What needs to be done?
        </label>
      </h2>
      <input
        type="text"
        id="new-todo-input"
        className="input input__lg"
        name="text"
        autoComplete="off"
        value={name}
        onChange={handleChange}
      />
      {error && (
        <p className="error-message" style={{ color: "red" }}>
          {error}
        </p>
      )}
      <button type="submit" className="btn btn__primary btn__lg">
        Add
      </button>
    </form>
  );
}

export default Form;
