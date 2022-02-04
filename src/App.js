import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Registerclient from "./components/RegisterClient/Registerclient";
import RegisterOwner from "./components/RegisterOwner/Registerowner";
<<<<<<< HEAD
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
=======
import Home from './components/Home/Home'
import Login from "./components/Login/Login";


>>>>>>> develop

function App() {
  // const location = useLocation();
  return (
<<<<<<< HEAD
    <div className="App">
      <Route path={"/home"} render={() => <Home />} />
      <Route path={"/registerclient"} render={() => <Registerclient />} />
      <Route path={"/registerOwner"} render={() => <RegisterOwner />} />
      <Route path={"/Login"} render={() => <Login />} />
=======
    
     <div className="App">

       <Route path={'/home'} render={() => <Home/>} />
       <Route path={'/registerclient'} render={() => <Registerclient/>} />
       <Route path={'/registerOwner'} render={() => <RegisterOwner/>} />
       <Route path={'/Login'} render={() => <Login/>} />
       
      
>>>>>>> develop
    </div>
  );
}

export default App;
