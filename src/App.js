import "./App.css";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Registerclient from "./components/RegisterClient/Registerclient";
import RegisterOwner from "./components/RegisterOwner/Registerowner";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
// import Review from "./components/Reviews/Review";
import Details from "./components/Details/Details";
import LoadImage from "./components/LoadImage/LoadImage";
import Reservations from "./components/Reservation/Reservations";
import MyRestaurant from "./components/MyRestaurant/MyRestaurant";

function App() {
  // const location = useLocation();
  return (
    <div className="App">
      <Route exact path="/">
        <Redirect to="/home" />
      </Route>
      <Route exact path={"/home"} render={() => <Home />} />
      <Route exact path={"/registerclient"} render={() => <Registerclient />} />
      <Route exact path={"/registerOwner"} render={() => <RegisterOwner />} />
      {/* <Route path={"/review"} render={() => <Review />} /> */}

      <Route exact path={"/restaurants/:id"} render={() => <Details />} />
      <Route exact path={"/Login"} render={() => <Login />} />
      <Route exact path={"/images"} render={() => <LoadImage />} />
      <Route exact path={"/reservations"} render={() => <Reservations />} />
      <Route exact path={"/:id"} render={() => <MyRestaurant />} />
    </div>
  );
}

export default App;
