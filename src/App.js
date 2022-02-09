import "./App.css";
import React from "react";
import { Route, Switch, Redirect } from "react-router-dom";
import Registerclient from "./components/RegisterClient/Registerclient";
import RegisterOwner from "./components/RegisterOwner/Registerowner";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import Review from "./components/Reviews/Review";
import Details from "./components/Details/Details";
import LoadImage from "./components/LoadImage/LoadImage";

function App() {
  // const location = useLocation();
  return (
    <div className="App">
     <Route exact path="/">
   <Redirect to="/home" />  
</Route>
      <Route path={"/home"} render={() => <Home />} />
      <Route path={"/registerclient"} render={() => <Registerclient />} />
      <Route path={"/registerOwner"} render={() => <RegisterOwner />} />
      <Route path={"/review"} render={() => <Review />} />
      <Route path={"/restaurants/:id"} render={() => <Details />} />
      <Route path={"/Login"} render={() => <Login />} />
      <Route path={"/images"} render={() => <LoadImage/>} />
    </div>
  );
}

export default App;
