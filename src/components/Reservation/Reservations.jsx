import React, { useState, } from "react";
import Select from "react-select";
import { useDispatch } from "react-redux";
import Calendar from "react-calendar";
import "./reactCalendar.css";
import s from "./Reservations.module.css";
import { FaRegCalendarAlt, FaClock } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import {postCheckout} from "../../actions";
import Cookies from "universal-cookie";

export default function Reservations({ userId, restoId }) {
  const [reservations, setReservations] = useState({
    date: new Date(),
    time: "",
    pax: "",
    email: userId,
    id: restoId.id,
  });
  //restoId.name
  //reservation.time.value
  //date
  //reservation.pax
  const [error, setError] = useState({});
  
  const dispatch = useDispatch();

  let times = [
    { name: "12:00", label: "12 PM", value: "12:00" },
    { name: "12:30", label: "12:30 PM", value: "12:30" },
    { name: "13:00", label: "13 PM", value: "13:00" },
    { name: "13:30", label: "13:30 PM", value: "13:30" },
    { name: "14:00", label: "14 PM", value: "14:30" },
    { name: "20:00", label: "20 PM", value: "20:00" },
    { name: "20:30", label: "20:30 PM", value: "20:30" },
    { name: "21:00", label: "21 PM", value: "21:00" },
    { name: "21:30", label: "21:30 PM", value: "21:30" },
    { name: "22:00", label: "22 PM", value: "22:00" },
    { name: "22:30", label: "22:30 PM", value: "22:30" },
  ];

  //handle times change
  function handleTimesChange(e) {
    setReservations((prev) => ({ ...prev, time: e }));
  }

  // let pax = []; //cambiar por restaurants.personas_max
  // for (let i = 1; i <= restoId.personas_max; i++) {
  //   pax.push({ name: i, label: i, value: i });
  // }

  //validate pax
  function validatePaxMax(paxInput) {
    const error = {};
    console.log("validate,", restoId.personas_max);
    if (paxInput > restoId.personas_max) {
      error.pax = `El número de comesales debe ser menos a ${restoId.personas_max}`;
    }
    if (paxInput <= 0) {
      error.pax = "El número debe ser mayor a cero";
    }

    return error;
  }

  function handlePaxChange(e) {
    setReservations((prev) => ({ ...prev, pax: e.target.value }));
    setError(validatePaxMax(e.target.value));
  }

  let onlyNumbers = (e) => {
    if (!/[0-9]/.test(e.key)) {
        e.preventDefault();
    }
}

  function handleDateChange(e) {
    setReservations((prev) => ({ ...prev, date: e }));
  }

  

  function handleSubmit(e) {
    e.preventDefault();
    const cookies = new Cookies();
    dispatch(postCheckout(restoId.id,reservations.date,reservations.pax))
    setReservations({
      date: new Date(),
      time: "",
      pax: "",
      email: userId,
      id: restoId.id,
      
    });
  
    
    cookies.set("id", reservations.id,{ path: "/" })
    cookies.set("RestoNameReserv", restoId.name,{ path: "/" })
    cookies.set("time", reservations.time.value ,{ path: "/" })
    cookies.set("date", date ,{ path: "/" })
    cookies.set("pax", reservations.pax ,{ path: "/" })
    cookies.set("email", reservations.email ,{ path: "/" })
    console.log("reservaaaaaaassss ",cookies)
  }


  let date = reservations.date.toString().split("00")[0].split(" ");
  date = date[2].concat(" " + date[1] + " ").concat(date[3]);
  return (
    <div>
      {restoId.personas_max === 0 ? (
        <p className={s.errorMaxLimit}>
          Ya no hay lugares disponibles para hacer reservas
        </p>
      ) : (
        <div className={s.container}>
          <div className={s.headContainer}>
            <h3>hace tu reserva</h3>
            <div className={s.iconContainer}>
              <div>
                <FaRegCalendarAlt />
              </div>
              <div>
                <FaClock />
              </div>
              <div>
                <MdGroups style={{ color: "var(--bright-color)" }} /> Personas
              </div>
            </div>
          </div>
          <div className={s.form}>
            {/* {restoId.personas_max === 0 ? (
          <p className={s.error}>Ya no hay lugares disponibles</p>
        ) : null} */}
            <form onSubmit={(e) => handleSubmit(e)}>
              <div className={s.calendar}>
                <div>
                  <Calendar
                    value={reservations.date}
                    onChange={(e) => handleDateChange(e)}
                    locale="es-ES"
                    minDate={new Date()}
                    maxDate={new Date("2022-08-20")}
                  />
                </div>
              </div>

              <hr></hr>
              <div className={s.colContainer}>
                {!reservations.time && (
                  <strong className={s.error}>Selecciona un horario</strong>
                )}
                <div className={s.column}>
                  <label>Horarios</label>
                  <Select
                    options={times}
                    isMulti={false}
                    value={reservations.time}
                    name={"time"}
                    onChange={(e) => handleTimesChange(e)}
                  />
                </div>
              </div>

              <hr></hr>

              <div className={s.column}>
                {!reservations.pax && (
                  <strong className={s.error}>
                    Indica cantidad de personas
                  </strong>
                )}
                <label>Cantidad de personas</label>
                <input
                  type="text"
                  placeholder="Indique cantidad de comensales"
                  onKeyPress={onlyNumbers}
                  value={reservations.pax}
                  onChange={(e) => handlePaxChange(e)}
                />
              </div>
              {error.pax ? <p className={s.error}>{error.pax}</p> : null}
            </form>
          </div>
          <div>
            <p className={s.text}>
              Confirme su reserva para el {date ? date : "--"}, a las{" "}
              {reservations.time.label ? reservations.time.label : "--"} hs para{" "}
              {reservations.pax ? reservations.pax : "--"} personas
            </p>

            {/* //cambiar boton por el siguiente paso -->Mercado Pago */}
            {!reservations.date ||
            !reservations.time ||
            !reservations.pax ? null : (
              <button onClick={(e) => handleSubmit(e)} className={s.btn}>
                Confirmar Reserva
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
