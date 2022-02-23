import React, { useState } from "react";
import { NavLink, useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import Cookies from "universal-cookie";
import style from "./Login.module.css";
import axios from "axios";
// import { Button } from "react-bootstrap";

import logo from "../../assets/rapiresto.png";


import Swal from "sweetalert2";


export default function Login() {
  // const url = "https://rapiresto.herokuapp.com";

 const url = "http://localhost:8080";
  

  const loginModif = url + "/logins";

  const history = useHistory();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const responseGoogle = async (response) => {
    if (response.profileObj) {
      var info = {
        email: response.profileObj.email,
        id: response.profileObj.googleId,
      };
      try {
        var user = await axios.post(`${loginModif}/google`, info);
        var userData = user.data;
        const cookies = new Cookies();
        if (userData) {
          cookies.set("id", userData.id, { path: "/" });
          cookies.set("username", userData.username, { path: "/" });

          cookies.set("email", userData.email, { path: "/" });

          cookies.set("email", userData.email, { path: "/" });
        }
        history.push("/home");
        return userData;
      } catch (e) {
        Swal.fire({
          text: "Por favor, antes de acceder con Google registrate en nuestro sistema",
          confirmButtonColor: "#8aa899"
        })
        // alert(
        //   "Por favor, antes de acceder con Google registrate en nuestro sistema"
        // );
        history.push("/registerclient");
      }
    }
  };

  async function logger(info) {
    try {
      var user = await axios.post(loginModif, info);
      var userData = user.data;
      return userData;
    } catch (e) {
      if (e.response.data.message === "El usuario no existe") {
        Swal.fire({
          text: e.response.data.message,
          confirmButtonColor: "#8aa899",
        });
        history.push("/registerclient");
      } else {
        Swal.fire({
          text: e.response.data.message,
          confirmButtonColor: "#8aa899",
        });
      }
    }
  }

  function handleChange(e) {
    setInput({
      ...input,
      [e.target.name]: e.target.value,
    });
  }

  async function handleSubmit(e) {
    e.preventDefault();
    var user = await logger(input);
    const cookies = new Cookies();
    if (user) {
      cookies.set("id", user.id, { path: "/" });
      cookies.set("username", user.username, { path: "/" });
      cookies.set("email", user.email, { path: "/" });
      cookies.set("owner", user.email, { path: "/" });
      cookies.set("restoName", "", { path: "/" });

      history.push("home");
    }
  }

  return (
    <div className={style.main}>
      <div className={style.mainNavbar}>
        <NavLink to="/home" className={style.nlhome}>
          <img className={style.logo} src={logo} alt="Logo not found" />
          <div className={style.title}>
            rapi<strong>Resto</strong>
          </div>
        </NavLink>

        <div>
          <NavLink to="/home" className={style.navlinks}>
            Home
          </NavLink>
        </div>
      </div>
      <div className={style.container}>
        <div className={style.img}></div>
        <div className={style.formContainer}>
          <div className={style.header}>Iniciar Sesión</div>
          <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.inputContainer}>
              <label>Email </label>
              <input
                type="email"
                value={input.email}
                name="email"
                placeholder="Ingrese su usuario"
                onChange={(e) => handleChange(e)}
              />
            </div>
            <div className={style.inputContainer}>
              <label>Contraseña </label>
              <input
                type="password"
                value={input.password}
                name="password"
                placeholder="Ingrese su contraseña"
                onChange={(e) => handleChange(e)}
              />
            </div>

            <div>
              <NavLink to="/forgotPassword" className={style.link}>
                ¿Olvidaste tu contraseña?
              </NavLink>
            </div>

            <button type="submit" className={style.btn}>
              Ingresar
            </button>
          </form>
          <hr />
          <GoogleLogin
            clientId="666447071830-t1o2vsbnr22uaip19ug155dm5gd51o32.apps.googleusercontent.com"
            buttonText="Ingresar con Google"
            onSuccess={responseGoogle}
            onFailure={responseGoogle}
            cookiePolicy={"single_host_origin"}
            className={style.google}
          />
        </div>
      </div>
    </div>
  );
}
