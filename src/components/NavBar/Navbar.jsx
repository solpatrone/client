import React, { useEffect } from "react";
import { NavLink } from "react-router-dom";
import logo from "../../assets/rapiresto.png";
import styles from "./Navbar.module.css";
import Cookies from "universal-cookie";
import Logout from "../Logout/Logout";
import { useSelector, useDispatch } from "react-redux";
import { getMyRestos } from "../../actions";
import 'bootstrap/dist/css/bootstrap.min.css';
import  { DropdownButton, ButtonGroup, Dropdown}  from "react-bootstrap";

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

        
          {!usuario?null:
                    <ButtonGroup>
                        <DropdownButton   as={ButtonGroup} title="Menu" id="bg-nested-dropdown" variant="secondary">
                          <Dropdown.Item eventKey="1" variant="secondary" className={styles.btn}> 
                            <NavLink to="/home" className={styles.navlinks}>    
                              Home
                            </NavLink>

                          </Dropdown.Item>
                            <Dropdown.Item eventKey="2" variant="secondary"> 
                              <NavLink className={styles.navlinks} to="/myProfile">
                                Mi perfil
                              </NavLink></Dropdown.Item>

                            <Dropdown.Item eventKey="3">
                              <NavLink className={styles.navlinks} to="/registerOwner">
                                Registrar restaurant
                              </NavLink>
                            </Dropdown.Item>

                          {myRestaurants.length>0?
                            <DropdownButton drop={'start'} as={ButtonGroup} title="Mis restaurant" variant="light">
                              <Dropdown.Item eventKey="4">
                              <NavLink className={styles.navlinks} to="/MyRestaurant">
                                {myRestaurants.map((el, index) => {
                                      return (
                                        <div key={index} className={styles.resto} >
                                          <Dropdown.Item eventKey="5" className={styles.navlinks} >
                                            <NavLink className={styles.navlinks2} to={`/myrestaurant/${el.id}`}>
                                              {el.name}
                                              </NavLink>
                                          </Dropdown.Item>
                                        </div>
                                      );
                                    })}
                              </NavLink>                            
                                </Dropdown.Item>
                            </DropdownButton>
                              :null          }

                            <Dropdown.Item eventKey="6" className={styles.navlinks}> <Logout /> </Dropdown.Item>
                        </DropdownButton>
                    </ButtonGroup>
          }

        </div>
      </div>
    </div>
  );
}
