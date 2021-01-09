import React, { useState } from "react";
import "./todo.css";
import axios from "axios";
import { useFetchTodos } from "../../hooks/useFetchTodos";
const Todo = () => {
  const [toggleNewTodo, setToggleNewTodo] = useState(false);

  const handleToggleNewTodo = () => {
    setToggleNewTodo(true);
  };

  const [input, setInput] = useState([
    {
      title: "",
      description: "",
      date: "",
    },
  ]);

  const handleChangeInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };

  const [reload, setReload] = useState(0);
  const data = useFetchTodos(reload);
  const handleValidateTodo = () => {
    const dataObject = {
      title: input.title,
      description: input.description === undefined ? "" : input.description,
      date: input.date === undefined ? "" : input.date,
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/todos/`, dataObject)
      .then((res) => {
        setReload(reload + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  const handleChangeCheckbox = (id, state) => {
    console.log(id, state);
    const dataObject = {
      done: !state,
    };
    axios
      .put(
        `${process.env.REACT_APP_BACKEND_URL}/api/todos/state/${id}`,
        dataObject
      )
      .then((res) => {
        setReload(reload + 1);
      })
      .catch((error) => {
        console.log(error);
      });
  };
  console.log(data);
  return (
    <div className="container">
      <h2>My todo list</h2>
      <button onClick={handleToggleNewTodo}>Ajouter un nouveau todo</button>
      {toggleNewTodo && (
        <div>
          <div className="controlHolder">
            <label htmlFor="title todo">Titre *: </label>
            <input
              onChange={handleChangeInput}
              name="title"
              type="text"
              required
            />
          </div>

          <div className="controlHolder">
            <label htmlFor="desc todo">Description : </label>
            <textarea
              onChange={handleChangeInput}
              name="description"
              type="text"
            />
          </div>

          <div className="controlHolder">
            {" "}
            <label htmlFor="desc todo">Due data : </label>
            <input name="date" type="date" onChange={handleChangeInput} />
          </div>
          {input.title !== undefined ? (
            <button onClick={handleValidateTodo}>Valider todo</button>
          ) : (
            <button className="btnDisabled" disabled>
              Remplisser les champs
            </button>
          )}
        </div>
      )}
      {data.length > 0 ? (
        <table>
          <tr>
            <th>State</th>
            <th>Title</th>
            <th>Description</th>
            <th>Due Date</th>
          </tr>
          {data.map((todo, i) => (
            <tr key={i}>
              <input
                className="checkbox"
                type="checkbox"
                checked={todo.done}
                onChange={() => handleChangeCheckbox(todo._id, todo.done)}
              />
              <td>{todo.title}</td>
              <td>{todo.description}</td>
              <td>{todo.date}</td>
            </tr>
          ))}
        </table>
      ) : null}
    </div>
  );
};

export default Todo;
