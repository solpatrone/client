import "./App.css";
import React from "react";
import { Route, Switch } from "react-router-dom";
import Navbar from "./components/NavBar/Navbar";
// import { useLocation } from "react-router-dom";



function App() {
  // const location = useLocation();
  return (
    
     <div className="App">
        <Route exact path={"/"} render={() => <Navbar/>} />
    {/*   {location.pathname === "/" ? null : <NavBar />}
  
    //   <Route exact path={"/"} render={() => <LandingPage />} />
    //   <Route path={"/home"} render={() => <Home />} />
     */}
      
    </div>
  );
}

export default App;
