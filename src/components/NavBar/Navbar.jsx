import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/rapiresto.png";
import styles from "./Navbar.module.css";
import Cookies from "universal-cookie";
import Logout from "../Logout/Logout";
import { useSelector, useDispatch } from "react-redux";
import { getMyRestos } from "../../actions";

export default function Navbar() {
  const cookies = new Cookies();
  const usuario = cookies.get("username");
  console.log(cookies);
  const dispatch = useDispatch();
  const id = cookies.get("id");

  const myRestaurants = useSelector((state) => state.myRestaurants);

  useEffect(() => {
    if (id) {
      dispatch(getMyRestos(id));
    }
  }, [dispatch, id]);

  return (
    <div>
      <div>
        {myRestaurants ? (
          <div>
            {myRestaurants.map((el, index) => {
              return (
                <div key={index}>
                  <NavLink to={`/myrestaurant/${el.id}`}> {el.name}</NavLink>
                </div>
              );
            })}
          </div>
        ) : (
          <p>Restaurant no disponible</p>
        )}
      </div>
      <NavLink className={styles.navBar} to="/registerOwner">
        {usuario ? <p>Registrar Restaurant</p> : null}
      </NavLink>

      {/* <div className={styles.links}>
        {usuario ? <p>Mis Restaurantes</p> : null}
      </div> */}

      <div className={styles.mainNavbar}>
        <NavLink to="/home" className={styles.nlhome}>
          <img className={styles.logo} src={logo} alt="Logo not found" />
          <div className={styles.title}>
            rapi<strong>Resto</strong>
          </div>
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
  );
}
