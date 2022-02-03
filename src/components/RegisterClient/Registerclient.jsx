import { useDispatch, useSelector } from 'react-redux';
import React, { useEffect, useState } from 'react';
import { createClient } from '../../actions';
import { useHistory } from "react-router-dom";

export default function RegisterUser() {
    const history = useHistory();
<<<<<<< HEAD
    let dispatch = useDispatch();

    let [input, setInput] = useState({
=======

    let [input, setInput] = React.useState({
>>>>>>> develop
        name: '',
        email: '',
        password: ''
    })

<<<<<<< HEAD
    
    let [errors, setErrors] = useState({ hasErrors: true });
    
    const [isSubmit, setIsSubmit] = useState(false);

=======
    const [isSubmit, setIsSubmit] = useState(false);

    let [errors, setErrors] = React.useState({ hasErrors: true });

    let dispatch = useDispatch();

>>>>>>> develop
    function validate(input) {
        let errors = { hasErrors: false }
        console.log("input", input)

        if (!input.name) {
            errors.name = `El nombre es requerido`;
            errors.hasErrors = true;
        } else if (!/^[a-zA-Z\s]{5,20}$/.test(input.name)) {
            errors.name = `El nombre debe ser letras entre 5 y 20 caracteres`;
            errors.hasErrors = true;
        }

        if (!input.email) {
            errors.email = `El email es requerido`;
            errors.hasErrors = true;
        } else if (!/(\W|^)[\w.\-]{0,30}@(yahoo|hotmail|gmail)\.com(\W|$)/.test(input.email)) {
            errors.email = `El email debe ser una dirección válida`;
            errors.hasErrors = true;
        }

        if (!input.password) {
<<<<<<< HEAD
            errors.password = `La contraseña es requerida`;
            errors.hasErrors = true;
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/gm.test(input.password)) {
            errors.password = "La contrseña debe incluir: \n Entre 8 y 15 carateres \n Mayúsculas y minúsculas \n Números";
=======
            errors.password = `La contraseña es requerido`;
            errors.hasErrors = true;
        } else if (!/^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/gm.test(input.password)) {
            errors.password = "La contrseña debe incluir: \n Entre 8 carateres y 15 \n Mayúsculas y minúsculas \n Números";
>>>>>>> develop
            errors.hasErrors = true;
        }

        return errors;

    }

    let onlyLetters = (e) => {
        if (!/[a-zA-Z\s]/.test(e.key)) {
            e.preventDefault();
        }
    }

    let handleChange = e => {

        e.preventDefault();
        setInput({ ...input, [e.target.name]: e.target.value })
        setErrors(validate({ ...input, [e.target.name]: e.target.value }))
    }

    let handleSubmit = e => {
        e.preventDefault()
        if (!validate(input).hasErrors) {
            dispatch(createClient(input))
            setIsSubmit(true);
            setInput({
                name: '',
                email: '',
                password: ''
            })
        }
    }

    return isSubmit ? (<div>
        <h3>Se ha registrado correctamente</h3>
        <button onClick={() => history.push("/home")}>Volver a Home</button>
    </div>) : (
        <div>
            <div>
                <h2>Registrate como Cliente</h2>
            </div>
            <br/>
            <form onSubmit={handleSubmit}>
                <div>
                    <label>Nombre de usuario </label>
                    <input
                        type={'text'}
                        name={'name'}
                        onKeyPress={onlyLetters}
                        value={input.name}
                        autoComplete="off"
                        placeholder="Ingrese su nombre de usuario"
                        onChange={e => handleChange(e)} />
                    {errors.name && (<p>{errors.name}</p>)}
                </div>
                <div>
                <br/>
                    <label>E-mail </label>
                    <input
                        type={'text'}
                        name={'email'}
                        placeholder="Ingrese su e-mail"
                        value={input.email}
                        autoComplete="off"
                        onChange={e => handleChange(e)} />
                    {errors.email && (<p>{errors.email}</p>)}
                </div>
                <div>
                <br/>
                    <label>Contraseña </label>
                    <input
                        type={'password'}
                        name={'password'}
                        value={input.password}
                        placeholder="Ingrese su contraseña"
                        onChange={e => handleChange(e)} />
                    {errors.password && (<p>{errors.password}</p>)}
                </div>
                <br/>
                <div>
                    <button
                        type={'submit'}
                        disabled={errors.hasErrors}
                        onSubmit={e => handleSubmit(e)}>Registrate</button>
                </div>
            </form>
        </div>

    )

}


