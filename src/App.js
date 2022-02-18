import "./App.css";
import React from "react";
import { Route, Redirect } from "react-router-dom";
import Registerclient from "./components/RegisterClient/Registerclient";
import RegisterOwner from "./components/RegisterOwner/Registerowner";
import Home from "./components/Home/Home";
import Login from "./components/Login/Login";
import MyRestaurant from "./components/MyRestaurant/MyRestaurant"
// import Review from "./components/Reviews/Review";
import Details from "./components/Details/Details";
import LoadImage from "./components/LoadImage/LoadImage";
import Reservations from "./components/Reservation/Reservations";
import MyProfile from "./components/MyProfile/MyProfile";
import MercadoPago from "./components/MercadoPago/MercadoPago";
import PaymentError from "./components/PaymentError/PaymentError";


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

      <Route path={"/myprofile"} render={() => <MyProfile />} />
      {/* <Route path={"/review"} render={() => <Review />} /> */}
      <Route path={"/myrestaurant/:id"} render={() => <MyRestaurant />} />

      <Route path={"/restaurants/:id"} render={() => <Details />} />
      <Route path={"/Login"} render={() => <Login />} />
      <Route path={"/images"} render={() => <LoadImage />} />
      <Route path={"/reservations"} render={() => <Reservations />} />
      <Route path={"/reservations/success"} render={() => <MercadoPago />} />
      <Route path={"/reservations/canceled"} render={() => <PaymentError />} />
    </div>
  );
}

export default App;
