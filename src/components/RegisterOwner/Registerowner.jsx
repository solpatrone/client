// import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import  style from "./Registerowner.module.css";
import {
  createOwner,
  getNeighborhoods,
  getCuisines,
  getRestos,
} from "../../actions";
import Form from 'react-bootstrap/Form';
import Cookies from "universal-cookie";
import Navbar from "../NavBar/Navbar";
export default function RegisterOwner() {
  const history = useHistory();
  let dispatch = useDispatch();

  const cookies = new Cookies();

  const allNeighborhoodsRaw = useSelector((state) => state.neighborhoods);
  const allNeighborhoods = allNeighborhoodsRaw.map((n) => {
    return { name: n.name, label: n.name, value: n.name };
  });
  const allCuisinesRaw = useSelector((state) => state.cuisines);
  const restaurants =  useSelector((state) => state.enabledAndDisabled);
  const emails = restaurants.map(r => r.email)
  const names = restaurants.map(r => r.name)
  const allCuisines = allCuisinesRaw.map((n) => {
    return { name: n.name, label: n.name, value: n.name };
  });

  useEffect(() => {
    if (!cookies.get("email")){
      console.error("there is no user logged in")
      history.push("/home");
    }
    dispatch(getCuisines());// eslint-disable-next-line
  }, []);

  useEffect(() => {
    dispatch(getNeighborhoods());// eslint-disable-next-line
  }, []);

  let priceOptions = [
    { name: "$", label: "$", value: "$" },
    { name: "$$", label: "$$", value: "$$" },
    { name: "$$$", label: "$$$", value: "$$$" },
    { name: "$$$$", label: "$$$$", value: "$$$$" },
    { name: "$$$$$", label: "$$$$$", value: "$$$$$" },
  ];

  const own = cookies.get("email");


  //owner object
  const [owner, setOwner] = useState({
    name: "",
    address: "",
    neighborhood_info: {
      name: "",
      value: "",
    },
    cuisine: [],
    photo: [],
    email: "",
    personas_max: "",
    owner: own,
    description: "",
    price: {
      name: "",
      value: "",
    },
  });

  //ver para inputs de solo letras ej: nombre
  //let onlyLetters = (e) => {
  //  if (!/[a-zA-Z\s]/.test(e.key)) {
  //    e.preventDefault();
  //  }
  //};
  // en el input poner: onKeyPress={onlyLetters}

  //ver para numero de direccion

  //error objects
  const [errors, setError] = useState({ hasErrors: true });

  //const [isSubmit, setIsSubmit] = useState(false);

  function handleChange(e) {
    setOwner((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(validate({ ...owner, [e.target.name]: e.target.value }));
  }

  function handleNeighborhood(e) {
    setOwner((prev) => ({ ...prev, neighborhood_info: e }));
  }

  function handlePrice(e) {
    setOwner((prev) => ({ ...prev, price: e }));
  }

  function handleTypes(e) {
    setOwner((prev) => ({ ...prev, cuisine: e }));
  }

  // let onlyNumbers = (e) => {
  //   if (!/[0-9]/.test(e.key)) {
  //     e.preventDefault();
  //   }
  // };

  function handleSubmit(e) {
    e.preventDefault();
    dispatch(createOwner(owner));
    //setIsSubmit(true);
    dispatch(getRestos());     
}

  //validate function for inputs
  function validate(owner) {
    const errors = { hasErrors: false };
    console.log("input", owner);
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (!owner.name) {
      errors.name = "Debes ingresar el nombre de tu restaurante";
      errors.hasErrors = true;
    }
    const sameName = names.find(e => e.toLowerCase() === owner.name.toLowerCase())
    if(sameName){
      errors.name = "El nombre ingresado ya corresponde a un restaurant registrado";
      errors.hasErrors = true
    }
    
    if (!owner.address) {
      errors.address = "Ingrese una calle";
      errors.hasErrors = true;
    }
    if (!owner.email) {
      errors.email = `El email es requerido`;
      errors.hasErrors = true;
    } else if (!regexEmail.test(owner.email)) {
      errors.email = `El email debe ser una dirección válida`;
      errors.hasErrors = true;
    }
    const sameEmail = emails.find(e => e === owner.email)
    if(sameEmail){
      errors.email = "El email ingresado ya corresponde a un restaurant registrado";
      errors.hasErrors = true
    }

    //if (owner.description.length < 0 || owner.description.length > 200) {
    //  errors.description = "La descripción debe tener menos de 200 caracteres";
    //  errors.hasErrors = true;
    //}

    return errors;
  }

  return(   <div>
    
      <Navbar className={style.mainNavbar}/>
    <div>
      <div children >
        
          <div className={style.container}> 
          <Form onSubmit={handleSubmit} className={style.formContainer}>
          <div className="mb-3">
            <h2 className={style.header}>Registra tu restaurante</h2>
          </div>
            <Form.Group className="mb-3" >
            <div class="row">
              <div class="col text-right my-auto">
                <Form.Label className={["align-middle m-0", style.label]}>Nombre del Restaurante</Form.Label>
              </div>
              <div class="col-9">
                <Form.Control
                  className={style.input}
                  type="text"
                  name="name"
                  value={owner.name}
                  placeholder="Ingrese el nombre del restaurante"
                  onChange={(e) => handleChange(e)} />
              </div>
              <Form.Text className={style.errors}>
                {errors.name}
              </Form.Text>
            </div>
          </Form.Group>

              <Form.Group className="mb-3" >
            <div class="row">
              <div class="col text-right my-auto">
                <Form.Label className={["align-middle m-0", style.label]}>Email del restaurant</Form.Label>
              </div>
              <div class="col-9">
                <Form.Control
                  className={style.input}
                  type="text"
                  name="email"
                  value={owner.email}
                  placeholder="Ingrese el nombre del restaurante"
                  onChange={(e) => handleChange(e)} />
              </div>
              <Form.Text className={style.errors}>
                {errors.email}
              </Form.Text>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <div class="row">
              <div class="col text-right my-auto">
                <Form.Label className={["align-middle m-0", style.label]}>Direccion</Form.Label>
              </div>
              <div class="col-9">
                <Form.Control
                  className={style.input}
                  type="text"
                  name="address"
                  value={owner.address}
                  placeholder="Ingrese la calle"
                  onChange={(e) => handleChange(e)} />
              </div>
              <Form.Text className={style.errors}>
                {errors.address}
              </Form.Text>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <div class="row">
              <div class="col text-right my-auto">
                <Form.Label className={["align-middle m-0", style.label]}>Capacidad maxima </Form.Label>
              </div>
              <div class="col-9">
                <Form.Control
                  className={style.input}
                  type="text"
                  name="personas_max"
                  value={owner.personas_max}
                  placeholder="ingresa cantidad de reservas maximas diarias"
                  autoComplete="off"
                  onChange={(e) => handleChange(e)} />
              </div>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <div class="row">
              <div class="col text-right my-auto">
                <Form.Label className={["align-middle m-0", style.label]}>Barrio</Form.Label>
              </div>
              <div class="col-9">
                <Select
                  className={style.input}
                  options={allNeighborhoods}
                  value={owner.neighborhood_info}
                  placeholder={'seleccione el barrio'}
                  name={"cuisine"}
                  onChange={(e) => handleNeighborhood(e)}
                />
              </div>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <div class="row">
              <div class="col text-right my-auto">
                <Form.Label className={["align-middle m-0", style.label]}>Tipos de comida</Form.Label>
              </div>
              <div class="col-9">
                <Select
                  className={style.input}
                  options={allCuisines}
                  isMulti={true}
                  value={owner.cuisine}
                  name={"cuisine"}
                  placeholder={'seleccione tipo de comida'}
                  onChange={(e) => handleTypes(e)}
                />
              </div>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <div class="row">
              <div class="col text-right my-auto">
                <Form.Label className={["align-middle m-0", style.label]}>Precio</Form.Label>
              </div>
              <div class="col-9">
                <Select
                  className={style.input}
                  options={priceOptions}
                  value={owner.price}
                  name={"price"}
                  placeholder={'Seleccione el precio de reserva'}
                  onChange={(e) => handlePrice(e)}
                />
              </div>
            </div>
          </Form.Group>
              
          <Form.Group className="mb-3" controlId="formBasicText">
            <div class="row">
              <div class="col text-right my-auto">
                <Form.Label className={["align-middle m-0", style.label]}>Descripcion </Form.Label>
              </div>
              <div class="col-9">
                <Form.Control  as="textarea" rows={3}
                  className={style.input}
                  name="description"
                  value={owner.description}
                  placeholder="Ingrese una breve descripción de tu local"
                  autoComplete="off"
                  onChange={(e) => handleChange(e)} />
              </div>
            </div>
          </Form.Group>
            <button   className={style.btn} type="submit"  disabled={errors.hasErrors}> Registrar restaurant
          </button>
            </Form>
            </div>

        </div>
      </div>
    </div>
  );
}
