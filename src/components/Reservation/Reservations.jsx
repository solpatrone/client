import React, { useState, useEffect } from "react";
import Select from "react-select";
import { useDispatch, useSelector } from "react-redux";
import Calendar from "react-calendar";
import "./reactCalendar.css";
import s from "./Reservations.module.css";
import { FaRegCalendarAlt, FaClock } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { postCheckout, getRestoReservations } from "../../actions";
import Cookies from "universal-cookie";

export default function Reservations({ userId, restoId }) {
  const [reservations, setReservations] = useState({
    date: new Date(),
    time: "",
    pax: "",
    email: userId,
    id: restoId.id,
  });

  const options = {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  };
  let date = reservations.date.toLocaleDateString("es-AR", options);

  const [error, setError] = useState({});
  const restoReservations = useSelector((state) => state.restoReservations);

  const sameDateReservations =
    restoReservations.length > 0 &&
    restoReservations.filter((r) => r.date === date).map((r) => r.pax);
  const paxNotAvaliable = sameDateReservations.length
    ? sameDateReservations.reduce((acc, curr) => acc + curr, 0)
    : 0;

  const dispatch = useDispatch();

  function validateAvailability() {
    if (paxNotAvaliable >= restoId.personas_max) {
      error.max = "No hay disponibilidad para la fecha seleccionada";
    } else {
      error.max = false;
    }
    return error;
  }
  useEffect(() => {
    dispatch(getRestoReservations(restoId.id));
    setError(validateAvailability());
    // eslint-disable-next-line
  }, [restoId.id, paxNotAvaliable]);

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

  function validatePaxMax(paxInput) {
    
    // if (paxInput > restoId.personas_max) {
    //   error.pax = `El n??mero de comesales debe ser menos a ${restoId.personas_max}`;
    // }
    if(paxInput > restoId.personas_max - paxNotAvaliable){
      error.pax = `Solo nos queda lugar para ${restoId.personas_max - paxNotAvaliable} personas en el dia seleccionado `
    }
    else if (paxInput <= 0) {
      error.pax = "Ingrese un n??mero v??lido";
    }
    else{ error.pax = false
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
  };

  function handleDateChange(e) {
    setReservations((prev) => ({ ...prev, date: e }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    const cookies = new Cookies();
    dispatch(postCheckout(restoId.id, date, reservations.pax));
    setReservations({
      date: new Date(),
      time: "",
      pax: "",
      email: userId,
      id: restoId.id,
    });

    cookies.set("idR", reservations.id, { path: "/" });
    cookies.set("RestoNameReserv", restoId.name, { path: "/" });
    cookies.set("time", reservations.time.value, { path: "/" });
    cookies.set("date", date, { path: "/" });
    cookies.set("pax", reservations.pax, { path: "/" });
    cookies.set("email", reservations.email, { path: "/" });
    cookies.set("fullDate", date, { path: "/" });
  }
  return (
    <div>
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
              <MdGroups style={{ color: "var(--bright-color)" }} />
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
                  locale="es-AR"
                  minDate={new Date()}
                />
              </div>
            </div>
            {error.max ? (
              <div>{error.max}</div>
            ) : (
              <div>
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
                <p className={s.text}>
                  Confirme su reserva para el {date ? date : "--"}, a las{" "}
                  {reservations.time.label ? reservations.time.label : "--"} hs
                  para {reservations.pax ? reservations.pax : "--"} personas
                </p>
                <div className={s.price}>La reserva tiene un costo de $100 por persona</div>

              </div>
            )}
          </form>
        </div>
        <div>
          {/* //cambiar boton por el siguiente paso -->Mercado Pago */}
          {!reservations.date ||
          !reservations.time ||
          error.max ||
          error.pax ||
          !reservations.pax ? null : (
            <button onClick={(e) => handleSubmit(e)} className={s.btn}>
              Pagar Reserva
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
