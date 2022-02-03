import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Registerclient from "./components/RegisterClient/Registerclient";
import RegisterOwner from "./components/RegisterOwner/Registerowner";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";

function App() {
  // const location = useLocation();
  return (
    <div className="App">
      <Route path={"/home"} render={() => <Home />} />
      <Route path={"/registerclient"} render={() => <Registerclient />} />
      <Route path={"/registerOwner"} render={() => <RegisterOwner />} />
      <Route path={"/Login"} render={() => <Login />} />
    </div>
  );
}

export default App;
