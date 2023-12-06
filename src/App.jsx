import React, { useState } from "react";
import reactLogo from "./assets/react.svg";
import viteLogo from "/vite.svg";
import "./App.css";
import LogIn from "./components/Login";
import LoggedIn from "./components/Loggedin";
import facade from "./apiFacade";

function App() {
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  const logout = () => {
    facade.logout();
    setLoggedIn(false);
  };
  const login = (user, pass) => {
    facade
      .login(user, pass)
      .then((res) => {
        setLoggedIn(true);
        setError("");
      })
      .catch((err) => {
        if (err.status === 401) setError("Wrong username or password");
        else setError("Something went wrong");
      });
  };

  return (
    <div>
      {error !== "" && (
        <div className="alert alert-danger" role="alert">
          {error}
        </div>
      )}
      {!loggedIn ? (
        <LogIn login={login} />
      ) : (
        <div>
          <LoggedIn />
          <button onClick={logout}>Logout</button>
        </div>
      )}
    </div>
  );
}
export default App;
