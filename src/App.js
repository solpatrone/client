import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Registerclient from './components/RegisterClient/Registerclient'
import Home from './components/Home/Home'

// import { useLocation } from "react-router-dom";



function App() {
  // const location = useLocation();
  return (
    
     <div className="App">

       <Route path={'/registerclient'} render={() => <Registerclient/>} />
     {/*   {location.pathname === "/" ? null : <NavBar />}
  
    //   <Route exact path={"/"} render={() => <LandingPage />} />
     */}
      
    </div>
  );
}

export default App;
