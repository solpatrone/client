import React, { useState } from "react";
import { useHistory } from "react-router-dom";
import { GoogleLogin } from "react-google-login";
import Cookies from "universal-cookie";
import style from "./Login.module.css";
import axios from "axios";

export default function Login() {
  const history = useHistory();
  const [input, setInput] = useState({
    email: "",
    password: "",
  });

  const responseGoogle = async (response) => {
    if (response.profileObj) {
      var info = {email: response.profileObj.email, id: response.profileObj.googleId}
      try {
        var user = await axios.post('http://localhost:3001/login/google', info);
        var userData = user.data;
        const cookies = new Cookies();
        if (userData) {
          cookies.set("id", userData.id, { path: "/" });
          cookies.set("username", userData.username, { path: "/" });
          cookies.set("email", userData.email, { path: "/" });        
          cookies.set("restoName", '' , { path: "/" });
          console.log('hola soy cookies', cookies);
        }
        history.push("/home");
        return userData;
      } catch (e) {
        alert('Por favor, antes de acceder con Google registrate en nuestro sistema')
        history.push('/registerclient');
      }
    }
  }

  async function logger(info) {
    try {
      var user = await axios.post("http://localhost:3001/login", info);
      var userData = user.data;
      return userData;
    } catch (e) {
      console.log(e);
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
      cookies.set("restoName", '' , { path: "/" });
      console.log('hola soy cookies', cookies);
      history.push("/home");
    }
  }

  return (
    <>
      <div className={style.container}>
        <form onSubmit={handleSubmit}>
          <div>
            <div>Email: </div>
            <input
              type="email"
              value={input.email}
              name="email"
              placeholder="Ingrese su usuario"
              onChange={(e) => handleChange(e)}
            />
          </div>
          <div>
            <div>Contraseña: </div>
            <input
              type="password"
              value={input.password}
              name="password"
              placeholder="Ingrese su contraseña"
              onChange={(e) => handleChange(e)}
            />
          </div>

          <button type="submit">Iniciar sesíon</button>
        </form>
        <hr />
        <GoogleLogin
          clientId="573681437399-riki1t5m65bqd6q5h98o2r0f9qnolp8k.apps.googleusercontent.com"
          buttonText="Iniciar sesión"
          onSuccess={responseGoogle}
          onFailure={responseGoogle}
          cookiePolicy={"single_host_origin"}
        />
      </div>
    </>
  );
}
