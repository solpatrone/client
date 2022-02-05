import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/restaurante.png";
import styles from "./Navbar.module.css";
import Cookies from 'universal-cookie';
import Logout from "../Logout/Logout";

export default function Navbar() {
  const cookies= new Cookies();
  const usuario = cookies.get('name')
  const restoName = cookies.get('restoName')
  return (
    <div className={styles.navBar}>
      <div className={styles.links}>
                  {usuario?  <p>Mi Restaurant</p>:null
                  }
        <NavLink to="/loginrestaurant">
        </NavLink>
        <NavLink to="/registerOwner">
                  {usuario? 
                  <p>Registrar Restaurant</p>:
                  null
                    }
        </NavLink>
      </div>

      <div className={styles.mainNavbar}>
        <NavLink to="/home">
          <img className={styles.logo} src={logo} alt="img not found" />
        </NavLink>
        <div className={styles.links} className={styles.user}>          
                  {!usuario?
                  <NavLink to="/login">
                    <p>Iniciar sesión</p>          
                  </NavLink>:
                  <h3>Bienvenido: {cookies.get('name')}</h3> 
                    }
                  {!usuario?
                  <NavLink to="/registerclient">
                    <p>Crear cuenta</p>
                  </NavLink>:
                  null
                }

                {usuario? <Logout/> : ""}
        </div>
      </div>
    </div>
  );
}
