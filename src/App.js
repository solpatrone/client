import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Registerclient from "./components/RegisterClient/Registerclient";
import RegisterOwner from "./components/RegisterOwner/Registerowner";
<<<<<<< HEAD
import Home from "./components/Home/Home";
=======
import Home from './components/Home/Home'
import Login from "./components/Login/Login";


>>>>>>> 239d4851ec72f5e25ea6d827b7b0f04008f623da

function App() {
  // const location = useLocation();
  return (
<<<<<<< HEAD
    <div className="App">
      <Route path={"/home"} render={() => <Home />} />
      <Route path={"/registerclient"} render={() => <Registerclient />} />
      <Route path={"/registerOwner"} render={() => <RegisterOwner />} />
=======
    
     <div className="App">

       <Route path={'/home'} render={() => <Home/>} />
       <Route path={'/registerclient'} render={() => <Registerclient/>} />
       <Route path={'/registerOwner'} render={() => <RegisterOwner/>} />
       <Route path={'/Login'} render={() => <Login/>} />
       
      
>>>>>>> 239d4851ec72f5e25ea6d827b7b0f04008f623da
    </div>
  );
}

export default App;
