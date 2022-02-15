import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/rapiresto.png";
import styles from "./Navbar.module.css";
import Cookies from "universal-cookie";
import Logout from "../Logout/Logout";
import { useSelector, useDispatch } from "react-redux";
import { getMyRestos } from "../../actions";
import "bootstrap/dist/css/bootstrap.min.css";
import { DropdownButton, ButtonGroup, Dropdown } from "react-bootstrap";

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
  }, [id]);

  return (
    <div>
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

          {!usuario ? null : (
            <ButtonGroup>
              <DropdownButton
                as={ButtonGroup}
                title="Menu"
                id="bg-nested-dropdown"
              >
                <Dropdown.Item eventKey="1">
                  <NavLink to="/home" className={styles.navlinks}>
                    Home
                  </NavLink>
                </Dropdown.Item>
                <Dropdown.Item eventKey="2">
                  <NavLink className={styles.navlinks} to="/myProfile">
                    Mi perfil
                  </NavLink>
                </Dropdown.Item>

                <Dropdown.Item eventKey="3">
                  <NavLink className={styles.navlinks} to="/registerOwner">
                    Registrar restaurant
                  </NavLink>
                </Dropdown.Item>

                <DropdownButton
                  drop={"start"}
                  as={ButtonGroup}
                  title="Mis restaurant"
                  id="bg-nested-dropdown"
                >
                  <Dropdown.Item eventKey="4">
                    <NavLink className={styles.navlinks} to="/MyRestaurant">
                      {myRestaurants.map((el, index) => {
                        return (
                          <div key={index}>
                            <NavLink
                              className={styles.navlinks}
                              to={`/myrestaurant/${el.id}`}
                            >
                              {" "}
                              {el.name}
                            </NavLink>
                          </div>
                        );
                      })}
                    </NavLink>
                  </Dropdown.Item>
                </DropdownButton>

                <Dropdown.Item eventKey="5">
                  {" "}
                  <Logout />{" "}
                </Dropdown.Item>
              </DropdownButton>
            </ButtonGroup>
          )}
        </div>
      </div>
    </div>
  );
}
