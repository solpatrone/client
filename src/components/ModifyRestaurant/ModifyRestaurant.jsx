import { useDispatch, useSelector } from 'react-redux';
import React, { useState, useEffect } from "react";
import { useHistory, useParams } from "react-router-dom";
import Select from "react-select";
import s from "./ModifyRestaurant.module.css";
import {
  addImagesToRestos,
  getNeighborhoods,
  getCuisines,
  getRestoDetails
} from "../../actions";
import Cookies from "universal-cookie";
import Navbar from "../NavBar/Navbar";
import Button from 'react-bootstrap/Button';
import Form from 'react-bootstrap/Form';
import Loading from "../Loading/Loading";


export default function RegisterOwner() {
  const history = useHistory();
  let dispatch = useDispatch();
  const params = useParams();
  const cookies = new Cookies();
  const myRestaurant = useSelector((state) => state.details);

  const allNeighborhoodsRaw = useSelector((state) => state.neighborhoods);
  const allNeighborhoods = allNeighborhoodsRaw.map((n) => {
    return { name: n.name, label: n.name, value: n.name };
  });
  const allCuisinesRaw = useSelector((state) => state.cuisines);
  const allCuisines = allCuisinesRaw.map((n) => {
    return { name: n.name, label: n.name, value: n.name };
  });
 
  let onlyNumbers = (e) => {
    if (!/[0-9]/.test(e.key)) {
      e.preventDefault();
    }
  };

  const own = cookies.get("email");
  //owner object
  const [owner, setOwner] = useState(generateOwner(myRestaurant));
  const [errors, setError] = useState({ hasErrors: true });

  let priceOptions = [
    { name: "$", label: "$", value: "$" },
    { name: "$$", label: "$$", value: "$$" },
    { name: "$$$", label: "$$$", value: "$$$" },
    { name: "$$$$", label: "$$$$", value: "$$$$" },
    { name: "$$$$$", label: "$$$$$", value: "$$$$$" },
  ];

  useEffect(() => {
    if (myRestaurant && myRestaurant.id) {
      if (myRestaurant.owner !== cookies.get("email")) {
        history.push("/home");
      }
    } // eslint-disable-next-line
  }, [myRestaurant]);

  useEffect(() => {
    dispatch(getCuisines());
    dispatch(getNeighborhoods());
    dispatch(getRestoDetails(params.id)); // eslint-disable-next-line
  }, [params.id]);

  function generateOwner(myRestaurant) {
    let owner = {
      name: myRestaurant.name,
      address: myRestaurant.address,
      cuisine: myRestaurant.cuisine,
      email: myRestaurant.email,
      personas_max: myRestaurant.personas_max,
      owner: own,
      description: myRestaurant.description,
      price: {
        name: myRestaurant.price,
        value: myRestaurant.price,
        label: myRestaurant.price,
      },
    };

    if (myRestaurant.neighborhood_info) {
      owner.neighborhood_info = {
        name: myRestaurant.neighborhood_info[0],
        value: myRestaurant.neighborhood_info[0],
        label: myRestaurant.neighborhood_info[0],
      }
    }

    if (myRestaurant.cuisine) {
      owner.cuisine = myRestaurant.cuisine.map((el) => {
        return {
          name: el,
          value: el,
          label: el,
        }
      })
    }
    return owner;
  }

  useEffect(() => { 
    setOwner(generateOwner(myRestaurant));
    setError(validate(owner)); // eslint-disable-next-line
  }, [myRestaurant]);

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

  function handleSubmit(e) {
    e.preventDefault();
    if (!validate(owner).hasErrors) {
      const request = {
        owner: myRestaurant.owner,
        name: owner.name,
        address: owner.address,
        email: owner.email,
        personas_max: owner.personas_max,
        description: owner.description,
        neighborhood_info: owner.neighborhood_info ? [owner.neighborhood_info.value] : [],
        cuisine: owner.cuisine.length > 0 ? owner.cuisine.map((e) => e.name) : [],
        price: owner.price ? owner.price.value : null,
      }
      console.log(request)
      dispatch(addImagesToRestos(request, params.id));
      history.push(`/myrestaurant/${params.id}`)
    }    
  }

  //validate function for inputs
  function validate(owner) {
    const errors = { hasErrors: false };
    console.log("input", owner);
    const regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/i;

    if (owner.name === '') {
      errors.name = "Debes ingresar el nombre de tu restaurante";
      errors.hasErrors = true;
    }
    
  
    if (owner.address === '') {
      errors.address = "Ingrese una calle";
      errors.hasErrors = true;
    }
    if (owner.email === '') {
      errors.email = `El email es requerido`;
      errors.hasErrors = true;
    } else if (owner.email && !regexEmail.test(owner.email)) {
      errors.email = `El email debe ser una dirección válida`;
      errors.hasErrors = true;
    }
    
    return errors;
  }
console.log(owner.email)

  return (<div>
    <Loading />
    <Navbar className={s.mainNavbar}/>
    <div >
      <div  children>
        <div className={s.container}>
        <Form onSubmit={handleSubmit} className={s.formContainer}>
        <div className="mb-3">
          <h2 className={s.header}>Modificar restaurant: {myRestaurant.name}</h2>
        </div>
          <Form.Group className="mb-3" >
            <div class="row">
              <div class="col text-right my-auto">
                <Form.Label className={["align-middle m-0", s.label]}>Nombre</Form.Label>
              </div>
              <div class="col-9">
                <Form.Control
                  className={s.input}
                  type="text"
                  name="name"
                  value={owner.name}
                  onChange={(e) => handleChange(e)} />
              </div>
              <Form.Text className={s.errors}>
                {errors.name}
              </Form.Text>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" >
            <div class="row">
              <div class="col text-right my-auto">
                <Form.Label className={["align-middle m-0", s.label]}>Email</Form.Label>
              </div>
              <div class="col-9">
                <Form.Control
                  className={s.input}
                  type="text"
                  name="email"
                  value={owner.email}
                  onChange={(e) => handleChange(e)} />
              </div>
              <Form.Text className="text-muted">
                {errors.email}
              </Form.Text>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <div class="row">
              <div class="col text-right my-auto">
                <Form.Label className={["align-middle m-0", s.label]}>Direccion</Form.Label>
              </div>
              <div class="col-9">
                <Form.Control
                  className={s.input}
                  type="text"
                  name="address"
                  value={owner.address}
                  autoComplete="off"
                  onChange={(e) => handleChange(e)} />
              </div>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <div class="row">
              <div class="col text-right my-auto">
                <Form.Label className={["align-middle m-0", s.label]}>Reserva </Form.Label>
              </div>
              <div class="col-9">
                <Form.Control
                  onKeyPress={onlyNumbers}
                  className={s.input}
                  type="text"
                  name="personas_max"
                  value={owner.personas_max}
                  placeholder={'Capacidad maxima'}
                  autoComplete="off"
                  onChange={(e) => handleChange(e)} />
              </div>
            </div>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formBasicText">
            <div class="row">
              <div class="col text-right my-auto">
                <Form.Label className={["align-middle m-0", s.label]}>Precio</Form.Label>
              </div>
              <div class="col-9">
                <Select
                  className={s.input}
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
                <Form.Label className={["align-middle m-0", s.label]}>Tipos de comida</Form.Label>
              </div>
              <div class="col-9">
                <Select
                  className={s.input}
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
                <Form.Label className={["align-middle m-0", s.label]}>Barrio</Form.Label>
              </div>
              <div class="col-9">
                <Select
                  className={s.input}
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
                <Form.Label className={["align-middle m-0", s.label]}>Descripcion </Form.Label>
              </div>
              <div class="col-9">
                <Form.Control  as="textarea" rows={4}
                  className={s.input}
                  name="description"
                  value={owner.description}
                  placeholder="Ingrese una breve descripción de tu local"
                  autoComplete="off"
                  onChange={(e) => handleChange(e)} />
              </div>
            </div>
          </Form.Group>
          

          <Button className={s.btn} type="submit"  disabled={errors.hasErrors}>
            Actualizar
          </Button>
        </Form>
        </div>
      </div>
    </div>
  </div>)
}
