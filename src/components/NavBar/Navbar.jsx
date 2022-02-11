import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/rapiresto.png";
import styles from "./Navbar.module.css";
import Cookies from "universal-cookie";
import Logout from "../Logout/Logout";

export default function Navbar() {
  const cookies = new Cookies();
  const usuario = cookies.get("username");

  return (
    <div className={styles.navBar}>
      <div className={styles.links}>
        {usuario ? <p>Mi Restaurant</p> : null}
        <NavLink to="/loginrestaurant"></NavLink>
        <NavLink to="/registerOwner">
          {usuario ? <p>Registrar Restaurant</p> : null}
        </NavLink>
      </div>

      <div className={styles.mainNavbar}>
        <NavLink to="/home" className={styles.nlhome}>
          <img className={styles.logo} src={logo} alt="Logo not found" />
          <p>
            rapi<strong>Resto</strong>
          </p>
        </NavLink>
        <div className={styles.links}>
          {!usuario ? (
            <NavLink to="/login" className={styles.navlinks}>
              <p>Iniciar sesión</p>
            </NavLink>
          ) : (
            <h3 className={styles.user}>Bienvenido, {cookies.get("username")}</h3>
          )}
          {!usuario ? (
            <NavLink to="/registerclient" className={styles.navlinks}>
              <p>Crear cuenta</p>
            </NavLink>
          ) : null}

          {usuario ? <Logout /> : ""}
        </div>
      </div>
    </div>
  );
}
