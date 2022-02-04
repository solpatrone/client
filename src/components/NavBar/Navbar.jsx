import React from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/restaurante.png";
import styles from "./Navbar.module.css";
import Cookies from 'universal-cookie';

export default function Navbar() {
  const cookies= new Cookies();
  const usuario = cookies.get('name')
  const restoName = cookies.get('restoName')
  return (
    <div className={styles.navBar}>
      <div className={styles.links}>
                  {restoName? null: <p>Mi Restaurant</p>
                  }
        <NavLink to="/loginrestaurant">
        </NavLink>
        <NavLink to="/registerOwner">
                  {restoName? null:<p>Registrar Restaurant</p>
                    }
        </NavLink>
      </div>

      <div className={styles.mainNavbar}>
        <NavLink to="/home">
          <img className={styles.logo} src={logo} alt="img not found" />
        </NavLink>
        <div className={styles.links} className={styles.user}>          
        <NavLink to="/login">
                  {usuario? null: <p>Iniciar sesión</p>          
                    }
          </NavLink>
          <NavLink to="/registerclient">
                  {usuario? null: <p>Crear cuenta</p>
                }

          </NavLink>
        </div>
      </div>
    </div>
  );
}
