import React, { useEffect } from "react";
import { NavLink, useParams } from "react-router-dom";
import logo from "../../assets/rapiresto.png";
import styles from "./Navbar.module.css";
import Cookies from "universal-cookie";
import Logout from "../Logout/Logout";

import { useSelector, useDispatch } from "react-redux";
import { getMyRestos } from "../../actions";

export default function Navbar() {
  const cookies = new Cookies();
  const usuario = cookies.get("username");
  const params = useParams();
  const dispatch = useDispatch();
  const id = cookies.get("id");

  useEffect(() => {
    dispatch(getMyRestos(id));
  }, []);

  const myRestaurants = useSelector((state) => state.myRestaurants);

  return (
    <div>
      <div>
        {myRestaurants ? (
          <div>
            {myRestaurants.map((el, index) => {
              return (
                <div key={index}>
                  <NavLink to={`/${el.id}`}> {el.name}</NavLink>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Restaurant no disponible</p>
        )}
      </div>
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
              <h3 className={styles.user}>
                Bienvenido, {cookies.get("username")}
              </h3>
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
    </div>
  );
}
