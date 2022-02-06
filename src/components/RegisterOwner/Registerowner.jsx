// import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import Select from "react-select";
import "./Registerowner.css";
import { createOwner, getNeighborhoods } from "../../actions";

export default function RegisterOwner() {
  const history = useHistory();
  let dispatch = useDispatch();

  const allNeighborhoodsRaw = useSelector((state) => state.neighborhoods);
  const allNeighborhoods = allNeighborhoodsRaw.map((n) => {
    return { name: n.name, label: n.name };
  });
  console.log(allNeighborhoodsRaw);

  useEffect(() => {
    dispatch(getNeighborhoods());
  }, []);


  let priceOptions = [
    { name: "one", label: "$", value: "one" },
    { name: "two", label: "$$", value: "two" },
    { name: "three", label: "$$$", value: "three" },
    { name: "four", label: "$$$$", value: "four" },
    { name: "five", label: "$$$$$", value: "five" },
  ];

  let foodTypes = [
    { name: "all", label: "Tipos de comida", value: "all" },
    { name: "Argentina", label: "Argentina", value: "Argentina" },
    { name: "Apto para vegetarianos", label: "Apto para vegetarianos", value: "Apto para vegetarianos" },
    { name: "Mariscos", label: "Mariscos", value: "Mariscos" },
  ];

  //owner object
  const [owner, setOwner] = useState({
    restoName: "",
    street: "",
    number: 0,
    price: "",
    neighborhood: [],
    types: [],
    description: "",
    images: [],
  });

  //ver para inputs de solo letras ej: nombre
  let onlyLetters = (e) => {
    if (!/[a-zA-Z\s]/.test(e.key)) {
      e.preventDefault();
    }
  };
  // en el input poner: onKeyPress={onlyLetters}

  //ver para numero de direccion
  let onlyNumbers = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  //error objects
  const [errors, setError] = useState({ hasErrors: true });

  //flag for submit
  const [isSubmit, setIsSubmit] = useState(false);

  function handleChange(e) {
    setOwner((prev) => ({ ...prev, [e.target.name]: e.target.value }));
    setError(validate(owner));
  }

  function handleNeighborhood(e) {
    setOwner((prev) => ({ ...prev, neighborhood: e }));
  }

  function handlePrice(e) {
    setOwner((prev) => ({ ...prev, price: e }));
  }

  function handleTypes(e) {
    setOwner((prev) => ({ ...prev, types: e }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate(owner).hasErrors) {
      dispatch(createOwner(owner));
      setIsSubmit(true);
      setOwner({
        restoName: "",
        street: "",
        number: 0,
        price: "",
        neighborhood: "",
        types: [],
        description: "",
        images: [],
      });
    }
    history.push("/Login");
  }

  //validate function for inputs
  function validate(owner) {
    const errors = { hasErrors: false };
    console.log("input", owner);
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;
    const regexPassword =
      /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,15}$/gm;

    //   if (!owner.username) {
    //     errors.username = `El nombre es requerido`;
    //     errors.hasErrors = true;
    // } else if (!/^[a-zA-Z\s]{5,20}$/.test(owner.username)) {
    //     errors.username = `El nombre debe ser letras entre 5 y 20 caracteres`;
    //     errors.hasErrors = true;
    // }

    //  if (!owner.email) {
    //       errors.email = `El email es requerido`;
    //       errors.hasErrors = true;
    //   }else if (!regexEmail.test(owner.email)) {
    //     errors.email = `El email debe ser una dirección válida`;
    //     errors.hasErrors = true;

    // } // como esta planteado en client no va a poder registrarse si es mail empresa. Podemos cambiarlo alla

    // if (!owner.password) {
    //   errors.password = "La contraseña es requerida";
    //   errors.hasErrors = true;

    // } else if (!regexPassword.test(owner.password)) {
    //   errors.password =
    //   "La contrseña debe incluir: \n Entre 8 y 15 carateres \n Mayúsculas y minúsculas \n Números";
    //     errors.hasErrors = true;
    //   }

    if (!owner.restoName) {
      errors.restoName = "Debes ingresar el nombre de tu restaurante";
      errors.hasErrors = true;
    }

    if (!owner.street) {
      errors.street = "Ingrese una calle";
      errors.hasErrors = true;
    }

    if (!owner.number) {
      errors.number = "El número debe ser mayor a cero";
      errors.hasErrors = true;
    }

    if (owner.description.length < 0 || owner.description.length > 200) {
      errors.description = "La descripción debe tener menos de 200 caracteres";
      errors.hasErrors = true;
    }

    return errors;
  }

  return isSubmit ? (
    <div>
      <h3>Se ha registrado correctamente</h3>
      <button onClick={() => history.push("/home")}>Volver a Home</button>
    </div>
  ) : (
    <div>
      <div>
        <h2>Registra tu restaurante</h2>
      </div>
      <form onSubmit={(e) => handleSubmit(e)}>
        <div>
          <h3>Información del Restaurante</h3>
          <div>
            <label>Nombre del Restaurante</label>
            <input
              type="text"
              name="restoName"
              value={owner.restoName}
              placeholder="Ingrese el nombre del restaurante"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <p className='errors'>{errors.restoName}</p>
          </div>
          <div>
            <label>Direccion</label>
            <input
              type="text"
              name="street"
              value={owner.street}
              placeholder="Ingrese la calle"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <p className='errors'>{errors.street}</p>
            <input
              type="text"
              name="number"
              onKeyPress={onlyNumbers}
              value={owner.number}
              placeholder="Ingrese el número"
              autoComplete="off"
              onChange={(e) => handleChange(e)}
            />
            <p className='errors'>{errors.number}</p>
            <label className="inputText">Barrio</label>
            <Select
              className="selectOptions"
              options={allNeighborhoods}
              value={owner.neighborhood}
              name={"neighborhood"}
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
              options={foodTypes}
              isMulti={true}
              value={owner.types}
              name={"types"}
              onChange={(e) => handleTypes(e)}
            />
          </div>
          <div>
            <textarea
              name="description"
              value={owner.description}
              cols="30"
              rows="10"
              placeholder="Ingrese una breve descripción"
              onChange={(e) => handleChange(e)}
            ></textarea>
            <p className='errors'>{errors.description}</p>
          </div>
          {/* <div>
            <label >Imágenes</label>
            <input
              type="file"
              placeholder="Cargue su imagen"
              name="images"
              value={owner.images}
              autoComplete="off"
              multiple
              onChange={(e) => handleChange(e)}
            />
          </div> */}
        </div>
        <div>
          {/* <button>Registra tu restaurante!</button>  */}
          <button
            type={"submit"}
            disabled={errors.hasErrors}
            onSubmit={(e) => handleSubmit(e)}
          >
            Registra tu restaurante!
          </button>
        </div>
      </form>
    </div>
  );
}
