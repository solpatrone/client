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
          {/* <form onSubmit={handleSubmit}>
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
              </form> */}

          <Form onSubmit={handleSubmit} className={style.formContainer}>
            <h2 className={style.header}>Registrarse</h2>
            <Form.Group className="mb-3" controlId="formBasicName">
              <div class="row">
                <div class="col text-right my-auto">
                  <Form.Label className={style.label}>
                    Nombre de usuario
                  </Form.Label>
                </div>
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
                {errors.username && (
                  <p className={style.errors}>{errors.username}</p>
                )}
              </div>
            </Form.Group>
            <Form.Group className="mb-3" controlId="formBasicEmail">
              <Form.Label className={style.label}>Email</Form.Label>
              <Form.Control
                type={"text"}
                name={"email"}
                placeholder="Ingrese su e-mail"
                value={input.email}
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                className={style.input}
              />

              {errors.email && <p className={style.errors}>{errors.email}</p>}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className={style.label}>Contraseña</Form.Label>
              <Form.Control
                type={"password"}
                name={"password"}
                value={input.password}
                placeholder="Ingrese su contraseña"
                onChange={(e) => handleChange(e)}
                className={style.input}
              />
              {errors.password && (
                <p className={style.errors}>{errors.password}</p>
              )}
            </Form.Group>

            <Form.Group className="mb-3" controlId="formBasicPassword">
              <Form.Label className={style.label}>
                Confirma la contraseña
              </Form.Label>
              <Form.Control
                type={"password"}
                name={"password2"}
                value={input.password2}
                placeholder="Ingrese su contraseña"
                onChange={(e) => handleChange(e)}
                className={style.input}
              />
              {errors.password2 && (
                <p className={style.errors}>{errors.password2}</p>
              )}
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
