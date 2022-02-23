import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { changePassword } from "../../actions";
import {NavLink} from "react-router-dom";
import Swal from 'sweetalert2'
import logo from "../../assets/rapiresto.png";
import style from "./NewPassword.module.css";

export default function NewPassword() {
  let dispatch = useDispatch();

  let [input, setInput] = useState({
    email: "",
    password: "",
    password2: "",
    secretword: "",
  });

  let [errors, setErrors] = useState({ hasErrors: true });


  function validate(input) {
    let errors = { hasErrors: false };
    

    if (!input.email) {
      errors.email = `* El email es requerido`;
      errors.hasErrors = true;
    } else if (
      !/(\W|^)[\w.]{0,30}@(yahoo|hotmail|gmail)\.com(\W|$)/.test(input.email)
    ) {
      errors.email = `El email debe ser una dirección válida`;
      errors.hasErrors = true;
    }


    if (!input.secretword) {
      errors.secretword = `Por favor ingrese su comida favorita`;
      errors.hasErrors = true;
    }

    else if (!input.password) {
      errors.password = ` * La contraseña es requerida`;
      errors.hasErrors = true;
    } else if (
      !/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/gm.test(
        input.password
      )
    ) {
      errors.password =
        "La contrseña debe incluir: \n Entre 8 y 15 carateres, \n mayúsculas, minúsculas y \n números";
      errors.hasErrors = true;
    }

    else if (!input.password2) {
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
    <div  className={style.main}>
        <div className={style.mainNavbar}>
        <NavLink to="/home" className={style.nlhome}>
          <img className={style.logo} src={logo} alt="Logo not found" />
          <div className={style.title}>
            rapi<strong>Resto</strong>
          </div>
        </NavLink>
          <div>
            <NavLink to="/home"  className={style.navlinks}>    
                    Home
            </NavLink>
          </div>
          </div>
      <div className={style.container}>
        <div className={style.formContainer}>
        <div  className={style.header}> Restablacer Contraseña</div>
            
      <form onSubmit={handleSubmit} className={style.form}>
        <div className={style.inputContainer}>
         
          <label>E-mail </label>
          <input
            type={"text"}
            name={"email"}
            placeholder="Ingrese su e-mail"
            value={input.email}
            autoComplete="off"
            onChange={(e) => handleChange(e)}
          />
          {errors.email && <p >{errors.email}</p>}
        </div>
        <div className={style.inputContainer}>
         
         <label>Comida favorita </label>
         <input
           type={"text"}
           name={"secretword"}
           placeholder="Ingrese su comida favorita"
           value={input.secretword}
           autoComplete="off"
           onChange={(e) => handleChange(e)}
         />
         {errors.secretword && <p >{errors.secretword}</p>}
       </div>
        <div className={style.inputContainer}>
          <label>Nueva Contraseña </label>
          <input
            type={"password"}
            name={"password"}
            value={input.password}
            placeholder="Ingrese su contraseña"
            onChange={(e) => handleChange(e)}
          />
          {errors.password && <p >{errors.password}</p>}
        </div>
        <div className={style.inputContainer}>
          <label>Confirma tu Contraseña </label>
          <input
            type={"password"}
            name={"password2"}
            value={input.password2}
            placeholder="Ingrese su contraseña"
            onChange={(e) => handleChange(e)}
          />
          {errors.password2 && <p>{errors.password2}</p>}
        </div>
          <button
            className={style.btn}
            type={"submit"}
            disabled={errors.hasErrors}
            onSubmit={(e) => handleSubmit(e)}
          >
            Restablecer Contraseña
          </button>
       
      </form>
      </div>
      </div>
    </div>
  );
  }
