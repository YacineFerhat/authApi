import React, { useState, useContext } from "react";
import { AuthContext } from "../../context/authContext";
import axios from 'axios'
import { useHistory } from "react-router-dom";

const Auth = () => {
  const [input, setInput] = useState([
    {
      email: "",
      password: "",
    },
  ]);

  const handleChangeInput = (event) => {
    setInput({
      ...input,
      [event.target.name]: event.target.value,
    });
  };
  let history = useHistory();
  const [errorMsg, setErrorMsg] = useState(false);
  const auth = useContext(AuthContext);

  const handleLogin = (event) => {
    event.preventDefault();
    setErrorMsg(false);
    const dataObject = {
      email: input.email,
      password: input.password,
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/login`, dataObject)
      .then((res) => {
        auth.login(res.data.userId, res.data.token);
        history.push("/todo");
      })
      .catch((error) => {
        setErrorMsg(true);
      });
  };

  const handleCreateUser = (event) => {
    event.preventDefault();
    setErrorMsg(false);
    const dataObject = {
        email: input.email,
        password: input.password,
    };
    axios
      .post(`${process.env.REACT_APP_BACKEND_URL}/api/users/`, dataObject)
      .then((res) => {
        auth.login(res.data.userId, res.data.token);
        history.push("/todo");
      })
      .catch((error) => {
        setErrorMsg(true);
      });
  };
  return (
    <section>
      <h1>Authentification :</h1>
      <h2>Connecter vous :</h2>
      <div>
        <label>Email :</label>
        <input
          name="email"
          onChange={handleChangeInput}
          required
          type="email"
        />
      </div>
      <div>
        <label>password :</label>
        <input
          name="password"
          onChange={handleChangeInput}
          required
          type="password"
        />
      </div>
      <div>
        <button onClick={handleLogin}>Se connecter</button>
        <button onClick={handleCreateUser}>Créer un compte</button>
      </div>
    </section>
  );
};

export default Auth;
