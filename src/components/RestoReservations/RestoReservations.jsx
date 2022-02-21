import React from "react";
import s from "./RestoReservations.module.css";
import { FaRegCalendarAlt, FaClock } from "react-icons/fa";
import { MdGroups } from "react-icons/md";
import { FaUserCircle } from "react-icons/fa";

export default function RestoReservations({ date, pax, time, username }) {
  let fixedDate = date.split("T")[0].split("-");
  let endDate = fixedDate[2] + "-" + fixedDate[1] + "-" + fixedDate[0];

  return (
    <div className={s.container}>
      <div className={s.header}>

        <div>
          <FaUserCircle size={30} style={{ fill: "var(--medium-color)" }} />
        </div>

        <div>{username}</div>
        
      </div>
      <div className={s.inputContainer}>
        <div className={s.input}>
          <p>
            <FaRegCalendarAlt style={{ color: "var(--bright-color)" }} /> Fecha
          </p>
          <span>{endDate}</span>
        </div>
        <div className={s.input}>
          <p>
            <FaClock style={{ color: "var(--bright-color)" }} /> Horario
          </p>
          <span>{time}</span>
        </div>
        <div className={s.input}>
          <p>
            <MdGroups style={{ color: "var(--bright-color)" }} /> Personas
          </p>
          <span> {pax}</span>
        </div>
      </div>
    </div>
  );
}
