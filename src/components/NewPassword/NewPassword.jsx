import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { changePassword } from "../../actions";
import {NavLink} from "react-router-dom";
import Swal from 'sweetalert2'
import logo from "../../assets/rapiresto.png";
import style from "./NewPassword.module.css";
import { Button } from "react-bootstrap";

export default function NewPassword() {
  let dispatch = useDispatch();

  let [input, setInput] = useState({
    email: "",
    password: "",
    password2: "",
  });

  let [errors, setErrors] = useState({ hasErrors: true });


  function validate(input) {
    let errors = { hasErrors: false };
    console.log("input", input);

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

  let handleChange = (e) => {
    e.preventDefault();
    setInput({ ...input, [e.target.name]: e.target.value });
    setErrors(validate({ ...input, [e.target.name]: e.target.value }));
  };

  let handleSubmit = (e) => {
    e.preventDefault();
     dispatch(changePassword(input));
      Swal.fire({
        text: "Su contraseña fue actualizada con éxito" ,
        confirmButtonColor: "#8aa899"
      })
    }

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
            <NavLink to="/home"  className={style.navlinks}>    
                    Volver
            </NavLink>
          </div>
        </Button>{' '}
      </div>
      <div>
        <h3>Restablacer Contraseña</h3>
      </div>
      <br />
      <form onSubmit={handleSubmit}>
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
          <label>Nueva Contraseña </label>
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
          {errors.password2 && <p className={"errors"}>{errors.password2}</p>}
        </div>
        <br />
        <div>
          <button
            type={"submit"}
            disabled={errors.hasErrors}
            onSubmit={(e) => handleSubmit(e)}
          >
            Restablecer Contraseña
          </button>
        </div>
      </form>
    </div>
  );
  }
