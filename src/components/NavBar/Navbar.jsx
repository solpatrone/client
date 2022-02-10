import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/restaurante.png";
import styles from "./Navbar.module.css";

export default function Navbar() {
  return (
    <div className={styles.navBar}>
      <div className={styles.links}>
        <NavLink to="/loginrestaurant">
          <p>Mi Restaurant</p>
        </NavLink>
        <NavLink to="/registerOwner">
          <p>Registrar Restaurant</p>
        </NavLink>
      </div>

      <div className={styles.mainNavbar}>
        <NavLink to="/home">
          <img className={styles.logo} src={logo} alt="img not found" />
        </NavLink>
        <div className={styles.user}>          
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
