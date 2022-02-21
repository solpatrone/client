import { useDispatch } from "react-redux";
import React, { useState } from "react";
import { createClient } from "../../actions";
import { useHistory, NavLink } from "react-router-dom";
import style from "./Registerclient.module.css";
import logo from "../../assets/rapiresto.png";
import { Form } from "react-bootstrap";

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
        "La contrseña debe incluir entre 8 y 15 carateres (mayúsculas, minúsculas y números)";
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
        <div>
          <NavLink to="/home" className={style.navlinks}>
            home
          </NavLink>
        </div>
      </div>
      {isSubmit ? (
        <div>
          <h3>Se ha registrado correctamente</h3>
          <button onClick={() => history.push("/Login")}>Iniciar sesión</button>
        </div>
      ) : (
        <div className={style.container}>
          <Form onSubmit={handleSubmit} className={style.formContainer}>
            <h2 className={style.header}>Registrarse</h2>
            <Form.Group className="mb-3">
              <div class="row">
                <div class="col text-right my-auto">
                  <Form.Label className={["align-middle m-0", style.label]}>
                    Nombre de usuario
                  </Form.Label>
                </div>
                <div class="col-9">
                  <Form.Control
                    type="text"
                    placeholder="Ingrese su nombre de usuario"
                    name={"username"}
                    onKeyPress={onlyLetters}
                    value={input.username}
                    autoComplete="off"
                    onChange={(e) => handleChange(e)}
                    className={style.input}
                  />
                </div>
                {errors.username && (
                  <p className={style.errors}>{errors.username}</p>
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <div class="row">
                <div class="col text-right my-auto">
                  <Form.Label className={["align-middle m-0", style.label]}>
                    E-mail
                  </Form.Label>
                </div>
                <div class="col-9">
                  <Form.Control
                    type={"text"}
                    name={"email"}
                    placeholder="Ingrese su e-mail"
                    value={input.email}
                    autoComplete="off"
                    onChange={(e) => handleChange(e)}
                    className={style.input}
                  />
                </div>
                {errors.email && <p className={style.errors}>{errors.email}</p>}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <div class="row">
                <div class="col text-right my-auto">
                  <Form.Label className={["align-middle m-0", style.label]}>
                    Contraseña
                  </Form.Label>
                </div>
                <div class="col-9">
                  <Form.Control
                    type={"password"}
                    name={"password"}
                    value={input.password}
                    placeholder="Ingrese su contraseña"
                    onChange={(e) => handleChange(e)}
                    className={style.input}
                  />
                </div>
                {errors.password && (
                  <p className={style.errors}>{errors.password}</p>
                )}
              </div>
            </Form.Group>

            <Form.Group className="mb-3">
              <div class="row">
                <div class="col text-right my-auto">
                  <Form.Label className={["align-middle m-0", style.label]}>
                    Confirmar contraseña
                  </Form.Label>
                </div>
                <div class="col-9">
                  <Form.Control
                    type={"password"}
                    name={"password2"}
                    value={input.password2}
                    placeholder="Ingrese su contraseña"
                    onChange={(e) => handleChange(e)}
                    className={style.input}
                  />
                </div>
                {errors.password2 && (
                  <p className={style.errors}>{errors.password2}</p>
                )}
              </div>
            </Form.Group>

            <button
              type={"submit"}
              disabled={errors.hasErrors}
              onSubmit={(e) => handleSubmit(e)}
              className={style.btn}
            >
              Registrate
            </button>
          </Form>
        </div>
      )}
    </div>
  );
}
