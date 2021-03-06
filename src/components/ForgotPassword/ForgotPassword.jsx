import React, {useState} from 'react'
import {NavLink, useHistory } from "react-router-dom";
import style from "./ForgotPassword.module.css";
import Swal from 'sweetalert2'
import logo from "../../assets/rapiresto.png";
import emailjs from "emailjs-com"

export default function ForgotPassword() {

    const [input, setInput] = useState({
      email: "",
    });
    let [errors, setErrors] = useState({ hasErrors: true });

    const history = useHistory()
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
        return errors
    }

    function handleChange(e) {
      setInput({ ...input, [e.target.name]: e.target.value });
      setErrors(validate({ ...input, [e.target.name]: e.target.value } ));
    }

    function handleSubmit(e) {
        e.preventDefault();
         let templateParams = {
           user_email: input.email
         };
         emailjs
           .send(
             "service_vwcqene",
             "template_pfjsml4",
             templateParams,
             "user_xvn5dt907bREXqYpY0YPa"
           )
           .then(
             (result) => {
               console.log(result.text);
             },
             (error) => {
               console.log(error.text);
             }
           );

        Swal.fire({
            text: `Si hay una cuenta asociada a la casilla ${input.email} recibirás un email con un link para restablecer la contraseña.`,
            confirmButtonColor: "#8aa899"
          })
          setTimeout(()=>{
              history.push("/login");

          },1000)

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
            <NavLink to="/home"  className={style.navlinks}>    
                    Home
            </NavLink>
          </div>
       
      </div >
      <div className={style.container}>
        <div className={style.formContainer}>
        <div className={style.header}>¿Olvidaste tu contraseña?</div>
            <p>Por favor, ingresá tu email y recibirás un link para restablecer tu contraseña</p>
            <form onSubmit={handleSubmit} className={style.form}>
            <div className={style.inputContainer}>
            <input
              type="email"
              value={input.email}
              name="email"
              placeholder="Ingrese su email"
              onChange={(e) => handleChange(e)}
            />
            </div>
            <button type="submit" disabled={errors.hasErrors} className={style.btn}>Enviar</button>
            <p>{errors && errors.email}</p>
            </form>
        </div>
        </div>
    </div>
  )
}

