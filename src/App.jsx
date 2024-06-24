import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import LoginForm from "./components/LoginForm";
import ChuckNorris from "./components/ChuckNorris";

function App() {
  const [token, setToken] = useState("");
  return (
    <>
      <div className="App">
        {!token ? (
          <LoginForm setToken={setToken} />
        ) : (
          <>
            <ChuckNorris token={token} setToken={setToken} />
          </>
        )}
      </div>
    </>
  );
}

export default App;
