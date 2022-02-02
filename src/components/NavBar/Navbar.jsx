import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/restaurante.png";
import "./Navbar.css";

export default function Navbar() {
  return (
    <div class="navBar">
      <div class="links">
        <NavLink to="/loginrestaurant">
          <p>Mi Restaurant</p>
        </NavLink>
        <NavLink to="/registeruser">
          <p>Registrar Restaurant</p>
        </NavLink>
      </div>

      <div class="mainNavbar">
        <NavLink to="/home">
          <img class="logo" src={logo} alt="img not found" />
        </NavLink>
        <div class="links">
          <NavLink to="/login">
            <p>Iniciar sesión</p>
          </NavLink>
          <NavLink to="/registerclient">
            <p>Crear cuenta</p>
          </NavLink>
        </div>
      </div>
    </div>
  );
}
