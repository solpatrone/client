import React, { useState } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import "./reactCalendar.css";
import s from "./Reservations.module.css";
import { FaRegCalendarAlt, FaClock } from "react-icons/fa";
import { GrGroup } from "react-icons/gr";
import { postReservation } from "../../actions";

export default function Reservations({ userId, restoId }) {
  const [reservations, setReservations] = useState({
    date: new Date(),
    time: "",
    pax: 0,
    email: userId,
    id: restoId[0].id,
  });

  console.log(restoId);
  //guardado en estado local hasta poder hacer la conexion con el back
  const reserves = useSelector((state) => state.reservation);
  console.log(reservations);
  console.log(reserves);

  const dispatch = useDispatch();
  //parsear fecha a dd/mm/yyyy
  // let day = reservations.date.getDate().toString();
  // let month = reservations.date.getMonth() + 1;
  // let year = reservations.date.getFullYear();
  // let fullDate = day.concat("/" + month + "/").concat(year);
  // console.log(fullDate);

  //lunch and dinner times
  let lunchTimes = [
    { name: "12:00", label: "12 PM", value: "12:00" },
    { name: "12:30", label: "12:30 PM", value: "12:30" },
    { name: "13:00", label: "13 PM", value: "13:00" },
    { name: "13:30", label: "13:30 PM", value: "13:30" },
    { name: "14:00", label: "14 PM", value: "14:30" },
  ];

  let dinnerTimes = [
    { name: "20:00", label: "20 PM", value: "20:00" },
    { name: "20:30", label: "20:30 PM", value: "20:30" },
    { name: "21:00", label: "21 PM", value: "21:00" },
    { name: "21:30", label: "21:30 PM", value: "21:30" },
    { name: "22:00", label: "22 PM", value: "22:00" },
    { name: "22:30", label: "22:30 PM", value: "22:30" },
  ];

  //han
  function handleLunchChange(e) {
    setReservations((prev) => ({ ...prev, time: e }));
  }

  function handleDinnerChange(e) {
    setReservations((prev) => ({ ...prev, time: e }));
  }

  let pax = []; //cambiar por restaurants.personas_max
  for (let i = 1; i <= restoId[0].personas_max; i++) {
    pax.push({ name: i, label: i, value: i });
  }

  function handlePaxChange(e) {
    setReservations((prev) => ({ ...prev, pax: e }));
  }

  function handleDateChange(e) {
    setReservations((prev) => ({ ...prev, date: e }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    //agregar accion para postear reseña
    dispatch(postReservation(reservations));
  }

  let date = reservations.date.toString().split("00")[0].split(" ");
  date = date[2].concat(" " + date[1] + " ").concat(date[3]);
  return (
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
            <GrGroup style={{ color: "var(--bright-color)" }} />
          </div>
        </div>
      </div>
      <div className={s.form}>
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
            {!reservations.time && <p>Selecciona un horario</p>}
            <div className={s.column}>
              <label>Almuerzo</label>
              <Select
                options={lunchTimes}
                isMulti={false}
                value={reservations.time}
                name={"time"}
                onChange={(e) => handleLunchChange(e)}
              />
            </div>
            <div className={s.column}>
              <label>Cena</label>
              <Select
                options={dinnerTimes}
                isMulti={false}
                value={reservations.time}
                name={"time"}
                onChange={(e) => handleDinnerChange(e)}
              />
            </div>
          </div>

          <hr></hr>

          <div className={s.column}>
            {!reservations.pax && <p>Selecciona cantidad de personas</p>}
            <label>Cantidad de personas</label>
            <Select
              options={pax}
              isMulti={false}
              value={reservations.pax}
              name={reservations.pax}
              onChange={(e) => handlePaxChange(e)}
            />
          </div>
        </form>
      </div>
      <div>
      <p className={s.text}>
          Confirme su reserva para el {date ? date : "--"}, a las{" "}
          {reservations.time.label ? reservations.time.label : "--"} hs para{" "}
          {reservations.pax.label ? reservations.pax.label : "--"} personas
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
  );
}
