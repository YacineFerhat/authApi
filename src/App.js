import React from "react";
import "./App.css";
import Auth from "./components/auth/auth";
import Todo from "./components/todo/todo";
import { AuthContext } from "./context/authContext";
import { useAuth } from "./hooks/useAuth";
import { Switch, Route, withRouter } from "react-router-dom";

const App = () => {
  const { token, login, logout, userId } = useAuth();
  let routes;
  console.log(token);

  if (token) {
    routes = (
      <Switch>
        <Route exact path="/todo">
          <Todo />
        </Route>
      </Switch>
    );
  } else {
    routes = (
      <Switch>
        <Route exact path="/">
          <Auth />
        </Route>
      </Switch>
    );
  }
  return (
    <AuthContext.Provider
      value={{
        isLoggedIn: !!token,
        userId: userId,
        login: login,
        logout: logout,
      }}
    >
      <div className="App">{routes}</div>
    </AuthContext.Provider>
  );
};

export default App;
