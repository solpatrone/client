// import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import "./Registerowner.css";
import {
  createOwner,
  getNeighborhoods,
  getCuisines,
  getRestos,
  getMyRestos
} from "../../actions";

import Cookies from "universal-cookie";
import Navbar from "../NavBar/Navbar";
import Loading from "../Loading/Loading";
import Swal from 'sweetalert2'
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
    dispatch(getCuisines());
    
  }, [dispatch]);

  useEffect(() => {
    dispatch(getNeighborhoods());
  }, [dispatch]);

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

  //flag for submit
  const [isSubmit, setIsSubmit] = useState(false);

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

  let onlyNumbers = (e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
}

  function handleSubmit(e) {
      dispatch(createOwner(owner));
      setIsSubmit(true);
      dispatch(getRestos());
      // dispatch(getMyRestos(cookies.get("id")))
      Swal.fire({
        icon: 'success',
        text: `${owner.name} se ha registrado con éxito`,
        confirmButtonColor: "#8aa899"
      }); 
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

  return(
  isSubmit ? (
    <Loading/>
    // <div>
    //   <h3>{owner.name} se ha registrado correctamente</h3>
    //   <button onClick={() => history.push("/home")}>Volver a Home</button>
    // </div>
  ) : 
  
  <div>

      <Navbar/>
    <div className="box">
      <div children>

      
      <div>
          <h2>Registra tu restaurant</h2>
        </div>
        <form onSubmit={(e) => handleSubmit(e)}>
          <div>
            
            <div>
              <label>Nombre del Restaurant</label>
              <input
                type="text"
                name="name"
                value={owner.name}
                placeholder="Ingrese el nombre del restaurante"
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                />
              <p className="errors">{errors.name}</p>
            </div>

            <div>
              <label>Email del restaurant</label>
              <input
                type="text"
                name="email"
                value={owner.email}
                placeholder="Ingrese el nombre del restaurante"
                autoComplete="off"
                onChange={(e) => handleChange(e)}
              />
              <p className="errors">{errors.email}</p>
            </div>

            <div>
              <label>Direccion</label>
              <input
                type="text"
                name="address"
                value={owner.address}
                placeholder="Ingrese la calle"
                autoComplete="off"
                onChange={(e) => handleChange(e)}
                />
              <p className="errors">{errors.address}</p>
            </div>
            <div>
              <label>Reserva maxima</label>
              <input
                className="text"
                placeholder="ingresa cantidad de reservas maximas"
                value={owner.personas_max}
                name={"personas_max"}
                onKeyPress={onlyNumbers}
                onChange={(e) => handleChange(e)}

              />
            </div>
            <div>
              <label className="inputText">Barrio</label>
              <Select
                className="selectOptions"
                options={allNeighborhoods}
                value={owner.neighborhood_info}
                name={"neighborhood_info"}
                onChange={(e) => handleNeighborhood(e)}
                />
            </div>
            <div>
              <label className="inputText">Precio</label>
              <Select
                className="selectOptions"
                options={priceOptions}
                value={owner.price}
                name={"price"}
                onChange={(e) => handlePrice(e)}
              />
            </div>
            <div>
              <label className="inputText">Tipo de comida</label>
              <Select
                className="selectOptions"
                options={allCuisines}
                isMulti={true}
                value={owner.cuisine}
                name={"cuisine"}
                onChange={(e) => handleTypes(e)}
                />
            </div>
            <div>
              <textarea
                className="inputTextarea"
                name="description"
                value={owner.description}
                cols="30"
                rows="8"
                placeholder="Ingrese una breve descripción de tu local"
                onChange={(e) => handleChange(e)}
                ></textarea>
              <p className="errors">{errors.description}</p>
            </div>
          </div>
          <div>
            <button
              type={"submit"}
              disabled={errors.hasErrors}
              onSubmit={(e) => handleSubmit(e)}
            >
              Registra tu restaurant!
            </button>
          </div>
        </form>

      {/* <Form>
  <Form.Group className="mb-3" controlId="formBasicEmail">
    <Form.Label>Email address</Form.Label>
    <Form.Control type="email" placeholder="Enter email" />
    <Form.Text className="text-muted">
      We'll never share your email with anyone else.
    </Form.Text>
  </Form.Group>

  <Form.Group className="mb-3" controlId="formBasicPassword">
    <Form.Label>Password</Form.Label>
    <Form.Control type="password" placeholder="Password" />
  </Form.Group>
  <Form.Group className="mb-3" controlId="formBasicCheckbox">
    <Form.Check type="checkbox" label="Check me out" />
  </Form.Group>
  <Button variant="primary" type="submit">
    Submit
  </Button>
</Form> */}
      </div>
    </div>
  </div>
  );
}
