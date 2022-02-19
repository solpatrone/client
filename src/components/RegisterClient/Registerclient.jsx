import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { createClient } from "../../actions";
import { useHistory, NavLink } from "react-router-dom";
import style from "./Registerclient.module.css";
import { Button } from "react-bootstrap";
import logo from "../../assets/rapiresto.png";

export default function RegisterUser() {
  const history = useHistory();
  let dispatch = useDispatch();

  let [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    password2: "",
  });

  let [errors, setErrors] = useState({ hasErrors: true });

  const [isSubmit, setIsSubmit] = useState(false);

  function validate(input) {
    let errors = { hasErrors: false };
    console.log("input", input);

    if (!input.username) {
      errors.username = `El nombre es requerido`;
      errors.hasErrors = true;
    } else if (!/^[a-zA-Z\s]{5,20}$/.test(input.username)) {
      errors.username = `El nombre debe ser letras entre 5 y 20 caracteres`;
      errors.hasErrors = true;
    }

    if (!input.email) {
      errors.email = `El email es requerido`;
      errors.hasErrors = true;
    } else if (
      !/(\W|^)[\w.]{0,30}@(yahoo|hotmail|gmail)\.com(\W|$)/.test(input.email)
    ) {
      errors.email = `El email debe ser una dirección válida`;
      errors.hasErrors = true;
    }

    if (!input.password) {
      errors.password = `La contraseña es requerida`;
      errors.hasErrors = true;
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/gm.test(
        input.password
      )
    ) {
      errors.password =
        "La contrseña debe incluir: \n Entre 8 y 15 carateres \n Mayúsculas y minúsculas \n Números";
      errors.hasErrors = true;
    }

    if (!input.password2) {
      errors.password2 = "Confirme su contraseña";
      errors.hasErrors = true;
    } else if (input.password !== input.password2) {
      errors.password2 = "Las contraseñas no coinciden";
      errors.hasErrors = true;
    }

    return errors;
  }

  let onlyLetters = (e) => {
    if (!/[a-zA-Z\s]/.test(e.key)) {
      e.preventDefault();
    }
  };

  let handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  };

  let handleSubmit = (e) => {
    e.preventDefault();
    if (!validate(input).hasErrors) {
      dispatch(createClient(input));
      setIsSubmit(false);
      setInput({
        username: "",
        email: "",
        password: "",
        password2: "",
      });
      history.push("/Login");
    }
  };

  return (
    <div>
      <div className={style.mainNavbar}>
        <NavLink to="/home" className={style.nlhome}>
          <img className={style.logo} src={logo} alt="Logo not found" />
          <div className={style.title}>
            rapi<strong>Resto</strong>
          </div>
        </NavLink>
        <Button variant="secondary">
          <div>
            <NavLink to="/home" className={style.navlinks}>
              Volver
            </NavLink>
          </div>
        </Button>
      </div>
      {isSubmit ? (
        <div>
          <h3>Se ha registrado correctamente</h3>
          <button onClick={() => history.push("/Login")}>Volver a Home</button>
        </div>
      ) : (
        <div>
          <div>
            <h2>Registrate!</h2>
          </div>
          <br />
          <form onSubmit={handleSubmit}>
            <div>
              <label>Nombre de usuario </label>
              <input
                type={"text"}
                name={"username"}
                onKeyPress={onlyLetters}
                value={input.username}
                autoComplete="off"
                placeholder="Ingrese su nombre de usuario"
                onChange={(e) => handleChange(e)}
              />
              {errors.username && <p className={"errors"}>{errors.username}</p>}
            </div>
            <div>
              <br />
              <label>E-mail </label>
              <input
                type={"text"}
                name={"email"}
                placeholder="Ingrese su e-mail"
                value={input.email}
                autoComplete="off"
                onChange={(e) => handleChange(e)}
              />
              {errors.email && <p className={"errors"}>{errors.email}</p>}
            </div>
            <div>
              <br />
              <label>Contraseña </label>
              <input
                type={"password"}
                name={"password"}
                value={input.password}
                placeholder="Ingrese su contraseña"
                onChange={(e) => handleChange(e)}
              />
              {errors.password && <p className={"errors"}>{errors.password}</p>}
            </div>
            <div>
              <br />
              <label>Confirma tu Contraseña </label>
              <input
                type={"password"}
                name={"password2"}
                value={input.password2}
                placeholder="Ingrese su contraseña"
                onChange={(e) => handleChange(e)}
              />
              {errors.password2 && (
                <p className={"errors"}>{errors.password2}</p>
              )}
            </div>
            <br />
            <div>
              <button
                type={"submit"}
                disabled={errors.hasErrors}
                onSubmit={(e) => handleSubmit(e)}
              >
                Registrate
              </button>
            </div>
          </form>
        </div>
      )}
    </div>
  );
}
